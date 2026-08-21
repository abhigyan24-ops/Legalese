/**
 * StoryScreen.jsx
 * 
 * Route wrapper for /story/:storyId
 * Loads the story module, checks unlock status, passes to StoryEngine.
 */

import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import StoryEngine from './StoryEngine';

// ── STORY-LEVEL ERROR BOUNDARY (Safety Net for Judges / Live Demo) ──
class StoryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Story Engine Error Catch]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] px-4 text-white">
          <div className="max-w-md w-full text-center bg-[#161226] border-2 border-[#FFB84D]/40 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4">
            <div className="text-5xl">⚖️</div>
            <h2 className="text-2xl font-bold font-display text-[#FFB84D]">
              Quest Encountered an Issue
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Something unexpected occurred in this story node. Your XP and progress are safely preserved.
            </p>
            <div className="flex gap-3 mt-2 w-full">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all"
              >
                🔄 Retry Quest
              </button>
              <Link
                to="/map"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FFB84D] to-[#f0a000] text-black font-extrabold text-xs shadow-lg hover:scale-105 transition-all text-center flex items-center justify-center"
              >
                🗺️ Return to Map
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Junior & Senior story module loaders
const juniorStoryModules = {
  'right-to-education': () => import('../../content/stories/junior/right-to-education'),
  'protection-from-child-marriage': () => import('../../content/stories/junior/protection-from-child-marriage'),
  'protection-from-child-labour': () => import('../../content/stories/junior/protection-from-child-labour'),
  'protection-from-abuse': () => import('../../content/stories/junior/protection-from-abuse'),
  'right-to-healthcare': () => import('../../content/stories/junior/right-to-healthcare'),
  'right-to-equality': () => import('../../content/stories/junior/right-to-equality'),
};

const seniorStoryModules = {
  'right-to-education': () => import('../../content/stories/senior/right-to-education'),
  'protection-from-child-marriage': () => import('../../content/stories/senior/protection-from-child-marriage'),
  'protection-from-child-labour': () => import('../../content/stories/senior/protection-from-child-labour'),
  'protection-from-abuse': () => import('../../content/stories/senior/protection-from-abuse'),
  'right-to-healthcare': () => import('../../content/stories/senior/right-to-healthcare'),
  'right-to-equality': () => import('../../content/stories/senior/right-to-equality'),
};

export default function StoryScreen() {
  const { storyId } = useParams();
  const { state, isStoryUnlocked } = useApp();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ageTier = state.currentUser?.ageTier || '8-11';

  useEffect(() => {
    const loadStory = async () => {
      setLoading(true);
      setError(null);

      try {
        const trackModules = (ageTier === '12-16') ? seniorStoryModules : juniorStoryModules;
        const storyModule = trackModules[storyId] || juniorStoryModules[storyId];
        if (!storyModule) {
          setError(`Story "${storyId}" not found`);
          setLoading(false);
          return;
        }

        const module = await storyModule();
        setStory(module.default);
      } catch (err) {
        console.error('Error loading story:', err);
        setError(`Failed to load story: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [storyId, ageTier]);

  // Check if story is unlocked
  if (storyId && !isStoryUnlocked(storyId)) {
    return <Navigate to="/map" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-surface">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-xl text-text-primary font-display">Loading story...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-surface px-4">
        <div className="max-w-md text-center">
          <p className="text-xl text-error mb-4">❌ {error}</p>
          <Link
            to="/map"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Return to Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <StoryErrorBoundary>
      <StoryEngine key={`${story?.id || storyId}-${ageTier}`} story={story} />
    </StoryErrorBoundary>
  );
}
