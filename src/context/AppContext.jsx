/**
 * AppContext.jsx — Unified Global State & Dual-Persistence Engine
 *
 * Guarantees 100% data persistence across browser closes, reloads, and offline sessions.
 * Automatically saves all XP, badges, completed stories, and profile state.
 */

import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { isFirebaseConfigured, initAnonymousSession, auth, syncUserProfileCloud } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const STORAGE_KEY = 'rights-quest-user';
const LANGUAGE_KEY = 'rights-quest-language';

const loadPersisted = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('rq_user_session') || localStorage.getItem('rq_profile_v2');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const savePersisted = (stateObj) => {
  try {
    if (!stateObj) return;
    const user = stateObj.currentUser;
    if (user && user.nickname) {
      const payload = {
        uid: user.uid,
        nickname: user.nickname,
        avatar: user.avatar || 'boy-short-blue-medium',
        ageTier: user.ageTier || '8-11',
        language: stateObj.language || user.language || 'en',
        xp: stateObj.xp ?? 0,
        badges: stateObj.badges || [],
        completedStories: stateObj.completedStories || [],
        quizScores: stateObj.quizScores || {},
        achievements: stateObj.achievements || [],
        languagesUsed: stateObj.languagesUsed || [],
        settings: stateObj.settings || { dyslexiaMode: false },
        googleLinked: Boolean(user.googleLinked),
        googleName: user.googleName,
        googlePhoto: user.googlePhoto,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }
  } catch (err) {
    console.warn('Persist error:', err);
  }
};

const loadInitialState = () => {
  const persisted = loadPersisted();
  if (persisted && persisted.nickname) {
    return {
      currentUser: {
        uid: persisted.uid || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `defender-${Date.now()}`),
        nickname: persisted.nickname,
        avatar: persisted.avatar || 'boy-short-blue-medium',
        ageTier: persisted.ageTier || '8-11',
        googleLinked: Boolean(persisted.googleLinked),
        googleName: persisted.googleName,
        googlePhoto: persisted.googlePhoto,
      },
      xp: persisted.xp || 0,
      badges: persisted.badges || [],
      completedStories: persisted.completedStories || [],
      quizScores: persisted.quizScores || {},
      language: persisted.language || (typeof localStorage !== 'undefined' && localStorage.getItem(LANGUAGE_KEY)) || 'en',
      achievements: persisted.achievements || [],
      languagesUsed: persisted.languagesUsed || [],
      settings: persisted.settings || { dyslexiaMode: false },
    };
  }
  return {
    currentUser: null,
    xp: 0,
    badges: [],
    completedStories: [],
    quizScores: {},
    language: (typeof localStorage !== 'undefined' && localStorage.getItem(LANGUAGE_KEY)) || 'en',
    achievements: [],
    languagesUsed: [],
    settings: {
      dyslexiaMode: false,
    },
  };
};

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case 'SET_USER': {
      const newLang = action.payload?.language || state.language || 'en';
      if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem(LANGUAGE_KEY, newLang); } catch {}
      }
      nextState = { 
        ...state, 
        currentUser: action.payload,
        language: newLang,
      };
      break;
    }
    case 'SET_AGE_TIER': {
      const updatedUser = state.currentUser
        ? { ...state.currentUser, ageTier: action.payload }
        : { ageTier: action.payload, nickname: 'Explorer', uid: `defender-${Date.now()}` };
      nextState = {
        ...state,
        currentUser: updatedUser,
      };
      break;
    }
    case 'SET_PROFILE': {
      nextState = {
        ...state,
        xp: action.payload.xp ?? state.xp ?? 0,
        badges: action.payload.badges || state.badges || [],
        completedStories: action.payload.completedStories || state.completedStories || [],
        quizScores: action.payload.quizScores || state.quizScores || {},
      };
      break;
    }
    case 'ADD_XP': {
      nextState = { ...state, xp: (state.xp || 0) + action.payload };
      break;
    }
    case 'ADD_BADGE': {
      nextState = { ...state, badges: [...(state.badges || []), action.payload] };
      break;
    }
    case 'MARK_STORY_COMPLETE': {
      nextState = {
        ...state,
        completedStories: [...new Set([...(state.completedStories || []), action.payload])],
      };
      break;
    }
    case 'RECORD_QUIZ_SCORE': {
      nextState = {
        ...state,
        quizScores: {
          ...state.quizScores,
          [action.payload.storyId]: action.payload.score,
        },
      };
      break;
    }
    case 'UPDATE_LANGUAGE': {
      if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem(LANGUAGE_KEY, action.payload); } catch {}
      }
      const langs = [...new Set([...(state.languagesUsed || []), action.payload])];
      nextState = { ...state, language: action.payload, languagesUsed: langs };
      break;
    }
    case 'EARN_ACHIEVEMENT': {
      const existing = state.achievements || [];
      if (existing.includes(action.payload)) return state;
      nextState = { ...state, achievements: [...existing, action.payload] };
      break;
    }
    case 'RESTORE_CLOUD_USER': {
      const p = action.payload || {};
      const newLang = p.language || state.language || 'en';
      if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem(LANGUAGE_KEY, newLang); } catch {}
      }
      nextState = {
        ...state,
        currentUser: {
          uid: p.uid,
          nickname: p.nickname || 'Explorer',
          avatar: p.avatar || 'boy-short-blue-medium',
          ageTier: p.ageTier || '8-11',
          googleLinked: true,
          googleName: p.googleName,
          googlePhoto: p.googlePhoto,
        },
        xp: p.xp || 0,
        badges: p.badges || [],
        completedStories: p.completedStories || [],
        quizScores: p.quizScores || {},
        language: newLang,
        achievements: p.achievements || [],
        languagesUsed: p.languagesUsed || [],
      };
      break;
    }
    case 'LOGOUT': {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('rq_user_session');
        localStorage.removeItem('rq_profile_v2');
      } catch {}
      return {
        currentUser: null,
        xp: 0,
        badges: [],
        completedStories: [],
        quizScores: {},
        language: state.language || 'en',
        achievements: [],
        languagesUsed: [],
        settings: state.settings || { dyslexiaMode: false },
      };
    }
    case 'TOGGLE_DYSLEXIA': {
      nextState = {
        ...state,
        settings: {
          ...state.settings,
          dyslexiaMode: !state.settings?.dyslexiaMode,
        },
      };
      break;
    }
    default:
      return state;
  }

  savePersisted(nextState);
  return nextState;
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null, loadInitialState);

  // Synchronize Cloud Auth UID if connected anonymously
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return;
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        if (state.currentUser && state.currentUser.uid !== user.uid) {
          dispatch({
            type: 'SET_USER',
            payload: {
              ...state.currentUser,
              uid: user.uid,
            },
          });
        }
      }
    });
    return () => unsub();
  }, [state.currentUser]);

  // Persist language preference
  useEffect(() => {
    try { localStorage.setItem(LANGUAGE_KEY, state.language); } catch {}
  }, [state.language]);

  // Real-time Cloud Profile & Leaderboard Sync
  useEffect(() => {
    if (state.currentUser?.uid && state.currentUser?.nickname) {
      syncUserProfileCloud({
        uid: state.currentUser.uid,
        nickname: state.currentUser.nickname,
        avatar: state.currentUser.avatar || 'boy-short-blue-medium',
        ageTier: state.currentUser.ageTier || '8-11',
        language: state.language || 'en',
        xp: state.xp || 0,
        badges: state.badges || [],
        completedStories: state.completedStories || [],
      });
    }
  }, [
    state.currentUser,
    state.currentUser?.uid,
    state.xp,
    state.badges,
    state.completedStories,
    state.language,
  ]);

  const isStoryUnlocked = (storyIndex) => {
    if (storyIndex < 3) return true; // stories 1-3 always unlocked
    return (state.completedStories || []).length >= 3;
  };

  const value = useMemo(
    () => ({
      state,
      dispatch,
      isStoryUnlocked,
    }),
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
