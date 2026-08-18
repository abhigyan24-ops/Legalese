/**
 * sessionManager.js — Persistent Unique Browser Session Manager
 * 
 * Guarantees every browser/device has a permanent Unique Session ID (UUID)
 * stored in localStorage. Synchronously stores and restores the active user profile
 * so that returning users are NEVER asked for nickname, age, or avatar again,
 * and directly open the Rights Trail map.
 */

const UNIQUE_SESSION_ID_KEY = 'legalese_unique_browser_session_id';
const USER_PROFILE_KEY = 'legalese_user_profile_data';
const LEGACY_STORAGE_KEY = 'rights-quest-user';

/**
 * Returns existing unique browser session ID or generates a permanent new one.
 */
export const getOrCreateUniqueSessionId = () => {
  try {
    let id = localStorage.getItem(UNIQUE_SESSION_ID_KEY);
    if (!id) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        id = 'sess_' + crypto.randomUUID().replace(/-/g, '');
      } else {
        id = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
      }
      localStorage.setItem(UNIQUE_SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return 'sess_' + Date.now();
  }
};

/**
 * Loads the persisted profile associated with this browser session.
 */
export const getSavedUserProfile = () => {
  try {
    const raw = localStorage.getItem(USER_PROFILE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && (parsed.nickname || parsed.currentUser?.nickname)) {
      return parsed.currentUser || parsed;
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Synchronously writes profile and progression data to local storage under unique session.
 */
export const saveUserProfile = (stateOrUser) => {
  try {
    if (!stateOrUser) return;
    const user = stateOrUser.currentUser || stateOrUser;
    if (!user || !user.nickname) return;

    const sessionId = user.sessionId || getOrCreateUniqueSessionId();

    const payload = {
      uid: user.uid || sessionId,
      sessionId,
      nickname: user.nickname,
      avatar: user.avatar || 'boy-short-blue-medium',
      ageTier: user.ageTier || '8-11',
      language: stateOrUser.language || user.language || 'en',
      xp: Number(stateOrUser.xp ?? user.xp ?? 0),
      badges: stateOrUser.badges || user.badges || [],
      completedStories: stateOrUser.completedStories || user.completedStories || [],
      quizScores: stateOrUser.quizScores || user.quizScores || {},
      achievements: stateOrUser.achievements || user.achievements || [],
      languagesUsed: stateOrUser.languagesUsed || user.languagesUsed || [],
      settings: stateOrUser.settings || user.settings || { dyslexiaMode: false },
      googleLinked: Boolean(user.googleLinked),
      googleName: user.googleName,
      googlePhoto: user.googlePhoto,
      lastActive: new Date().toISOString(),
    };

    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(payload));
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('saveUserProfile error:', err);
  }
};

/**
 * Clears active user profile on explicit logout while retaining the unique browser session identity.
 */
export const clearUserProfileSession = () => {
  try {
    localStorage.removeItem(USER_PROFILE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    localStorage.removeItem('rq_user_session');
    localStorage.removeItem('rq_profile_v2');
    // UNIQUE_SESSION_ID_KEY is intentionally preserved so the browser identity persists!
  } catch {}
};
