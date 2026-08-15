/**
 * LandingPage.jsx — Legalese Platform & Rights Quest Showcase
 * 
 * Aesthetic: Magical Twilight Storybook for Kids & Youth (Ages 8–16)
 * Palette: Deep Twilight (#161226, #231C3D), Candlelight Amber (#FFB84D, #FFE5B4), Sunset Coral (#FF6B6B), Parchment (#FFF8F0)
 * Typography: Baloo 2 (Display), Plus Jakarta Sans / Inter (Body)
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import sound from '../../lib/sound';
import SmoothScroll from '../ui/SmoothScroll';
import Hero3DCanvas from '../ui/Hero3DCanvas';
import ParticleBackground from '../ui/ParticleBackground';
import AnimatedButton from '../ui/AnimatedButton';

const CHAPTERS = [
  {
    id: 'right-to-education',
    name: 'Right to Education',
    tagline: 'Every child belongs in school, always.',
    icon: '🎒',
    color: 'from-amber-400 to-amber-600',
    borderColor: 'border-amber-400/40',
    status: 'unlocked',
  },
  {
    id: 'right-to-healthcare',
    name: 'Right to Healthcare',
    tagline: 'Free medical care and essential child health.',
    icon: '🩺',
    color: 'from-sky-400 to-indigo-600',
    borderColor: 'border-sky-400/40',
    status: 'unlocked',
  },
  {
    id: 'protection-from-child-labour',
    name: 'Protection from Child Labour',
    tagline: 'Freedom to learn, play, and grow up safely.',
    icon: '🏭',
    color: 'from-orange-400 to-rose-600',
    borderColor: 'border-orange-400/40',
    status: 'unlocked',
  },
  {
    id: 'protection-from-abuse',
    name: 'Protection from Abuse',
    tagline: 'Safe boundaries, trusted allies, zero blame.',
    icon: '🛡️',
    color: 'from-emerald-400 to-teal-600',
    borderColor: 'border-emerald-400/40',
    status: 'upcoming',
  },
  {
    id: 'protection-from-child-marriage',
    name: 'Protection from Child Marriage',
    tagline: 'Protecting young dreams and bright futures.',
    icon: '📜',
    color: 'from-purple-400 to-violet-600',
    borderColor: 'border-purple-400/40',
    status: 'upcoming',
  },
];

const MINI_DEMO_CHOICES = [
  {
    id: 'c1',
    text: 'Speak to the School Committee to protect Meena’s seat',
    xp: 15,
    outcome: '🌟 Best Choice! The school committee confirms no child can be turned away.',
    type: 'strong',
  },
  {
    id: 'c2',
    text: 'Pool pocket money together with friends for a quick fix',
    xp: 10,
    outcome: '✨ Helpful, but temporary. Knowing the law ensures lasting protection!',
    type: 'medium',
  },
  {
    id: 'c3',
    text: 'Sell school books quietly to raise the funds',
    xp: 2,
    outcome: '💔 Risky shortcut! Books are your future — the Constitution protects your right to learn.',
    type: 'risky',
  },
];

export default function LandingPage() {
  const [activeChoice, setActiveChoice] = useState(null);

  const handleConfetti = (e) => {
    sound.win();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x, y },
      colors: ['#FFB84D', '#FFE5B4', '#FF6B6B', '#9D8CE0', '#FFF8F0'],
    });
  };

  const handleDemoChoice = (choice, e) => {
    if (choice.type === 'strong') {
      handleConfetti(e);
    } else if (choice.type === 'risky') {
      sound.risky();
    } else {
      sound.advance();
    }
    setActiveChoice(choice);
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#161226] text-[#FFF8F0] font-body relative overflow-hidden select-none">
        {/* Soft Golden Fireflies Ambience */}
        <ParticleBackground count={26} />

        {/* ── TOP NAVIGATION ── */}
        <header className="sticky top-0 z-40 bg-[#161226]/85 backdrop-blur-md border-b border-[#312756] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FFB84D] to-[#FFE5B4] text-black flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(255,184,77,0.4)]">
              ✨
            </div>
            <div>
              <span className="font-display font-extrabold text-xl text-[#FFB84D] tracking-wide">
                Legalese
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-[#B8B0D6] font-medium">
                • Constitutional Literacy for Kids
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/teachers"
              onClick={() => sound.click()}
              className="text-xs font-bold text-[#B8B0D6] hover:text-white transition-colors hidden md:inline-block"
            >
              👩‍🏫 For Teachers
            </Link>
            <Link
              to="/impact"
              onClick={() => sound.click()}
              className="text-xs font-bold text-[#B8B0D6] hover:text-white transition-colors hidden sm:inline-block"
            >
              📊 Impact
            </Link>

            <Link to="/onboarding">
              <AnimatedButton variant="primary" size="sm" icon="🚀">
                Play Rights Quest
              </AnimatedButton>
            </Link>
          </div>
        </header>

        {/* ── HERO SECTION WITH 3D MONUMENT ── */}
        <section className="relative pt-8 sm:pt-14 pb-16 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex-1 flex flex-col items-start gap-5 max-w-xl text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#231C3D] border border-[#FFB84D]/40 text-[#FFE5B4] text-xs font-bold shadow-inner">
              <span className="text-sm">📖</span>
              <span>An Interactive Storybook Adventure</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.12] tracking-tight">
              Where <span className="text-[#FFB84D]">Courage Teaches</span> Children Their Rights.
            </h1>

            <p className="text-sm sm:text-base text-[#B8B0D6] leading-relaxed font-normal">
              Step into an empowering, warm storybook game where children ages 8–16 explore real-life legal
              protections through heartfelt choices, caring allies, and zero confusing jargon.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link to="/onboarding">
                <AnimatedButton variant="primary" size="lg" icon="✨">
                  Play Rights Quest
                </AnimatedButton>
              </Link>

              <Link to="/map">
                <AnimatedButton variant="secondary" size="lg" icon="🗺️">
                  Explore Story Trail
                </AnimatedButton>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-3 text-xs text-[#B8B0D6]">
              <span className="flex items-center gap-1.5">
                <strong className="text-[#FFB84D]">5</strong> Illustrated Stories
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <strong className="text-emerald-400">100%</strong> Anonymous &amp; Safe
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <strong className="text-sky-300">3</strong> Languages
              </span>
            </div>
          </motion.div>

          {/* 3D Constitution Monument Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-2xl flex flex-col items-center justify-center relative"
          >
            <Hero3DCanvas />
          </motion.div>
        </section>

        {/* ── 5 CHAPTERS OF RIGHTS QUEST (SCANNABLE & CLEAN) ── */}
        <section className="py-14 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col gap-10 z-10 relative">
          <div className="flex flex-col items-center text-center gap-2 max-w-xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FFB84D]">
              The 5 Story Chapters
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              Real Situations. Real Power.
            </h2>
            <p className="text-xs sm:text-sm text-[#B8B0D6]">
              Scan through the 5 essential child protections you will discover on your Rights Quest.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHAPTERS.map((ch) => (
              <div
                key={ch.id}
                className="group relative rounded-3xl bg-[#231C3D] border-2 border-[#312756] hover:border-[#FFB84D]/60 p-6 flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {ch.icon}
                  </div>

                  {ch.status === 'upcoming' ? (
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/5 text-[#B8B0D6] border border-white/10">
                      Unlocks along trail
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Ready to Play
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-[#FFB84D] transition-colors">
                    {ch.name}
                  </h3>
                  <p className="text-xs text-[#B8B0D6] mt-1 leading-relaxed">
                    {ch.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <Link
                    to="/onboarding"
                    onClick={handleConfetti}
                    className="text-[#FFB84D] font-extrabold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Play this story</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── LIVE INTERACTIVE STORY SNIPPET (MOMENT FROM GAME) ── */}
        <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto z-10 relative">
          <div className="rounded-3xl bg-[#231C3D] border-2 border-[#FFB84D]/50 p-6 sm:p-10 shadow-2xl flex flex-col gap-6 backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎒</span>
                <div>
                  <span className="text-[11px] font-bold text-[#FFB84D] uppercase">
                    Interactive Gameplay Moment
                  </span>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                    Meena’s First Day Dilemma
                  </h3>
                </div>
              </div>
              <span className="text-xs text-[#B8B0D6]">Try a choice below!</span>
            </div>

            {/* Story Prompt */}
            <div className="p-5 rounded-2xl bg-[#161226]/80 border border-white/10 text-xs sm:text-sm text-white/90 leading-relaxed">
              &quot;Meena’s seat is empty again. When you find her at the village bus stand, she reveals the school asked
              for unreceipted fees her family cannot pay. What should you do?&quot;
            </div>

            {/* 3 Interactive Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MINI_DEMO_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={(e) => handleDemoChoice(choice, e)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 text-xs font-semibold hover:scale-102 ${
                    activeChoice?.id === choice.id
                      ? 'bg-[#FFB84D] text-black border-[#FFB84D] shadow-lg font-bold'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/90'
                  }`}
                >
                  <span>{choice.text}</span>
                  <span className={activeChoice?.id === choice.id ? 'text-black font-extrabold' : 'text-[#FFB84D] font-bold'}>
                    +{choice.xp} XP
                  </span>
                </button>
              ))}
            </div>

            {/* Consequence Feedback Callout */}
            <AnimatePresence>
              {activeChoice && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-start gap-2.5 shadow-lg ${
                    activeChoice.type === 'strong'
                      ? 'bg-emerald-950/60 border border-emerald-400/50 text-emerald-200'
                      : activeChoice.type === 'risky'
                      ? 'bg-rose-950/60 border border-rose-400/50 text-rose-200'
                      : 'bg-amber-950/60 border border-[#FFB84D]/50 text-amber-200'
                  }`}
                >
                  <span className="text-base">💬</span>
                  <p>{activeChoice.outcome}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── CLEAN, INTENTIONAL FOOTER ── */}
        <footer className="border-t border-[#312756] bg-[#110D20] py-12 px-4 sm:px-8 text-xs text-[#B8B0D6] z-10 relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <span className="font-display font-extrabold text-lg text-white">Legalese</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                A warm, interactive legal education platform empowering children across India through the Rights Quest journey.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase font-bold text-[#FFB84D]">The Journey</span>
              <Link to="/onboarding" className="hover:text-white transition-colors">🚀 Play Rights Quest</Link>
              <Link to="/map" className="hover:text-white transition-colors">🗺️ Rights Trail Map</Link>
              <Link to="/leaderboard" className="hover:text-white transition-colors">🏆 Hall of Fame</Link>
              <Link to="/certificate" className="hover:text-white transition-colors">🎓 Award Certificate</Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase font-bold text-[#FFB84D]">For Schools &amp; NGOs</span>
              <Link to="/teachers" className="hover:text-white transition-colors">👩‍🏫 Teacher Lesson Plans</Link>
              <Link to="/impact" className="hover:text-white transition-colors">📊 Learning Analytics</Link>
              <Link to="/advocate-login" className="hover:text-white transition-colors">🛡️ Legal Advocate Portal</Link>
              <Link to="/resources" className="hover:text-white transition-colors">📞 Childline 1098 Help</Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase font-bold text-[#FFB84D]">Safety by Design</span>
              <p className="text-[11px] leading-relaxed">
                Zero personal data collected. Anonymous avatars only. Respecting India’s DPDP Act 2023.
              </p>
              <span className="text-[10px] text-[#FFE5B4]">Emergency Lifeline: <strong>1098</strong></span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <span>© 2026 Legalese • Free Open Educational Resource</span>
            <span>Where Courage Teaches Children Their Rights</span>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
