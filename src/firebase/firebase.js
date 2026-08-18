/**
 * Firebase Realtime Cloud Configuration - Rights Quest
 * 
 * 100% Free Spark Plan with zero credit card / zero billing requirement.
 * Powered by Firebase Realtime Database with instant cloud synchronization:
 * - Single-user profiles: `users/{userId}`
 * - Global Leaderboard: `leaderboard/{userId}`
 * - Safe Community Reflections: `community_posts/{postId}`
 * - Child-friendly Legal Q&A: `qa_questions/{questionId}`
 * - Safe Community Cheers: `leaderboard_cheers/{cheerId}`
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
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

// Initialize or reuse Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Realtime Database
export const rtdb = (typeof window !== 'undefined') ? getDatabase(app) : null;
export const db = rtdb; // alias for backwards compatibility

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key'
);

/**
 * Initialize anonymous session safely
 */
export const initAnonymousSession = async () => {
  if (!isFirebaseConfigured) {
    return (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `guest-${Date.now()}`;
  }

  if (auth.currentUser) {
    return auth.currentUser.uid;
  }

  try {
    const res = await signInAnonymously(auth);
    return res.user.uid;
  } catch (error) {
    console.warn('Anonymous sign-in notice:', error?.message);
    return (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `guest-${Date.now()}`;
  }
};

/**
 * Sign in with Google (optional — for cross-device persistence)
 * Returns { uid, displayName, email, photoURL } or null on failure
 */
export const signInWithGoogle = async () => {
  if (!isFirebaseConfigured || !auth) return { error: 'Firebase is not configured.' };
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    return {
      uid: result.user.uid,
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
    };
  } catch (err) {
    console.warn('Google sign-in notice:', err?.code, err?.message);
    return { error: err?.code || err?.message || 'sign-in-failed' };
  }
};

/**
 * Sign out of current Firebase Auth session (preserves cloud DB profile intact)
 */
export const signOutUser = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (err) {
    console.warn('Sign out notice:', err?.message);
  }
};

/**
 * Fetch User Profile from Realtime Cloud
 */
export const fetchUserProfileCloud = async (uid) => {
  if (!rtdb || !uid) return null;
  try {
    const userRef = ref(rtdb, `users/${uid}`);
    const snap = await get(userRef);
    if (snap.exists()) {
      return snap.val();
    }
    return null;
  } catch (err) {
    console.warn('Fetch user profile cloud error:', err?.message);
    return null;
  }
};

/**
 * Delete User and Leaderboard entries from Realtime Cloud (used to clean up abandoned anonymous accounts on sync)
 */
export const deleteUserCloud = async (uid) => {
  if (!rtdb || !uid) return;
  try {
    await set(ref(rtdb, `users/${uid}`), null);
    await set(ref(rtdb, `leaderboard/${uid}`), null);
  } catch (err) {
    console.warn('Delete cloud user error:', err?.message);
  }
};

/**
 * Save / Update User Profile in Realtime Cloud
 */
export const syncUserProfileCloud = async (userData) => {
  if (!rtdb || !userData?.uid) return;
  try {
    const userRef = ref(rtdb, `users/${userData.uid}`);
    await set(userRef, {
      ...userData,
      lastUpdated: new Date().toISOString(),
    });

    // Also update public leaderboard entry if XP exists
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
    console.warn('Cloud profile sync notice:', err?.message);
  }
};

/**
 * Real-time Leaderboard Listener
 */
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
      console.warn('Leaderboard cloud listener notice:', err?.message);
    });

    return () => off(leaderRef, 'value', listener);
  } catch {
    return () => {};
  }
};

/**
 * Post Community Reflection
 */
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
    console.warn('Community post cloud sync notice:', err?.message);
    return null;
  }
};

/**
 * Listen to Community Reflections
 */
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
      console.warn('Community cloud listener notice:', err?.message);
    });

    return () => off(postsRef, 'value', listener);
  } catch {
    return () => {};
  }
};

/**
 * Post Q&A Question
 */
export const postQuestionCloud = async (questionData) => {
  if (!rtdb) return null;
  try {
    const qaRef = ref(rtdb, 'qa_questions');
    const newQaRef = push(qaRef);
    const payload = {
      id: newQaRef.key,
      ...questionData,
      createdAt: new Date().toISOString(),
      status: 'answered', // Verified statutory advice
      helpfulCount: 0,
    };
    await set(newQaRef, payload);
    return payload;
  } catch (err) {
    console.warn('Q&A cloud sync notice:', err?.message);
    return null;
  }
};

/**
 * Listen to Q&A Questions
 */
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
      console.warn('Q&A cloud listener notice:', err?.message);
    });

    return () => off(qaRef, 'value', listener);
  } catch {
    return () => {};
  }
};

/**
 * Listen to all Q&A Questions across all stories for Advocate Moderation
 */
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
      console.warn('All questions cloud listener notice:', err?.message);
    });

    return () => off(qaRef, 'value', listener);
  } catch {
    return () => {};
  }
};

/**
 * Answer & Approve a Q&A Question in Realtime Cloud (Advocate Action)
 */
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
    console.warn('Answer question cloud error:', err?.message);
    return false;
  }
};

/**
 * Post Leaderboard Cheer
 */
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
    console.warn('Cheer cloud sync notice:', err?.message);
    return null;
  }
};

/**
 * Listen to Leaderboard Cheers
 */
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
      console.warn('Cheers cloud listener notice:', err?.message);
    });

    return () => off(cheersRef, 'value', listener);
  } catch {
    return () => {};
  }
};

/**
 * Listen to 100% Real Aggregate Learning & Impact Metrics from Realtime Database
 */
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

        // Language
        const l = u.language || 'en';
        langCounts[l] = (langCounts[l] || 0) + 1;

        // Age Tier
        const a = u.ageTier || '8-11';
        ageCounts[a] = (ageCounts[a] || 0) + 1;

        // Completed Stories
        const completed = Array.isArray(u.completedStories) ? u.completedStories : [];
        totalCompletions += completed.length;
        completed.forEach((sId) => {
          if (storyStats[sId]) {
            storyStats[sId].completions += 1;
          }
        });

        // Quiz Scores
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

        // Achievements
        if (Array.isArray(u.achievements)) {
          totalAchievementsEarned += u.achievements.length;
        }
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
      console.warn('Realtime impact listener error:', err?.message);
    });

    return () => off(usersRef, 'value', listener);
  } catch (err) {
    console.warn('Realtime impact metrics init error:', err?.message);
    return () => {};
  }
};
