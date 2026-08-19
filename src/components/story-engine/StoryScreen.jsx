/**
 * StoryScreen.jsx
 * 
 * Route wrapper for /story/:storyId
 * Loads the story module, checks unlock status, passes to StoryEngine.
 */

import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import StoryEngine from './StoryEngine';

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

  // Check if story is unlocked in standard sequence
  const storyIndex = [
    'right-to-education',
    'protection-from-child-marriage',
    'protection-from-child-labour',
    'protection-from-abuse',
    'right-to-healthcare',
    'right-to-equality',
  ].indexOf(storyId);

  if (storyIndex !== -1 && !isStoryUnlocked(storyIndex)) {
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
          <a
            href="/map"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Return to Map
          </a>
        </div>
      </div>
    );
  }

  return <StoryEngine story={story} />;
}
