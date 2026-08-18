/**
 * GoogleSignIn.jsx — Optional Google Account Linking
 *
 * Shows in the profile/settings panel. Links the current anonymous
 * session to a Google account for cross-device persistence.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithGoogle, fetchUserProfileCloud, deleteUserCloud, syncUserProfileCloud } from '../../firebase/firebase';
import { useApp } from '../../context/AppContext';

export default function GoogleSignIn({ onSuccess }) {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const isLinked = state.currentUser?.googleLinked;

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const gUser = await signInWithGoogle();
      if (!gUser || gUser.error) {
        const errCode = gUser?.error || '';
        if (errCode.includes('operation-not-allowed') || errCode.includes('configuration-not-found')) {
          setError('Google Sign-in is not yet enabled in Firebase Console (Authentication → Sign-in method → Enable Google).');
        } else if (errCode.includes('unauthorized-domain')) {
          setError('Current domain is not authorized in Firebase Console (Authentication → Settings → Authorized domains).');
        } else if (errCode.includes('popup-closed-by-user')) {
          setError('Sign-in popup was closed before completing.');
        } else if (errCode.includes('popup-blocked')) {
          setError('Popup was blocked by your browser. Please allow popups for this site.');
        } else {
          setError(errCode || 'Google sign-in was cancelled or failed. Try again.');
        }
        return;
      }

      const oldUid = state.currentUser?.uid;

      // 1. Check if an existing profile already exists in Firebase Realtime Database
      const cloudData = await fetchUserProfileCloud(gUser.uid);

      if (cloudData && cloudData.nickname) {
        // User has an existing saved profile — restore all progress and go directly to /map!
        dispatch({
          type: 'RESTORE_CLOUD_USER',
          payload: {
            ...cloudData,
            uid: gUser.uid,
            googleLinked: true,
            googleName: gUser.displayName,
            googlePhoto: gUser.photoURL,
          },
        });

        // Clean up temporary anonymous user if any
        if (oldUid && oldUid !== gUser.uid && (!state.currentUser?.nickname || state.currentUser.nickname === 'Explorer')) {
          await deleteUserCloud(oldUid);
        }

        setDone(true);
        onSuccess?.({ isNewUser: false });
      } else {
        // Brand new Google account without a profile yet:
        // Set Google credentials but DO NOT assume name/avatar/age — send to onboarding to customize!
        dispatch({
          type: 'SET_USER',
          payload: {
            uid: gUser.uid,
            nickname: '', // Prompt them to pick nickname
            avatar: 'boy-short-blue-medium',
            ageTier: '8-11',
            language: state.language || 'en',
            googleLinked: true,
            googleName: gUser.displayName,
            googlePhoto: gUser.photoURL,
          },
        });

        // Clean up old anonymous UID if any
        if (oldUid && oldUid !== gUser.uid) {
          await deleteUserCloud(oldUid);
        }

        setDone(true);
        onSuccess?.({ isNewUser: true });
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done || isLinked) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm">
        <span className="text-lg">✅</span>
        <span className="font-semibold">
          Linked to Google — your progress syncs across devices!
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSignIn}
        disabled={loading}
        className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-white text-gray-700 font-bold text-sm shadow-lg hover:shadow-xl transition-all border border-gray-200 disabled:opacity-60"
      >
        {loading ? (
          <span className="animate-spin text-lg">⏳</span>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        )}
        {loading ? 'Connecting...' : 'Link Google Account'}
      </motion.button>
      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
      <p className="text-xs text-white/40 text-center">
        Your nickname & avatar are kept. Progress syncs across all your devices.
      </p>
    </div>
  );
}
