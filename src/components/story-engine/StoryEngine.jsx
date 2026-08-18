/**
 * StoryEngine.jsx — Generic story renderer.
 * Reads story JSON, drives the node → choice → node state machine.
 * Handles hearts, XP, narration, accessibility controls, offline resilience,
 * real research "Did You Know?" callouts, and anonymized aggregate stats writes.
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { isFirebaseConfigured, syncUserProfileCloud } from '../../firebase/firebase';
import { enqueueOfflineWrite } from '../../lib/offlineQueue';
import { useApp } from '../../context/AppContext';
import CharacterAvatar from './CharacterAvatar';
import QuestPathHUD from './QuestPathHUD';
import HeartsHUD from './HeartsHUD';
import SceneBackground from './SceneBackground';
import EndingBadge from './EndingBadge';
import {
  speak,
  stopSpeaking,
  setSpeakingStateCallback,
  hasVoiceFor,
  isNarrationSupported,
} from '../../lib/narration';
import { checkNewAchievements } from '../../lib/achievements';
import { applyEventMultiplier, getActiveEvent } from '../../lib/seasonalEvents';
import AchievementUnlock from '../achievements/AchievementUnlock';
import ShareChallenge from '../share/ShareChallenge';
import sound from '../../lib/sound';

export default function StoryEngine({ story, onComplete }) {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';

  const [currentNodeId, setCurrentNodeId] = useState(story?.startNode || 'start');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [pathHistory, setPathHistory] = useState([]);
  const [narrationEnabled, setNarrationEnabled] = useState(true);
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [xpToast, setXpToast] = useState(null);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [pendingAchievement, setPendingAchievement] = useState(null);
  const activeEvent = getActiveEvent();

  // Accessibility Panel State
  const [showA11yModal, setShowA11yModal] = useState(false);
  const [textSize, setTextSize] = useState('standard'); // 'standard' | 'large' | 'xlarge'
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(true);

  // Post-Story Quiz State
  const [quizAnswers, setQuizAnswers] = useState({}); // { [qIndex]: selectedOptionIndex }
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const typingTimerRef = useRef(null);
  const fullTextRef = useRef('');

  // Online / Offline Detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Voice callback setup
  useEffect(() => {
    setSpeakingStateCallback(setIsNarrationPlaying);
    return () => {
      stopSpeaking();
    };
  }, []);

  // Check voice availability for selected language
  useEffect(() => {
    if (isNarrationSupported()) {
      setVoiceAvailable(hasVoiceFor(lang));
    } else {
      setVoiceAvailable(false);
    }
  }, [lang]);

  const currentNode = story?.nodes?.[currentNodeId];

  // Shuffle choices once per node so option order is random (prevents XP-order pattern)
  const shuffledChoices = useMemo(() => {
    if (!currentNode?.choices) return [];
    return [...currentNode.choices].sort(() => Math.random() - 0.5);
  }, [currentNodeId]); // only re-shuffle when the node changes

  // Helper to extract localized text
  const getNodeText = (node) => {
    if (!node?.text) return '';
    if (typeof node.text === 'object') {
      return node.text[lang] || node.text.en || '';
    }
    return node.text;
  };

  const getChoiceLabel = (choice) => {
    if (!choice?.label) return '';
    if (typeof choice.label === 'object') {
      return choice.label[lang] || choice.label.en || '';
    }
    return choice.label;
  };

  // Typewriter effect + Auto narration trigger
  useEffect(() => {
    if (!currentNode) return;

    const fullText = getNodeText(currentNode);
    fullTextRef.current = fullText;

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    if (reducedMotion) {
      setDisplayedText(fullText);
      setIsTyping(false);
    } else {
      setDisplayedText('');
      setIsTyping(true);

      let charIndex = 0;
      const speed = 24;

      typingTimerRef.current = setInterval(() => {
        charIndex += 1;
        setDisplayedText(fullText.slice(0, charIndex));

        if (charIndex >= fullText.length) {
          clearInterval(typingTimerRef.current);
          setIsTyping(false);
        }
      }, speed);
    }

    // Auto Narration trigger if enabled
    if (narrationEnabled && voiceAvailable) {
      speak(fullText, lang);
    }

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      stopSpeaking();
    };
  }, [currentNodeId, lang, narrationEnabled, reducedMotion, voiceAvailable]);

  // Click to fast-forward text
  const handleSkipTyping = () => {
    if (isTyping) {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      setDisplayedText(fullTextRef.current);
      setIsTyping(false);
    }
  };

  // Replay Narration Audio
  const handleReplayNarration = (e) => {
    e?.stopPropagation();
    if (currentNode) {
      sound.click();
      if (voiceAvailable) {
        speak(getNodeText(currentNode), lang);
      }
    }
  };

  // Toggle Sound FX
  const handleToggleSound = () => {
    const isMuted = sound.toggleMute();
    setSoundEnabled(!isMuted);
  };

  // Handle choice selection
  const handleChoice = (choice, event) => {
    sound.click();
    handleSkipTyping();

    const xpGained = choice.xp || 10;
    const choiceLabelText = getChoiceLabel(choice);

    // Show floating XP toast
    if (event?.clientX && event?.clientY) {
      setXpToast({ amount: xpGained, x: event.clientX, y: event.clientY - 20 });
      setTimeout(() => setXpToast(null), 1200);
    }

    // Hearts deduction on risky choice
    if (choice.risky) {
      sound.risky();
      setHearts((h) => Math.max(0, h - 1));
    } else {
      sound.advance();
    }

    // Accumulate path history
    setPathHistory((prev) => [
      ...prev,
      {
        stage: currentNode.stage ?? 0,
        nodeId: currentNodeId,
        choice: choiceLabelText,
        xp: xpGained,
        icon: choice.propIcon || '▸',
      },
    ]);

    // Next Node navigation
    if (choice.next && story?.nodes?.[choice.next]) {
      const nextNode = story.nodes[choice.next];
      setCurrentNodeId(choice.next);

      if (nextNode.end) {
        handleEndingReached(nextNode, xpGained);
      }
    }
  };

  // Handle reaching an ending node (with Offline Queue & Anonymized Stats Counters)
  const handleEndingReached = async (endingNode, finalXp) => {
    stopSpeaking();
    const outcome = endingNode.outcome || 'strong';
    const bonusXp = endingNode.bonusXp || (outcome === 'strong' ? 50 : 25);
    const storyId = story.id || 'right-to-education';
    const badge = {
      storyId,
      badgeName: endingNode.badge || 'Rights Champion',
      badgeIcon: endingNode.badgeIcon || '🎓',
      earnedAt: new Date().toISOString(),
    };

    if (outcome === 'strong') {
      sound.win();
    } else {
      sound.advance();
    }

    // Dispatch global actions — apply seasonal XP multiplier
    const eventBonusXp = applyEventMultiplier(bonusXp);
    dispatch({ type: 'ADD_XP', payload: eventBonusXp });
    dispatch({ type: 'ADD_BADGE', payload: badge });
    dispatch({ type: 'MARK_STORY_COMPLETE', payload: storyId });

    // Check for newly unlocked achievements
    const updatedState = {
      ...state,
      xp: (state.xp || 0) + finalXp + eventBonusXp,
      badges: [...(state.badges || []), badge],
      completedStories: [...(state.completedStories || []), storyId],
      strongOutcomes: outcome === 'strong' ? (state.strongOutcomes || 0) + 1 : (state.strongOutcomes || 0),
    };
    const newAchievements = checkNewAchievements(updatedState, state.achievements || []);
    if (newAchievements.length > 0) {
      newAchievements.forEach((a) => dispatch({ type: 'EARN_ACHIEVEMENT', payload: a.id }));
      // Show first one — queue rest
      setPendingAchievement(newAchievements[0]);
    }

    const newTotalXp = (state.xp || 0) + finalXp + applyEventMultiplier(bonusXp);
    const badgeCount = (state.badges?.length || 0) + 1;
    const uid = state.currentUser?.uid;

    if (uid) {
      const writePayload = {
        uid,
        bonusXp,
        badge,
        storyId,
        newTotalXp,
        nickname: state.currentUser.nickname,
        avatar: state.currentUser.avatar,
        badgeCount,
      };

      if (navigator.onLine && isFirebaseConfigured) {
        try {
          syncUserProfileCloud({
            uid,
            nickname: state.currentUser.nickname,
            avatar: state.currentUser.avatar,
            xp: newTotalXp,
            badges: [...(state.badges || []), badge],
            completedStories: [...(state.completedStories || []), storyId],
          });
        } catch {
          // Buffering to offline queue
          enqueueOfflineWrite({
            type: 'STORY_COMPLETION',
            payload: writePayload,
          });
        }
      } else {
        // Offline buffer
        enqueueOfflineWrite({
          type: 'STORY_COMPLETION',
          payload: writePayload,
        });
      }
    }
  };

  // Handle Post-Story Quiz Answer Selection
  const handleSelectQuizOption = (qIdx, optIdx) => {
    sound.click();
    setQuizAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  // Submit Knowledge Check Quiz
  const handleSubmitQuiz = () => {
    if (!story?.quiz) return;
    sound.win();
    setQuizSubmitted(true);

    let correctCount = 0;
    story.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scoreData = {
      correct: correctCount,
      total: story.quiz.length,
      completedAt: new Date().toISOString(),
    };

    dispatch({
      type: 'RECORD_QUIZ_SCORE',
      payload: { storyId: story.id, score: scoreData },
    });

    // Add Knowledge Check Bonus XP
    const quizBonusXp = correctCount * 15;
    if (quizBonusXp > 0) {
      dispatch({ type: 'ADD_XP', payload: quizBonusXp });
    }

    if (state.currentUser?.uid) {
      enqueueOfflineWrite({
        type: 'QUIZ_SCORE',
        payload: {
          uid: state.currentUser.uid,
          storyId: story.id,
          quizScore: scoreData,
        },
      });

      if (isFirebaseConfigured && db) {
        const statsRef = doc(db, 'stats', story.id);
        setDoc(
          statsRef,
          {
            quizAttempts: increment(1),
            quizPassCount: increment(correctCount === story.quiz.length ? 1 : 0),
            totalQuestionsAnswered: increment(story.quiz.length),
            totalCorrectAnswers: increment(correctCount),
          },
          { merge: true }
        ).catch(() => {});
      }
    }
  };

  // Language Switcher within Story
  const handleLanguageChange = (newLang) => {
    sound.click();
    dispatch({ type: 'UPDATE_LANGUAGE', payload: newLang });
  };

  if (!currentNode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] text-white">
        <p>Story node not found.</p>
      </div>
    );
  }

  const isEndingNode = Boolean(currentNode.end);
  const storyTitle = typeof story?.title === 'object' ? story.title[lang] || story.title.en : story?.title;

  // Text size classes
  const textClassMap = {
    standard: 'text-base sm:text-lg',
    large: 'text-lg sm:text-xl',
    xlarge: 'text-xl sm:text-2xl',
  };

  return (
    <div
      className={`relative w-full h-screen overflow-hidden font-body select-none ${
        highContrast ? 'bg-black text-white' : 'bg-[#0a0a1a] text-[#f0eef6]'
      }`}
    >
      {/* ── ACHIEVEMENT UNLOCK MODAL ── */}
      {pendingAchievement && (
        <AchievementUnlock
          achievement={pendingAchievement}
          onDismiss={() => setPendingAchievement(null)}
        />
      )}

      {/* ── SEASONAL EVENT BANNER ── */}
      {activeEvent && (
        <div className={`absolute z-40 left-0 right-0 bg-gradient-to-r ${activeEvent.bannerGradient} px-4 py-2 text-center text-xs font-extrabold shadow-lg flex items-center justify-center gap-2 ${activeEvent.textColor} ${!isOnline ? 'top-7' : 'top-0'}`}
          style={{ top: !isOnline ? '28px' : '0' }}>
          <span className="text-base">{activeEvent.emoji}</span>
          <span>{activeEvent.name} — {activeEvent.xpMultiplier}x XP Active!</span>
          <span className="text-base">{activeEvent.emoji}</span>
        </div>
      )}

      {/* ── OFFLINE STATUS BANNER ── */}
      {!isOnline && (
        <div
          role="status"
          aria-live="polite"
          className="absolute top-0 left-0 right-0 z-50 bg-amber-600/90 text-black px-4 py-1.5 text-center text-xs font-bold shadow-md flex items-center justify-center gap-2"
        >
          <span>📡</span>
          <span>You are playing offline — progress is saved locally and will auto-sync when you reconnect.</span>
        </div>
      )}


      {/* ── TOP HUD HEADER ── */}
      <header
        className={`absolute left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm ${
          !isOnline ? 'top-7' : 'top-0'
        }`}
      >
        {/* Left: Navigation & Hearts */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              stopSpeaking();
              sound.click();
              navigate('/map');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold tracking-wide transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#F5B942] focus-visible:outline-none"
            aria-label="Return to Rights Trail Map"
          >
            ← <span>{lang === 'hi' ? 'मानचित्र' : lang === 'kn' ? 'ನಕ್ಷೆ' : 'Rights Trail'}</span>
          </button>
          <HeartsHUD hearts={hearts} maxHearts={3} />
        </div>

        {/* Center: Stage Indicator */}
        <div className="hidden md:flex flex-col items-center">
          <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest">
            {storyTitle}
          </div>
          <QuestPathHUD stages={story?.stages || []} currentStage={currentNode.stage ?? 0} />
        </div>

        {/* Right: Sound, Narration, Accessibility, XP */}
        <div className="flex items-center gap-2">
          {/* Narration Replay */}
          <button
            onClick={handleReplayNarration}
            title={voiceAvailable ? 'Replay Narration' : 'Narration not available for this language'}
            aria-label="Replay voice narration"
            className={`p-2 rounded-xl border transition-all focus-visible:ring-2 focus-visible:ring-[#F5B942] focus-visible:outline-none ${
              isNarrationPlaying
                ? 'bg-[#F5B942] text-black border-[#F5B942] animate-pulse'
                : 'bg-white/10 hover:bg-white/20 border-white/15 text-white/80'
            }`}
          >
            🔊
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 transition-all text-xs focus-visible:ring-2 focus-visible:ring-[#F5B942] focus-visible:outline-none"
          >
            {soundEnabled ? '🔔' : '🔕'}
          </button>

          {/* Accessibility Settings Modal Button */}
          <button
            onClick={() => setShowA11yModal(true)}
            aria-label="Open accessibility and contrast settings"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 transition-all text-xs focus-visible:ring-2 focus-visible:ring-[#F5B942] focus-visible:outline-none"
          >
            ⚙️
          </button>

          {/* Language Switcher */}
          <div className="flex rounded-xl bg-white/10 border border-white/15 p-0.5 text-xs">
            {['en', 'hi', 'kn'].map((l) => (
              <button
                key={l}
                onClick={() => handleLanguageChange(l)}
                aria-label={`Switch language to ${l === 'en' ? 'English' : l === 'hi' ? 'Hindi' : 'Kannada'}`}
                className={`px-2 py-1 rounded-lg font-bold transition-all focus-visible:ring-2 focus-visible:ring-[#F5B942] ${
                  lang === l
                    ? 'bg-[#F5B942] text-black shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {l === 'en' ? 'EN' : l === 'hi' ? 'हिं' : 'ಕನ್ನ'}
              </button>
            ))}
          </div>

          {/* Live XP Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5B942]/15 border border-[#F5B942]/40 text-xs font-mono font-bold text-[#F5B942]">
            <span>⭐</span>
            <span>{state.xp || 0} XP</span>
          </div>
        </div>
      </header>

      {/* Floating XP Toast */}
      {xpToast && (
        <div
          style={{ top: xpToast.y, left: xpToast.x }}
          role="status"
          aria-live="polite"
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full font-display font-extrabold text-2xl text-[#F5B942] drop-shadow-md animate-bounce"
        >
          +{xpToast.amount} XP!
        </div>
      )}

      {/* ── SCENE CANVAS & BACKGROUND ── */}
      <div className="relative w-full h-full" aria-hidden="true">
        <SceneBackground
          location={currentNode.location || 'classroom'}
          mood={currentNode.mood || 'neutral'}
          timeOfDay={currentNode.timeOfDay || 'day'}
          sceneObjects={currentNode.sceneObjects || []}
        />

        {/* Primary Character Avatar */}
        <div className="absolute bottom-40 sm:bottom-48 left-10 sm:left-24 z-10">
          <CharacterAvatar
            pose={currentNode.characterPose || 'standing'}
            avatarId={state.currentUser?.avatar || 'girl-ponytail-coral-light'}
            mood={currentNode.mood || 'neutral'}
          />
        </div>

        {/* Secondary Scene Character */}
        {currentNode.secondaryCharacter && (
          <div className="absolute bottom-40 sm:bottom-48 right-10 sm:right-28 z-10">
            <CharacterAvatar
              pose={currentNode.secondaryCharacter.pose || 'standing'}
              avatarId={currentNode.secondaryCharacter.id || 'boy-short-blue-medium'}
              mood={currentNode.secondaryCharacter.mood || 'neutral'}
            />
          </div>
        )}
      </div>

      {/* ── DIALOGUE / DECISION PANEL (BOTTOM) ── */}
      {!isEndingNode && (
        <div
          onClick={handleSkipTyping}
          className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black via-black/90 to-transparent"
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {/* Story Dialogue Box with Motion Page-Turn Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNodeId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className={`relative p-5 sm:p-6 rounded-3xl border-2 shadow-2xl backdrop-blur-md ${
                  highContrast
                    ? 'bg-black border-white text-white'
                    : 'bg-[#121124]/90 border-white/15 text-white'
                }`}
              >
                {/* Beta badge for Indian languages */}
                {(lang === 'hi' || lang === 'kn') && (
                  <div className="absolute -top-3 right-5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono text-amber-300 font-bold">
                    {lang === 'hi' ? 'अनुवाद पूर्वावलोकन' : 'ಅನುವಾದ ಮುನ್ನೋಟ'}
                  </div>
                )}

                <p className={`${textClassMap[textSize]} leading-relaxed font-medium`}>
                  {displayedText}
                  {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-[#F5B942] animate-pulse" />}
                </p>

                {/* 💡 Real Research "Did You Know?" Callout */}
                {currentNode.didYouKnow && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-3.5 rounded-2xl bg-amber-500/15 border border-[#F5B942]/40 text-xs text-[#FFE7A8] flex items-start gap-2.5 shadow-inner"
                  >
                    <span className="text-base flex-shrink-0">💡</span>
                    <div>
                      <span className="font-mono font-bold uppercase text-[#F5B942] block text-[10px] tracking-wider">
                        Did You Know? • Verified Statutory Fact
                      </span>
                      <span className="leading-relaxed mt-0.5 block">
                        {typeof currentNode.didYouKnow === 'object'
                          ? currentNode.didYouKnow[lang] || currentNode.didYouKnow.en
                          : currentNode.didYouKnow}
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Decision Choices with Spring Hover & Tactile Tap */}
            {!isTyping && currentNode.choices && (
              <div role="group" aria-label="Story decision choices" className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
                {shuffledChoices.map((choice, cIdx) => (
                  <motion.button
                    key={cIdx}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => handleChoice(choice, e)}
                    className={`p-4 rounded-2xl border font-semibold text-xs sm:text-sm text-left transition-all shadow-lg flex items-center justify-between group focus-visible:ring-2 focus-visible:ring-[#F5B942] focus-visible:outline-none ${
                      highContrast
                        ? 'bg-black border-white text-white hover:bg-white hover:text-black'
                        : 'bg-white/10 hover:bg-[#F5B942] hover:text-black border-white/20 hover:border-[#F5B942]'
                    }`}
                  >
                    <span>{getChoiceLabel(choice)}</span>
                    <span className="text-[#F5B942] group-hover:text-black opacity-0 group-hover:opacity-100 transition-opacity text-base">→</span>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ACCESSIBILITY & SETTINGS MODAL ── */}
      {showA11yModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility settings"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div className="bg-[#121124] border-2 border-white/20 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-display font-extrabold text-lg text-[#F5B942]">
                ⚙️ Accessibility Settings
              </h3>
              <button
                onClick={() => setShowA11yModal(false)}
                className="text-white/60 hover:text-white text-sm focus-visible:ring-2 focus-visible:ring-[#F5B942]"
              >
                ✕
              </button>
            </div>

            {/* High Contrast Mode Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <div>
                <div className="text-sm font-bold text-white">High Contrast Mode</div>
                <div className="text-xs text-white/50">WCAG AAA black &amp; white contrast</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setHighContrast(!highContrast);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                  highContrast ? 'bg-[#FFE600] text-black font-extrabold' : 'bg-white/10 text-white/60'
                }`}
              >
                {highContrast ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Dyslexia-Friendly Mode Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <div>
                <div className="text-sm font-bold text-white">Dyslexia-Friendly Mode</div>
                <div className="text-xs text-white/50">OpenDyslexic font, wider spacing</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  dispatch({ type: 'TOGGLE_DYSLEXIA' });
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                  state.settings?.dyslexiaMode ? 'bg-[#F5B942] text-black font-extrabold' : 'bg-white/10 text-white/60'
                }`}
              >
                {state.settings?.dyslexiaMode ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Text Size Controls */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-white/70 uppercase">Text Size</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'standard', label: 'Standard' },
                  { key: 'large', label: 'Large' },
                  { key: 'xlarge', label: 'Extra Large' },
                ].map((sz) => (
                  <button
                    key={sz.key}
                    onClick={() => {
                      sound.click();
                      setTextSize(sz.key);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-[#F5B942] ${
                      textSize === sz.key
                        ? 'bg-[#F5B942] text-black shadow'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Narration Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <div>
                <div className="text-sm font-bold text-white">Voice Narration</div>
                <div className="text-xs text-white/50">
                  {voiceAvailable ? 'Read story text aloud' : 'Voice not available for this language'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setNarrationEnabled(!narrationEnabled);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                  narrationEnabled ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white/60'
                }`}
              >
                {narrationEnabled ? 'Enabled' : 'Muted'}
              </button>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <div>
                <div className="text-sm font-bold text-white">Instant Text Mode</div>
                <div className="text-xs text-white/50">Skips typewriter animation</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setReducedMotion(!reducedMotion);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                  reducedMotion ? 'bg-[#F5B942] text-black' : 'bg-white/10 text-white/60'
                }`}
              >
                {reducedMotion ? 'ON' : 'OFF'}
              </button>
            </div>

            <button
              onClick={() => setShowA11yModal(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5B942] to-[#ffd700] text-black font-extrabold text-sm shadow-xl hover:scale-105 transition-all"
            >
              Save &amp; Resume Quest
            </button>
          </div>
        </div>
      )}

      {/* ── ENDING SUMMARY OVERLAY & KNOWLEDGE CHECK ── */}
      {isEndingNode && (
        <div className="absolute inset-0 z-40 overflow-y-auto bg-gradient-to-b from-[#0a0a1a]/95 via-[#0e0e24] to-[#0a0a1a] p-4 sm:p-8 flex flex-col items-center justify-start">
          <div className="max-w-2xl w-full mx-auto py-6 flex flex-col items-center gap-6">
            {/* Animated Badge & Confetti */}
            <EndingBadge
              badge={currentNode.badge}
              badgeIcon={currentNode.badgeIcon}
              outcome={currentNode.outcome || 'strong'}
              bonusXp={currentNode.bonusXp || 50}
            />

            {/* Ending Narrative Text */}
            <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl w-full">
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5B942] mb-3">
                {getNodeText(currentNode)}
              </h3>

              {/* Journey Stats Pill */}
              <div className="grid grid-cols-3 gap-3 my-5">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-2xl font-extrabold text-[#F5B942]">{state.xp || 0}</div>
                  <div className="text-xs uppercase tracking-wider text-white/60">Total XP</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-2xl font-extrabold text-emerald-400">{hearts}/3</div>
                  <div className="text-xs uppercase tracking-wider text-white/60">Hearts Left</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-2xl font-extrabold text-sky-400">{pathHistory.length}</div>
                  <div className="text-xs uppercase tracking-wider text-white/60">Decisions</div>
                </div>
              </div>
            </div>

            {/* 🛡️ Non-dismissible Resource Link */}
            {currentNode.resourceLink && (
              <div className="w-full bg-rose-900/30 border-2 border-rose-500/60 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-base font-bold text-rose-300 mb-2">
                  <span>🛡️</span>
                  <span>Need Help? You Are Not Alone.</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-3">
                  If you or someone you know is facing abuse, child marriage, or child labour —
                  help is available <strong>right now, for free</strong>.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="tel:1098"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500 text-white font-extrabold text-sm hover:bg-rose-400 transition-all shadow focus-visible:ring-2 focus-visible:ring-white"
                  >
                    📞 Call Childline 1098
                  </a>
                  <Link
                    to={currentNode.resourceLink}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all focus-visible:ring-2 focus-visible:ring-white"
                  >
                    🔗 View All Resources
                  </Link>
                </div>
              </div>
            )}

            {/* ── POST-STORY KNOWLEDGE CHECK MINI-QUIZ ── */}
            {story?.quiz && (
              <div className="w-full bg-[#121124]/90 border-2 border-[#F5B942]/40 rounded-3xl p-6 backdrop-blur-md shadow-2xl flex flex-col gap-5">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📝</span>
                    <div>
                      <h4 className="font-display font-extrabold text-base sm:text-lg text-white">
                        {lang === 'hi' ? 'कानूनी ज्ञान जांच' : lang === 'kn' ? 'ಕಾನೂನು ಜ್ಞಾನ ಪರೀಕ್ಷೆ' : 'Quick Legal Knowledge Check'}
                      </h4>
                      <p className="text-xs text-white/60">
                        {lang === 'hi' ? 'वास्तविक संवैधानिक तथ्यों की जांच करें' : lang === 'kn' ? 'ಸಂವಿಧಾನದ ನಿಯಮಗಳನ್ನು ಪರಿಶೀಲಿಸಿ' : 'Reinforce the statutory constitutional facts (Earn +15 XP per question!)'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {story.quiz.map((qItem, qIdx) => {
                    const questionText = typeof qItem.question === 'object' ? qItem.question[lang] || qItem.question.en : qItem.question;
                    const explanationText = typeof qItem.explanation === 'object' ? qItem.explanation[lang] || qItem.explanation.en : qItem.explanation;
                    const selectedOpt = quizAnswers[qIdx];

                    return (
                      <div key={qIdx} className="flex flex-col gap-3 p-4 rounded-2xl bg-black/40 border border-white/10">
                        <div className="text-xs sm:text-sm font-bold text-white flex items-start gap-2">
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-[#F5B942] font-mono text-xs">
                            Q{qIdx + 1}
                          </span>
                          <span>{questionText}</span>
                        </div>

                        <div className="space-y-2">
                          {qItem.options.map((opt, optIdx) => {
                            const optText = typeof opt === 'object' ? opt[lang] || opt.en : opt;
                            const isSelected = selectedOpt === optIdx;
                            const isCorrect = qItem.correctIndex === optIdx;

                            let btnStyle = 'bg-white/5 hover:bg-white/15 border-white/10 text-white/80';
                            if (quizSubmitted) {
                              if (isCorrect) {
                                btnStyle = 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold';
                              } else if (isSelected) {
                                btnStyle = 'bg-rose-500/30 border-rose-400 text-rose-200';
                              }
                            } else if (isSelected) {
                              btnStyle = 'bg-amber-500/30 border-[#F5B942] text-amber-200 font-bold';
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={quizSubmitted}
                                onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                                className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between focus-visible:ring-2 focus-visible:ring-[#F5B942] focus-visible:outline-none ${btnStyle}`}
                              >
                                <span>{optText}</span>
                                {quizSubmitted && isCorrect && <span className="text-emerald-400 font-bold">✓ Correct</span>}
                                {quizSubmitted && isSelected && !isCorrect && <span className="text-rose-400 font-bold">✕</span>}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation on submit */}
                        {quizSubmitted && (
                          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 leading-relaxed">
                            💡 <strong>Statutory Fact:</strong> {explanationText}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    type="button"
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length < story.quiz.length}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#F5B942] to-[#ffd700] text-black font-extrabold text-sm shadow-xl hover:scale-102 transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Check Answers &amp; Collect Bonus XP →
                  </button>
                ) : (
                  <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-400/40 text-xs text-emerald-200 font-bold text-center">
                    ✓ Knowledge check recorded in your defender record!
                  </div>
                )}
              </div>
            )}

            {/* 📍 Journey Timeline Recap */}
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5">
              <h4 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-3">
                📍 {lang === 'hi' ? 'आपकी यात्रा' : lang === 'kn' ? 'ನಿಮ್ಮ ಪ್ರಯಾಣ' : 'Your Journey Path'}
              </h4>
              <div className="space-y-2.5">
                {pathHistory.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm text-white/85">
                    <span className="text-base">{step.icon}</span>
                    <span className="flex-1">{step.choice}</span>
                    <span className="text-[#F5B942] font-bold">+{step.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ⚡ Friend Challenge Card */}
            <ShareChallenge
              storyId={story.id || 'right-to-education'}
              storyTitle={typeof story.title === 'object' ? story.title[lang] || story.title.en : story.title || 'Rights Quest'}
              score={state.xp || 150}
              nickname={state.currentUser?.nickname || 'Hero Defender'}
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  sound.click();
                  setCurrentNodeId(story.startNode || 'start');
                  setHearts(3);
                  setPathHistory([]);
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                }}
                className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold transition-all text-sm focus-visible:ring-2 focus-visible:ring-[#F5B942]"
              >
                🔄 {lang === 'hi' ? 'फिर से खेलें' : lang === 'kn' ? 'ಮತ್ತೆ ಆಡಿ' : 'Play Again'}
              </button>

              <button
                onClick={() => {
                  sound.click();
                  if (onComplete) onComplete();
                  navigate('/map');
                }}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#F5B942] to-[#f0a000] text-black font-extrabold text-sm shadow-xl hover:scale-105 transition-all focus-visible:ring-2 focus-visible:ring-white"
              >
                🗺️ {lang === 'hi' ? 'मानचित्र पर जाएं' : lang === 'kn' ? 'ನಕ್ಷೆಗೆ ಹೋಗಿ' : 'Back to Rights Trail'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
