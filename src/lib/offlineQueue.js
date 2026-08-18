/**
 * offlineQueue.js — Offline Write Queue & Auto-Sync Engine
 * 
 * Intercepts cloud write attempts during offline or patchy network states,
 * buffers them persistently in localStorage, and automatically flushes and replays
 * them to Firebase Realtime Cloud when connection returns.
 */

import { isFirebaseConfigured, syncUserProfileCloud } from '../firebase/firebase';

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
  if (typeof window === 'undefined' || !navigator.onLine || !isFirebaseConfigured) {
    return false;
  }

  const queue = getOfflineQueue();
  if (queue.length === 0) return true;

  console.log(`Flushing ${queue.length} offline writes to Realtime Cloud...`);

  const remaining = [];

  for (const task of queue) {
    try {
      if (task.type === 'STORY_COMPLETION') {
        const { uid, badge, storyId, newTotalXp, nickname, avatar, badgeCount } = task.payload;
        await syncUserProfileCloud({
          uid,
          nickname,
          avatar,
          xp: newTotalXp,
          badges: [badge],
          completedStories: [storyId],
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
