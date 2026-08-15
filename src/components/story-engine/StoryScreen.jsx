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

// Story module imports
const storyModules = {
  'right-to-education': () => import('../../content/stories/right-to-education'),
  'right-to-healthcare': () => import('../../content/stories/right-to-healthcare'),
  'protection-from-child-labour': () => import('../../content/stories/protection-from-child-labour'),
  'protection-from-abuse': () => import('../../content/stories/protection-from-abuse'),
  'protection-from-child-marriage': () => import('../../content/stories/protection-from-child-marriage'),
};

export default function StoryScreen() {
  const { storyId } = useParams();
  const { state, isStoryUnlocked } = useApp();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStory = async () => {
      setLoading(true);
      setError(null);

      try {
        const storyModule = storyModules[storyId];
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
  }, [storyId]);

  // Check if story is unlocked
  const storyIndex = [
    'right-to-education',
    'right-to-healthcare',
    'protection-from-child-labour',
    'protection-from-abuse',
    'protection-from-child-marriage',
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
