/**
 * Firebase Configuration - Rights Quest
 * 
 * SPARK PLAN ONLY — Free tier, zero Cloud Functions.
 * Configures Firestore with native IndexedDB multi-tab local persistence:
 * - Single-user data (users/{userId}) is truly offline-durable and auto-syncs on reconnect.
 * - Multi-user data (leaderboard, community_posts) reads from local cache when offline.
 */

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-app.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-app',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-app.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore with Modular IndexedDB Persistence
export const db = (typeof window !== 'undefined')
  ? initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    })
  : null;

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key'
);

export const initAnonymousSession = async () => {
  if (!isFirebaseConfigured) {
    const syntheticId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `guest-${Date.now()}`;
    return syntheticId;
  }

  if (auth.currentUser) {
    return auth.currentUser.uid;
  }

  try {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Auth timed out')), 2500)
    );
    const authPromise = signInAnonymously(auth).then((res) => res.user.uid);
    return await Promise.race([authPromise, timeoutPromise]);
  } catch (error) {
    console.warn('Anonymous sign-in fallback triggered:', error?.message);
    return (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `guest-${Date.now()}`;
  }
};
