/**
 * AppContext.jsx — Unified Global State & Session Persistence Engine
 *
 * Auth model:
 * - Every first-time visitor gets an anonymous Firebase session (bootGuestSession).
 * - All progress is saved against that anonymous uid.
 * - Google Sign-In UPGRADES (links) that anonymous account — uid stays the same.
 * - On return visits, onAuthStateChanged restores the Firebase uid automatically.
 */

import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import {
  getOrCreateUniqueSessionId,
  getSavedUserProfile,
  saveUserProfile,
  clearUserProfileSession,
} from '../lib/sessionManager';
import {
  isFirebaseConfigured,
  auth,
  bootGuestSession,
  syncUserProfileCloud,
  onAuthChange,
} from '../firebase/firebase';

export const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const LANGUAGE_KEY = 'rights-quest-language';

const loadInitialState = () => {
  const sessionId = getOrCreateUniqueSessionId();
  const saved = getSavedUserProfile();

  if (saved && saved.nickname) {
    return {
      currentUser: {
        uid: saved.uid || sessionId,
        sessionId: saved.sessionId || sessionId,
        nickname: saved.nickname,
        avatar: saved.avatar || 'boy-short-blue-medium',
        ageTier: saved.ageTier || '8-11',
        googleLinked: Boolean(saved.googleLinked),
        googleName: saved.googleName,
        googlePhoto: saved.googlePhoto,
      },
      xp: Number(saved.xp || 0),
      badges: saved.badges || [],
      completedStories: saved.completedStories || [],
      quizScores: saved.quizScores || {},
      language: saved.language || (typeof localStorage !== 'undefined' && localStorage.getItem(LANGUAGE_KEY)) || 'en',
      achievements: saved.achievements || [],
      languagesUsed: saved.languagesUsed || [],
      settings: saved.settings || { dyslexiaMode: false },
    };
  }

  return {
    currentUser: null,
    sessionId,
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
      const sessionId = state.currentUser?.sessionId || getOrCreateUniqueSessionId();
      const newLang = action.payload?.language || state.language || 'en';
      if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem(LANGUAGE_KEY, newLang); } catch {}
      }
      nextState = { 
        ...state, 
        currentUser: {
          ...action.payload,
          sessionId,
          uid: action.payload?.uid || sessionId,
        },
        language: newLang,
      };
      break;
    }
    case 'SET_AGE_TIER': {
      const sessionId = state.currentUser?.sessionId || getOrCreateUniqueSessionId();
      const updatedUser = state.currentUser
        ? { ...state.currentUser, ageTier: action.payload }
        : { ageTier: action.payload, nickname: 'Explorer', uid: sessionId, sessionId };
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
      const sessionId = state.currentUser?.sessionId || getOrCreateUniqueSessionId();
      const newLang = p.language || state.language || 'en';
      if (typeof localStorage !== 'undefined') {
        try { localStorage.setItem(LANGUAGE_KEY, newLang); } catch {}
      }
      nextState = {
        ...state,
        currentUser: {
          uid: p.uid || sessionId,
          sessionId,
          nickname: p.nickname || 'Explorer',
          avatar: p.avatar || 'boy-short-blue-medium',
          ageTier: p.ageTier || '8-11',
          googleLinked: true,
          googleName: p.googleName,
          googlePhoto: p.googlePhoto,
        },
        xp: Number(p.xp || 0),
        badges: p.badges || [],
        completedStories: p.completedStories || [],
        quizScores: p.quizScores || {},
        language: newLang,
        achievements: p.achievements || [],
        languagesUsed: p.languagesUsed || [],
      };
      break;
    }
    // Update only the uid field — used when Firebase Auth resolves the canonical uid
    // after anonymous boot or after Google link. Never wipes profile data.
    case 'SYNC_UID': {
      if (!state.currentUser) return state;
      nextState = {
        ...state,
        currentUser: { ...state.currentUser, uid: action.payload },
      };
      break;
    }
    // Store the Firebase uid before the user has completed onboarding.
    // So when they finish onboarding the correct uid is used.
    case 'SET_FIREBASE_UID': {
      nextState = {
        ...state,
        pendingFirebaseUid: action.payload,
      };
      // Don't persist this — it's transient state
      return nextState;
    }
    case 'LOGOUT': {
      clearUserProfileSession();
      return {
        currentUser: null,
        sessionId: getOrCreateUniqueSessionId(),
        pendingFirebaseUid: null,
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

  saveUserProfile(nextState);
  return nextState;
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null, loadInitialState);

  // Boot anonymous Firebase session on first load (invisible to user)
  useEffect(() => {
    bootGuestSession();
  }, []);

  // Synchronize uid from Firebase Auth — only update uid, never wipe profile data
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return;
    const unsub = onAuthChange((firebaseUser) => {
      if (firebaseUser && firebaseUser.uid) {
        // If we have a local profile but the uid doesn't match the Firebase uid
        // (e.g. after Google link or on return visit), update only the uid
        if (state.currentUser?.nickname && state.currentUser.uid !== firebaseUser.uid) {
          console.log('[Auth] Syncing uid from Firebase:', firebaseUser.uid);
          dispatch({
            type: 'SYNC_UID',
            payload: firebaseUser.uid,
          });
        }
        // If no profile yet but Firebase has a session, store the uid so it's ready
        // when onboarding completes
        if (!state.currentUser) {
          dispatch({
            type: 'SET_FIREBASE_UID',
            payload: firebaseUser.uid,
          });
        }
      }
    });
    return () => unsub();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentUser?.uid, state.currentUser?.nickname]);

  // Real-time Cloud Profile & Leaderboard Sync
  useEffect(() => {
    if (state.currentUser?.uid && state.currentUser?.nickname) {
      syncUserProfileCloud({
        uid: state.currentUser.uid,
        sessionId: state.currentUser.sessionId || getOrCreateUniqueSessionId(),
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
    state.currentUser?.uid,
    state.currentUser?.nickname,
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
