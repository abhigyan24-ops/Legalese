/**
 * AppContext.jsx
 * 
 * Global state: currentUser, xp, badges, completedStories, quizScores, language.
 * Backing store is localStorage so the app is fully playable offline
 * (Firebase writes are best-effort with offline queue sync).
 * Actions: SET_USER, SET_PROFILE, ADD_XP, ADD_BADGE, MARK_STORY_COMPLETE, RECORD_QUIZ_SCORE, UPDATE_LANGUAGE.
 */

import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';

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

const initialState = {
  currentUser: null,
  xp: 0,
  badges: [],
  completedStories: [],
  quizScores: {},
  language: (typeof localStorage !== 'undefined' && localStorage.getItem(LANGUAGE_KEY)) || 'en',
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
    case 'UPDATE_LANGUAGE':
      if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem(LANGUAGE_KEY, action.payload); } catch {}
      }
      return { ...state, language: action.payload };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate persisted profile on first mount
  useEffect(() => {
    if (!state.currentUser) {
      const persisted = loadPersisted();
      if (persisted) {
        dispatch({
          type: 'SET_USER',
          payload: {
            uid: persisted.uid,
            nickname: persisted.nickname,
            avatar: persisted.avatar,
            ageTier: persisted.ageTier,
          },
        });
        dispatch({
          type: 'SET_PROFILE',
          payload: {
            xp: persisted.xp,
            badges: persisted.badges,
            completedStories: persisted.completedStories,
            quizScores: persisted.quizScores || {},
          },
        });
        if (persisted.language) dispatch({ type: 'UPDATE_LANGUAGE', payload: persisted.language });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  ]);

  // Persist language preference
  useEffect(() => {
    try { localStorage.setItem(LANGUAGE_KEY, state.language); } catch {}
  }, [state.language]);

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
