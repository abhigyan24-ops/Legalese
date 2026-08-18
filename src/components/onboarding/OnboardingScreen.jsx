/**
 * OnboardingScreen.jsx — Animated Delightful 4-Step Onboarding
 * 
 * Powered by Framer Motion AnimatePresence:
 * - Step 1: Vector Hero Avatar Selection (Boy/Girl) with spring hover scales
 * - Step 2: Custom Nickname generator with 360-spin shuffle micro-interaction
 * - Step 3: Age tier selection cards
 * - Step 4: Language selection (English, Hindi, Kannada)
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { initAnonymousSession, syncUserProfileCloud } from '../../firebase/firebase';
import { ProtagonistSprite } from '../story-engine/CharacterAvatar';
import { generateNickname } from './NicknameGenerator';
import sound from '../../lib/sound';
import AnimatedButton from '../ui/AnimatedButton';
import ParticleBackground from '../ui/ParticleBackground';

// ── VECTOR AVATAR ICONS ──
function BoyAvatarIcon({ active }) {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <circle cx="30" cy="30" r="28" fill={active ? '#F5B942' : 'rgba(255,255,255,0.08)'} />
      <circle cx="30" cy="28" r="14" fill="#d4a574" />
      <ellipse cx="30" cy="18" rx="14" ry="8" fill="#2c1810" />
      <rect x="18" y="14" width="24" height="8" rx="4" fill="#2c1810" />
      <circle cx="25" cy="27" r="2" fill="#222" />
      <circle cx="35" cy="27" r="2" fill="#222" />
      <path d="M26 33 Q30 37 34 33" stroke="#222" fill="none" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 54 C16 43 23 41 30 41 C37 41 44 43 44 54 Z" fill="#2e86c1" />
    </svg>
  );
}

function GirlAvatarIcon({ active }) {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <circle cx="30" cy="30" r="28" fill={active ? '#F5B942' : 'rgba(255,255,255,0.08)'} />
      <path d="M16 26 Q12 44 16 52" stroke="#1a0f0a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M44 26 Q48 44 44 52" stroke="#1a0f0a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="28" r="14" fill="#d4a574" />
      <ellipse cx="30" cy="18" rx="14" ry="9" fill="#1a0f0a" />
      <circle cx="25" cy="27" r="2" fill="#222" />
      <circle cx="35" cy="27" r="2" fill="#222" />
      <path d="M26 33 Q30 37 34 33" stroke="#222" fill="none" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 54 C16 43 23 41 30 41 C37 41 44 43 44 54 Z" fill="#e74c3c" />
    </svg>
  );
}

const AGE_OPTIONS = [
  { id: '8-11', label: '8–11 Years', desc: 'Junior Defender • Foundational story tips & dilemmas', icon: '🌱' },
  { id: '12-16', label: '12–16 Years', desc: 'Senior Defender • Advanced real-life legal scenarios', icon: '⭐' },
];

const LANG_OPTIONS = [
  { id: 'en', name: 'English', native: 'English', flag: '🌟' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🌺' },
];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const [step, setStep] = useState(1);
  const [avatarId, setAvatarId] = useState('boy-short-blue-medium');
  const [nickname, setNickname] = useState(() => generateNickname());
  const [ageTier, setAgeTier] = useState('8-11');
  const [language, setLanguage] = useState('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleShuffleNickname = () => {
    sound.click();
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 400);
    setNickname(generateNickname());
  };

  const handleNextStep = () => {
    sound.advance();
    setStep((s) => Math.min(4, s + 1));
  };

  const handlePrevStep = () => {
    sound.click();
    setStep((s) => Math.max(1, s - 1));
  };

  const handleComplete = async () => {
    sound.win();
    setIsSubmitting(true);
    const finalNickname = nickname.trim() || generateNickname();

    try {
      const uid = await initAnonymousSession();

      // Write initial user profile document to Realtime Cloud asynchronously
      if (uid) {
        syncUserProfileCloud({
          uid,
          avatar: avatarId,
          nickname: finalNickname,
          ageTier,
          language,
          xp: 0,
          badges: [],
          completedStories: [],
        });
      }

      dispatch({
        type: 'SET_USER',
        payload: {
          uid,
          avatar: avatarId,
          nickname: finalNickname,
          ageTier,
          language,
        },
      });
      navigate('/map');
    } catch (err) {
      console.error('Onboarding session error:', err);
      dispatch({
        type: 'SET_USER',
        payload: {
          uid: `guest-${Date.now()}`,
          avatar: avatarId,
          nickname: finalNickname,
          ageTier,
          language,
        },
      });
      navigate('/map');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Motion variants for step slide/fade
  const stepVariants = {
    initial: { opacity: 0, x: 25 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, x: -25, transition: { duration: 0.25 } },
  };

  return (
    <div className="min-h-screen bg-[#161226] text-[#FFF8F0] font-body flex items-center justify-center p-4 sm:p-6 relative select-none overflow-hidden">
      <ParticleBackground count={20} />

      <div className="max-w-md w-full relative z-10 flex flex-col gap-6">
        {/* Top Progress Dots */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <span className="font-display font-black text-base text-[#FFB84D]">Legalese</span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <motion.div
                key={s}
                animate={{
                  width: step === s ? 24 : 8,
                  backgroundColor: step >= s ? '#FFB84D' : 'rgba(255,255,255,0.2)',
                }}
                className="h-2 rounded-full transition-all"
              />
            ))}
          </div>
        </div>

        {/* ── CARD CONTAINER ── */}
        <div className="bg-[#231C3D] border-2 border-[#312756] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* STEP 1: AVATAR PICKER */}
            {step === 1 && (
              <motion.div
                key="step-1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-5 text-center"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                    Choose Your Hero Avatar
                  </h2>
                  <p className="text-xs text-[#9FBBAB] mt-1">
                    Pick a character to embark on the Constitutional Trail
                  </p>
                </div>

                {/* Hero Avatar Display */}
                <div className="w-32 h-40 mx-auto rounded-3xl bg-[#161226] border-2 border-[#FFB84D] flex items-center justify-center shadow-xl relative overflow-hidden p-2">
                  <div className="w-24 h-36 flex items-center justify-center">
                    <ProtagonistSprite gender={avatarId.includes('girl') ? 'girl' : 'boy'} mood="happy" pose="standing" />
                  </div>
                </div>

                {/* Boy / Girl Selection Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      sound.click();
                      setAvatarId('boy-short-blue-medium');
                    }}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                      avatarId.includes('boy')
                        ? 'bg-[#312756] border-[#FFB84D] shadow-lg ring-1 ring-[#FFB84D]/40'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <BoyAvatarIcon active={avatarId.includes('boy')} />
                    <span className="text-xs font-extrabold text-white">Boy</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      sound.click();
                      setAvatarId('girl-ponytail-coral-light');
                    }}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                      avatarId.includes('girl')
                        ? 'bg-[#312756] border-[#FFB84D] shadow-lg ring-1 ring-[#FFB84D]/40'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <GirlAvatarIcon active={avatarId.includes('girl')} />
                    <span className="text-xs font-extrabold text-white">Girl</span>
                  </motion.button>
                </div>

                <AnimatedButton variant="primary" size="md" onClick={handleNextStep}>
                  Next: Choose Nickname →
                </AnimatedButton>
              </motion.div>
            )}

            {/* STEP 2: NICKNAME PICKER */}
            {step === 2 && (
              <motion.div
                key="step-2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-5 text-center"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                    Pick Your Defender Nickname
                  </h2>
                  <p className="text-xs text-[#9FBBAB] mt-1">
                    Your handle is 100% anonymous to keep you safe
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      maxLength={18}
                      placeholder="e.g. BraveTiger42"
                      className="w-full bg-[#132A20] border-2 border-[#3A6650] focus:border-[#F5B942] rounded-2xl px-4 py-3.5 text-base font-extrabold font-display text-[#FFE7A8] outline-none shadow-inner text-center"
                    />

                    <motion.button
                      type="button"
                      onClick={handleShuffleNickname}
                      animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      title="Shuffle new random nickname"
                      className="absolute right-3 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F5B942] transition-colors"
                    >
                      🎲
                    </motion.button>
                  </div>
                  <span className="text-[11px] text-[#9FBBAB]">
                    Tap 🎲 to generate a fun, safe random name!
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <AnimatedButton variant="secondary" size="md" onClick={handlePrevStep} className="flex-1">
                    ← Back
                  </AnimatedButton>
                  <AnimatedButton variant="primary" size="md" onClick={handleNextStep} className="flex-1">
                    Next: Age Group →
                  </AnimatedButton>
                </div>
              </motion.div>
            )}

            {/* STEP 3: AGE SELECTION */}
            {step === 3 && (
              <motion.div
                key="step-3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-5 text-center"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                    What Age Are You?
                  </h2>
                  <p className="text-xs text-[#9FBBAB] mt-1">
                    Customizes the difficulty of story dilemmas and tips
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  {AGE_OPTIONS.map((opt) => (
                    <motion.button
                      key={opt.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        sound.click();
                        setAgeTier(opt.id);
                      }}
                      className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                        ageTier === opt.id
                          ? 'bg-[#312756] border-[#FFB84D] shadow-lg ring-1 ring-[#FFB84D]/40'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <span className="text-2xl">{opt.icon}</span>
                        <div>
                          <div className="text-xs sm:text-sm font-extrabold text-white">
                            {opt.label}
                          </div>
                          <div className="text-[11px] text-[#B8B0D6]">{opt.desc}</div>
                        </div>
                      </div>
                      {ageTier === opt.id && <span className="text-[#FFB84D] font-bold text-sm">✓</span>}
                    </motion.button>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <AnimatedButton variant="secondary" size="md" onClick={handlePrevStep} className="flex-1">
                    ← Back
                  </AnimatedButton>
                  <AnimatedButton variant="primary" size="md" onClick={handleNextStep} className="flex-1">
                    Next: Language →
                  </AnimatedButton>
                </div>
              </motion.div>
            )}

            {/* STEP 4: LANGUAGE SELECTION */}
            {step === 4 && (
              <motion.div
                key="step-4"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-5 text-center"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white">
                    Select Your Language
                  </h2>
                  <p className="text-xs text-[#9FBBAB] mt-1">
                    Choose the language you want to read and listen in
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  {LANG_OPTIONS.map((l) => (
                    <motion.button
                      key={l.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        sound.click();
                        setLanguage(l.id);
                        dispatch({ type: 'UPDATE_LANGUAGE', payload: l.id });
                      }}
                      className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                        language === l.id
                          ? 'bg-[#312756] border-[#FFB84D] shadow-lg ring-1 ring-[#FFB84D]/40'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <span className="text-2xl">{l.flag}</span>
                        <div>
                          <div className="text-xs sm:text-sm font-extrabold text-white">{l.name}</div>
                          <div className="text-[11px] text-[#FFE5B4]">{l.native}</div>
                        </div>
                      </div>
                      {language === l.id && <span className="text-[#FFB84D] font-bold text-sm">✓</span>}
                    </motion.button>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <AnimatedButton variant="secondary" size="md" onClick={handlePrevStep} className="flex-1">
                    ← Back
                  </AnimatedButton>
                  <AnimatedButton
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    onClick={handleComplete}
                    className="flex-1"
                    icon="🚀"
                  >
                    {isSubmitting ? 'Starting...' : 'Enter Trail →'}
                  </AnimatedButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
