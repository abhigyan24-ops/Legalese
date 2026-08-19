/**
 * firebase.js — Firebase Auth & Realtime Database for Rights Quest
 *
 * Auth Architecture:
 * 1. Every first-time visitor automatically gets an anonymous Firebase session
 *    (signInAnonymously). Their uid is their permanent guest identity.
 * 2. When a user optionally connects Google, we use linkWithPopup() to UPGRADE
 *    the existing anonymous account — keeping the same uid, so all RTDB data
 *    (XP, badges, completedStories) stays intact automatically.
 * 3. If the Google account is already linked to a DIFFERENT account
 *    (auth/credential-already-in-use), we sign into that existing account
 *    and surface a clear message about which progress state wins.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  linkWithPopup,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  push,
  onValue,
  off,
  query,
  limitToLast,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'legalese-787ec.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'legalese-787ec',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'legalese-787ec.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '20449344204',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:20449344204:web:cbc964ccc7dae64274a069',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://legalese-787ec-default-rtdb.firebaseio.com',
};

// Initialize or reuse Firebase App — NEVER throws, always falls back
let app;
try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
} catch (e) {
  console.warn('[Firebase] initializeApp failed:', e?.message);
  app = null;
}

// Initialize Auth — safe
let _auth = null;
try {
  if (app) _auth = getAuth(app);
} catch (e) {
  console.warn('[Firebase] getAuth failed:', e?.message);
}
export const auth = _auth;

// Initialize Realtime Database — safe (databaseURL missing = graceful degradation)
let _rtdb = null;
try {
  if (app && typeof window !== 'undefined') _rtdb = getDatabase(app);
} catch (e) {
  console.warn('[Firebase] getDatabase failed — offline mode active:', e?.message);
}
export const rtdb = _rtdb;
export const db = rtdb; // alias for backwards compatibility

export const isFirebaseConfigured = Boolean(
  app &&
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key'
);

// ─────────────────────────────────────────────────────────────────────────────
// ANONYMOUS AUTH — Automatic guest session on first load
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Ensures every browser has an active Firebase anonymous session.
 * Called automatically on app boot. Returns the uid.
 * If Firebase is not configured, returns a stable local uuid instead.
 */
