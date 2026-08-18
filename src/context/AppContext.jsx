/**
 * AppContext.jsx
 *
 * Global state: currentUser, xp, badges, completedStories, quizScores, language,
 * achievements, settings (dyslexiaMode), languagesUsed.
 * Actions: SET_USER, SET_PROFILE, ADD_XP, ADD_BADGE, MARK_STORY_COMPLETE,
 *          RECORD_QUIZ_SCORE, UPDATE_LANGUAGE, EARN_ACHIEVEMENT,
 *          TOGGLE_DYSLEXIA, TRACK_LANGUAGE.
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
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const savePersisted = (user) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(user)); } catch {}
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
  switch (action.type) {
    case 'SET_USER':
      const newLang = action.payload?.language || state.language || 'en';
      if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem(LANGUAGE_KEY, newLang); } catch {}
      }
      return { 
        ...state, 
        currentUser: action.payload,
        language: newLang,
      };
    case 'SET_PROFILE':
      return {
        ...state,
        xp: action.payload.xp || 0,
        badges: action.payload.badges || [],
        completedStories: action.payload.completedStories || [],
        quizScores: action.payload.quizScores || {},
      };
    case 'ADD_XP':
      return { ...state, xp: (state.xp || 0) + action.payload };
    case 'ADD_BADGE':
      return { ...state, badges: [...(state.badges || []), action.payload] };
    case 'MARK_STORY_COMPLETE':
      return {
        ...state,
        completedStories: [...new Set([...(state.completedStories || []), action.payload])],
      };
    case 'RECORD_QUIZ_SCORE':
      return {
        ...state,
        quizScores: {
          ...state.quizScores,
          [action.payload.storyId]: action.payload.score,
        },
      };
    case 'UPDATE_LANGUAGE': {
      if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem(LANGUAGE_KEY, action.payload); } catch {}
      }
      // Track languages used for the Polyglot achievement
      const langs = [...new Set([...(state.languagesUsed || []), action.payload])];
      return { ...state, language: action.payload, languagesUsed: langs };
    }
    case 'EARN_ACHIEVEMENT': {
      const existing = state.achievements || [];
      if (existing.includes(action.payload)) return state;
      return { ...state, achievements: [...existing, action.payload] };
    }
    case 'TOGGLE_DYSLEXIA':
      return {
        ...state,
        settings: { ...(state.settings || {}), dyslexiaMode: !state.settings?.dyslexiaMode },
      };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null, loadInitialState);

  // Hydrate persisted profile on first mount & ensure active cloud UID
  useEffect(() => {
    const hydrate = async () => {
      const persisted = loadPersisted();
      if (persisted && persisted.nickname) {
        let activeUid = persisted.uid;
        if (isFirebaseConfigured && (!activeUid || activeUid.startsWith('guest-'))) {
          activeUid = await initAnonymousSession();
        }
        dispatch({
          type: 'SET_USER',
          payload: {
            uid: activeUid,
            nickname: persisted.nickname,
            avatar: persisted.avatar || 'boy-short-blue-medium',
            ageTier: persisted.ageTier || '8-11',
            googleLinked: Boolean(persisted.googleLinked),
          },
        });
      }
    };

    hydrate();
  }, []);

  // Ensure currentUser UID stays synchronized with Firebase Auth session
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

  // Persist user data whenever it changes
  useEffect(() => {
    if (state.currentUser) {
      savePersisted({
        uid: state.currentUser.uid,
        nickname: state.currentUser.nickname,
        avatar: state.currentUser.avatar,
        ageTier: state.currentUser.ageTier,
        language: state.language,
        xp: state.xp,
        badges: state.badges,
        completedStories: state.completedStories,
        quizScores: state.quizScores,
        achievements: state.achievements || [],
        languagesUsed: state.languagesUsed || [],
        settings: state.settings || {},
      });
    }
  }, [
    state.currentUser,
    state.currentUser?.uid,
    state.xp,
    state.badges,
    state.completedStories,
    state.quizScores,
    state.language,
    state.achievements,
    state.settings,
  ]);

  // Persist language preference
  useEffect(() => {
    try { localStorage.setItem(LANGUAGE_KEY, state.language); } catch {}
  }, [state.language]);

  // Real-time Cloud Profile & Leaderboard Sync
  useEffect(() => {
    if (state.currentUser?.uid) {
      syncUserProfileCloud({
        uid: state.currentUser.uid,
        nickname: state.currentUser.nickname || 'Explorer',
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
    () => ({ state, dispatch, isStoryUnlocked }),
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
