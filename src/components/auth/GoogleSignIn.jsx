/**
 * GoogleSignIn.jsx — Google Account Linking (Upgrade, not Replace)
 *
 * Uses Firebase's linkWithPopup() to UPGRADE the existing anonymous account
 * to a Google-backed account. The uid stays the SAME, so all RTDB data
 * (XP, badges, completedStories) is preserved automatically.
 *
 * Handles the conflict case where the Google account already has a separate
 * Firebase account, and surfaces a clear message to the user.
 *
 * Can be rendered from:
 * - Onboarding cloud sync step
 * - RightsMap profile panel (accessible anytime from /map)
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { linkGoogleAccount, fetchUserProfileCloud, deleteUserCloud } from '../../firebase/firebase';
import { useApp } from '../../context/AppContext';

export default function GoogleSignIn({ onSuccess }) {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [conflictInfo, setConflictInfo] = useState(null);

  const isLinked = state.currentUser?.googleLinked;

  const handleLink = async () => {
    setLoading(true);
    setError('');
    setConflictInfo(null);

    try {
      const result = await linkGoogleAccount();

      if (!result || result.error) {
        const errMsg = result?.error || '';
        if (errMsg === 'popup-closed') {
          // User dismissed — not an error worth showing
          return;
        }
        setError(errMsg || 'Google sign-in was cancelled or failed. Try again.');
        return;
      }

      const gUid = result.uid;
      const gName = result.displayName;
      const gPhoto = result.photoURL;

      if (result.isUpgrade) {
        // ── HAPPY PATH ──────────────────────────────────────────────────────
        // linkWithPopup() succeeded: the anonymous account is now Google-backed.
        // uid is UNCHANGED. All RTDB data is already on the correct uid.
        // We just update the local state to mark googleLinked = true.
        dispatch({
          type: 'SET_USER',
          payload: {
            ...state.currentUser,
            uid: gUid,
            googleLinked: true,
            googleName: gName,
            googlePhoto: gPhoto,
          },
        });

        setDone(true);
        onSuccess?.({ isNewUser: false, isUpgrade: true });

      } else if (result.conflictResolved) {
        // ── CONFLICT PATH ───────────────────────────────────────────────────
        // The Google account was already linked to a DIFFERENT Firebase uid.
        // We've signed into that existing account. Now we need to decide which
        // progress to use: the guest's local progress, or the existing cloud profile.

        const guestXp = state.xp || 0;
        const guestCompleted = (state.completedStories || []).length;

        // Fetch the existing Google account's cloud profile
        const cloudData = await fetchUserProfileCloud(gUid);
        const cloudXp = cloudData?.xp || 0;
        const cloudCompleted = (cloudData?.completedStories || []).length;

        if (cloudData && cloudData.nickname && (cloudXp >= guestXp || cloudCompleted >= guestCompleted)) {
          // Existing Google account has more or equal progress — restore it
          dispatch({
            type: 'RESTORE_CLOUD_USER',
            payload: {
              ...cloudData,
              uid: gUid,
              googleLinked: true,
              googleName: gName,
              googlePhoto: gPhoto,
            },
          });

          // If the guest had a different uid, clean it up
          const guestUid = state.currentUser?.uid;
          if (guestUid && guestUid !== gUid && state.xp === 0 && guestCompleted === 0) {
            await deleteUserCloud(guestUid);
          }

          setConflictInfo({
            type: 'cloud_wins',
            cloudXp,
            cloudCompleted,
            guestXp,
            guestCompleted,
          });
        } else {
          // Guest has more progress — keep guest progress but update uid & google info
          // Save the guest's progress under the new (Google-linked) uid
          dispatch({
            type: 'SET_USER',
            payload: {
              ...state.currentUser,
              uid: gUid,
              googleLinked: true,
              googleName: gName,
              googlePhoto: gPhoto,
            },
          });

          setConflictInfo({
            type: 'guest_wins',
            cloudXp,
            cloudCompleted,
            guestXp,
            guestCompleted,
          });
        }

        setDone(true);
        onSuccess?.({ isNewUser: false, isUpgrade: false, conflictResolved: true });
      }

    } catch (err) {
      console.error('[GoogleSignIn] Unexpected error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Already linked
  if (done || isLinked) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm">
          <span className="text-lg">✅</span>
          <div>
            <span className="font-semibold block">Linked to Google — progress syncs across devices!</span>
            {state.currentUser?.googleName && (
              <span className="text-xs text-emerald-400/80">{state.currentUser.googleName}</span>
            )}
          </div>
        </div>
        {conflictInfo && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
            {conflictInfo.type === 'cloud_wins' ? (
              <>
                ℹ️ Your previous Google account had more progress ({conflictInfo.cloudXp} XP,{' '}
                {conflictInfo.cloudCompleted} stories), so we restored that. Your guest session progress
                ({conflictInfo.guestXp} XP) has been replaced.
              </>
            ) : (
              <>
                ℹ️ Your guest session had more progress ({conflictInfo.guestXp} XP,{' '}
                {conflictInfo.guestCompleted} stories). Your existing Google account progress
                ({conflictInfo.cloudXp} XP) has been replaced by your current session.
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleLink}
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
        Your XP, badges & progress are kept. Sync across all your devices.
      </p>
    </div>
  );
}
