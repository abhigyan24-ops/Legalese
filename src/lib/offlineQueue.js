/**
 * offlineQueue.js — Offline Write Queue & Auto-Sync Engine
 * 
 * Intercepts Firestore write attempts during offline or patchy network states,
 * buffers them persistently in localStorage, and automatically flushes and replays
 * them to Cloud Firestore when connection returns.
 */

import { doc, updateDoc, increment, arrayUnion, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/firebase';

const QUEUE_KEY = 'rq_offline_write_queue_v1';

export const getOfflineQueue = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const enqueueOfflineWrite = (writeTask) => {
  if (typeof window === 'undefined') return;
  try {
    const current = getOfflineQueue();
    const item = {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: Date.now(),
      ...writeTask,
    };
    localStorage.setItem(QUEUE_KEY, JSON.stringify([...current, item]));
  } catch (err) {
    console.warn('Enqueue offline write error:', err);
  }
};

export const clearOfflineQueue = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(QUEUE_KEY);
};

export const flushOfflineQueue = async () => {
  if (typeof window === 'undefined' || !navigator.onLine || !isFirebaseConfigured || !db) {
    return false;
  }

  const queue = getOfflineQueue();
  if (queue.length === 0) return true;

  console.log(`Flushing ${queue.length} offline writes to Firestore...`);

  const remaining = [];

  for (const task of queue) {
    try {
      if (task.type === 'STORY_COMPLETION') {
        const { uid, bonusXp, badge, storyId, newTotalXp, nickname, avatar, badgeCount } = task.payload;
        
        // 1. Update user profile
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
          xp: increment(bonusXp),
          badges: arrayUnion(badge),
          completedStories: arrayUnion(storyId),
        });

        // 2. Update leaderboard
        const leaderboardRef = doc(db, 'leaderboard', uid);
        await setDoc(
          leaderboardRef,
          {
            nickname,
            avatar,
            xp: newTotalXp,
            badgeCount,
          },
          { merge: true }
        );
      } else if (task.type === 'QUIZ_SCORE') {
        const { uid, storyId, quizScore } = task.payload;
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
          [`quizScores.${storyId}`]: quizScore,
        });
      }
    } catch (err) {
      console.warn('Failed to replay offline task, re-queuing:', err?.message);
      remaining.push(task);
    }
  }

  if (remaining.length > 0) {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  } else {
    clearOfflineQueue();
  }

  return true;
};

// Setup automatic listener on window online event
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('Network restored. Replaying queued offline writes...');
    flushOfflineQueue();
  });
}