export const initAnonymousSession = async () => {
  if (!isFirebaseConfigured) {
    return (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : `guest-${Date.now()}`;
  }

  // Already signed in (anonymous or Google) — reuse the current uid
  if (auth.currentUser) {
    return auth.currentUser.uid;
  }

  try {
    const res = await signInAnonymously(auth);
    console.log('[Auth] Anonymous session created:', res.user.uid);
    return res.user.uid;
  } catch (error) {
    console.warn('[Auth] Anonymous sign-in failed:', error?.message);
    return (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : `guest-${Date.now()}`;
  }
};

/**
 * Boots the anonymous session on app start.
 * Called once from AppProvider on mount — invisible to the user.
 * Safe to call multiple times (idempotent).
 */
export const bootGuestSession = () => {
  if (!isFirebaseConfigured) return;

  // Already signed in — no-op
  if (auth.currentUser) return;

  // Kick off silently — don't await so it never blocks the UI
  signInAnonymously(auth).catch((err) => {
    console.warn('[Auth] Silent anonymous boot failed:', err?.message);
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE LINK — Upgrades existing anonymous account to Google-backed account
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Links the currently signed-in anonymous account to a Google account.
 * Uses linkWithPopup() so the uid stays the SAME — all RTDB data is preserved.
 *
 * Returns one of:
 *   { success: true, uid, displayName, email, photoURL, isUpgrade: true }
 *   { success: true, uid, displayName, email, photoURL, isUpgrade: false, conflictResolved: true }
 *   { error: string }
 */
export const linkGoogleAccount = async () => {
  if (!isFirebaseConfigured || !auth) return { error: 'Firebase is not configured.' };

  const currentUser = auth.currentUser;
  if (!currentUser) return { error: 'No active session to link to.' };

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    // PRIMARY PATH: anonymous account gets upgraded to Google-backed account.
    // uid stays EXACTLY the same. All RTDB data is untouched.
    const result = await linkWithPopup(currentUser, provider);
    const user = result.user;
    console.log('[Auth] Anonymous account linked to Google. uid unchanged:', user.uid);
    return {
      success: true,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      isUpgrade: true,
    };
  } catch (err) {
    if (err.code === 'auth/credential-already-in-use' || err.code === 'auth/email-already-in-use') {
      // CONFLICT PATH: The Google account is already linked to a different Firebase account.
      // We sign into that existing account. The guest progress is still in localStorage
      // so we surface it to the caller to decide what to do.
      console.warn('[Auth] Google account already linked to another uid — signing into existing account.');
      try {
        const credential = GoogleAuthProvider.credentialFromError(err);
        if (!credential) return { error: 'Could not recover credential from conflict.' };

        const existingResult = await signInWithCredential(auth, credential);
        const existingUser = existingResult.user;
        console.log('[Auth] Signed into existing Google account:', existingUser.uid);

        return {
          success: true,
          uid: existingUser.uid,
          displayName: existingUser.displayName,
          email: existingUser.email,
          photoURL: existingUser.photoURL,
          isUpgrade: false,
          conflictResolved: true,
          // Caller should compare this uid against the guest uid and decide
          // whether to merge or keep the cloud version
        };
      } catch (recoveryErr) {
        return { error: recoveryErr?.message || 'Failed to resolve account conflict.' };
      }
    }

    // Other error types
    const code = err?.code || '';
    if (code.includes('popup-closed-by-user') || code.includes('cancelled-popup-request')) {
      return { error: 'popup-closed' };
    }
    if (code.includes('popup-blocked')) {
      return { error: 'Popups are blocked by your browser. Please allow popups for this site and try again.' };
    }
    if (code.includes('operation-not-allowed') || code.includes('configuration-not-found')) {
      return { error: 'Google Sign-in is not enabled in Firebase Console. Enable it under Authentication → Sign-in method.' };
    }
    if (code.includes('unauthorized-domain')) {
      return { error: 'This domain is not authorized in Firebase Console. Add it under Authentication → Settings → Authorized domains.' };
    }

    console.warn('[Auth] linkWithPopup error:', err?.code, err?.message);
    return { error: err?.message || 'Google sign-in failed. Please try again.' };
  }
};

/**
 * Sign out of current Firebase Auth session.
 * After sign-out, bootGuestSession() will create a new anonymous session on next boot.
 */
export const signOutUser = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
    console.log('[Auth] Signed out.');
  } catch (err) {
    console.warn('[Auth] Sign out notice:', err?.message);
  }
};

/**
 * Subscribe to auth state changes.
 * Returns an unsubscribe function.
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ─────────────────────────────────────────────────────────────────────────────
// REALTIME DATABASE — Profile & Leaderboard
// ─────────────────────────────────────────────────────────────────────────────

export const fetchUserProfileCloud = async (uid) => {
  if (!rtdb || !uid) return null;
  try {
    const userRef = ref(rtdb, `users/${uid}`);
    const snap = await get(userRef);
    return snap.exists() ? snap.val() : null;
  } catch (err) {
    console.warn('[DB] Fetch user profile error:', err?.message);
    return null;
  }
};

export const deleteUserCloud = async (uid) => {
  if (!rtdb || !uid) return;
  try {
    await set(ref(rtdb, `users/${uid}`), null);
    await set(ref(rtdb, `leaderboard/${uid}`), null);
  } catch (err) {
    console.warn('[DB] Delete cloud user error:', err?.message);
  }
};

export const syncUserProfileCloud = async (userData) => {
  if (!rtdb || !userData?.uid) return;
  try {
    const userRef = ref(rtdb, `users/${userData.uid}`);
    await set(userRef, {
      ...userData,
      lastUpdated: new Date().toISOString(),
    });

    if (userData.xp !== undefined) {
      const leaderRef = ref(rtdb, `leaderboard/${userData.uid}`);
      await set(leaderRef, {
        id: userData.uid,
        nickname: userData.nickname || 'Explorer',
        avatar: userData.avatar || 'boy-short-blue-medium',
        xp: userData.xp || 0,
        badgeCount: (userData.badges || []).length,
        tier: userData.xp > 400 ? 'Diamond' : userData.xp > 300 ? 'Platinum' : userData.xp > 150 ? 'Gold' : 'Silver',
        lastUpdated: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn('[DB] Cloud profile sync notice:', err?.message);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// REALTIME DATABASE — Community, Q&A, Leaderboard, Impact
// ─────────────────────────────────────────────────────────────────────────────

export const listenLeaderboardCloud = (callback) => {
  if (!rtdb) return () => {};
  try {
    const leaderRef = query(ref(rtdb, 'leaderboard'), limitToLast(50));
    const listener = onValue(leaderRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
        list.sort((a, b) => (b.xp || 0) - (a.xp || 0));
        callback(list);
      } else {
        callback([]);
      }
    }, (err) => {
      console.warn('[DB] Leaderboard listener notice:', err?.message);
    });
    return () => off(leaderRef, 'value', listener);
  } catch {
    return () => {};
  }
};

export const postCommunityReflectionCloud = async (postData) => {
  if (!rtdb) return null;
  try {
    const postsRef = ref(rtdb, 'community_posts');
    const newPostRef = push(postsRef);
    const payload = {
      id: newPostRef.key,
      ...postData,
      createdAt: new Date().toISOString(),
      cheers: {},
      reportCount: 0,
    };
    await set(newPostRef, payload);
    return payload;
  } catch (err) {
    console.warn('[DB] Community post sync notice:', err?.message);
    return null;
  }
};

export const listenCommunityReflectionsCloud = (storyId, callback) => {
  if (!rtdb) return () => {};
  try {
    const postsRef = query(ref(rtdb, 'community_posts'), limitToLast(100));
    const listener = onValue(postsRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.keys(val)
          .map((k) => ({ id: k, ...val[k] }))
          .filter((p) => !storyId || p.storyId === storyId);
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        callback(list);
      } else {
        callback([]);
      }
    }, (err) => {
      console.warn('[DB] Community listener notice:', err?.message);
    });
    return () => off(postsRef, 'value', listener);
  } catch {
    return () => {};
  }
};

export const postQuestionCloud = async (questionData) => {
  if (!rtdb) return null;
  try {
    const qaRef = ref(rtdb, 'qa_questions');
    const newQaRef = push(qaRef);
    const payload = {
      id: newQaRef.key,
      ...questionData,
      createdAt: new Date().toISOString(),
      status: 'answered',
      helpfulCount: 0,
    };
    await set(newQaRef, payload);
    return payload;
  } catch (err) {
    console.warn('[DB] Q&A sync notice:', err?.message);
    return null;
  }
};

export const listenQuestionsCloud = (storyId, callback) => {
  if (!rtdb) return () => {};
  try {
    const qaRef = query(ref(rtdb, 'qa_questions'), limitToLast(50));
    const listener = onValue(qaRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.keys(val)
          .map((k) => ({ id: k, ...val[k] }))
          .filter((q) => !storyId || q.storyId === storyId);
        callback(list);
      } else {
        callback([]);
      }
    }, (err) => {
      console.warn('[DB] Q&A listener notice:', err?.message);
    });
    return () => off(qaRef, 'value', listener);
  } catch {
    return () => {};
  }
};

export const listenAllQuestionsCloud = (callback) => {
  if (!rtdb) return () => {};
  try {
    const qaRef = query(ref(rtdb, 'qa_questions'), limitToLast(100));
    const listener = onValue(qaRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        callback(list);
      } else {
        callback([]);
      }
    }, (err) => {
      console.warn('[DB] All questions listener notice:', err?.message);
    });
    return () => off(qaRef, 'value', listener);
  } catch {
    return () => {};
  }
};

export const answerQuestionCloud = async (questionId, answerData) => {
  if (!rtdb || !questionId) return false;
  try {
    const qRef = ref(rtdb, `qa_questions/${questionId}`);
    await update(qRef, {
      status: 'answered',
      answer: {
        text: answerData.text,
        answeredBy: answerData.answeredBy || 'Verified Legal Advocate',
        answeredAt: answerData.answeredAt || `Verified on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`,
      },
      approvedAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.warn('[DB] Answer question error:', err?.message);
    return false;
  }
};

export const postCheerCloud = async (cheerData) => {
  if (!rtdb) return null;
  try {
    const cheersRef = ref(rtdb, 'leaderboard_cheers');
    const newCheerRef = push(cheersRef);
    const payload = {
      id: newCheerRef.key,
      ...cheerData,
      createdAt: new Date().toISOString(),
    };
    await set(newCheerRef, payload);
    return payload;
  } catch (err) {
    console.warn('[DB] Cheer sync notice:', err?.message);
    return null;
  }
};

export const listenCheersCloud = (callback) => {
  if (!rtdb) return () => {};
  try {
    const cheersRef = query(ref(rtdb, 'leaderboard_cheers'), limitToLast(20));
    const listener = onValue(cheersRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const list = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        callback(list);
      } else {
        callback([]);
      }
    }, (err) => {
      console.warn('[DB] Cheers listener notice:', err?.message);
    });
    return () => off(cheersRef, 'value', listener);
  } catch {
    return () => {};
  }
};

export const listenRealtimeImpactMetrics = (callback) => {
  if (!rtdb) return () => {};
  try {
    const usersRef = ref(rtdb, 'users');
    const listener = onValue(usersRef, (snapshot) => {
      const users = snapshot.exists() ? snapshot.val() : {};
      const userList = Object.values(users);
      const totalUsers = userList.length;

      let totalXP = 0;
      let totalCompletions = 0;
      let totalQuizCorrect = 0;
      let totalQuizQuestions = 0;
      let totalAchievementsEarned = 0;

      const storyStats = {
        'right-to-education': { completions: 0, quizCorrect: 0, quizTotal: 0 },
        'right-to-healthcare': { completions: 0, quizCorrect: 0, quizTotal: 0 },
        'protection-from-child-labour': { completions: 0, quizCorrect: 0, quizTotal: 0 },
        'protection-from-abuse': { completions: 0, quizCorrect: 0, quizTotal: 0 },
        'protection-from-child-marriage': { completions: 0, quizCorrect: 0, quizTotal: 0 },
      };

      const langCounts = { en: 0, hi: 0, kn: 0 };
      const ageCounts = { '8-11': 0, '12-16': 0 };

      userList.forEach((u) => {
        totalXP += Number(u.xp || 0);
        const l = u.language || 'en';
        langCounts[l] = (langCounts[l] || 0) + 1;
        const a = u.ageTier || '8-11';
        ageCounts[a] = (ageCounts[a] || 0) + 1;

        const completed = Array.isArray(u.completedStories) ? u.completedStories : [];
        totalCompletions += completed.length;
        completed.forEach((sId) => {
          if (storyStats[sId]) storyStats[sId].completions += 1;
        });

        const scores = u.quizScores || {};
        Object.entries(scores).forEach(([sId, score]) => {
          if (score && typeof score === 'object') {
            const c = Number(score.correct ?? score.score ?? 0);
            const t = Number(score.total ?? 3);
            totalQuizCorrect += c;
            totalQuizQuestions += t;
            if (storyStats[sId]) {
              storyStats[sId].quizCorrect += c;
              storyStats[sId].quizTotal += t;
            }
          }
        });

        if (Array.isArray(u.achievements)) totalAchievementsEarned += u.achievements.length;
      });

      const overallQuizAccuracy = totalQuizQuestions > 0
        ? Math.round((totalQuizCorrect / totalQuizQuestions) * 100)
        : null;

      callback({
        totalUsers,
        totalXP,
        totalCompletions,
        totalQuizQuestions,
        totalQuizCorrect,
        overallQuizAccuracy,
        totalAchievementsEarned,
        storyStats,
        langCounts,
        ageCounts,
      });
    }, (err) => {
      console.warn('[DB] Impact listener error:', err?.message);
    });

    return () => off(usersRef, 'value', listener);
  } catch (err) {
    console.warn('[DB] Impact metrics init error:', err?.message);
    return () => {};
  }
};
