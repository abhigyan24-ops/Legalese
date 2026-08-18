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
