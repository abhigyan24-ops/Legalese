/**
 * LandingPage.jsx — Rights Quest & Legalese Platform
 * 
 * Spec Compliance (Sections 1–11):
 * - Canvas: Forest depths (#132A20), Gold accent (#F5B942), Warm Cream (#F5EFE0), Ink (#0D1F17)
 * - Typography: Poster-scale headings with clamp(), tight line-height, single display family (Baloo 2)
 * - Rhythm: Alternating bands (Dark Forest -> Warm Cream -> Dark Forest -> Warm Cream -> Dark Forest)
 * - Separators: Dotted divider rules (.dotted-divider / .dotted-divider-dark)
 * - Hero: 3 tilted floating story-preview cards (-6°, +4°, -5° offset)
 * - Saturated specimen cards for all 6 rights in exact order
 * - Tilted social proof & gameplay cards on warm cream
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import GoogleSignIn from '../auth/GoogleSignIn';
import confetti from 'canvas-confetti';
import sound from '../../lib/sound';
import SmoothScroll from '../ui/SmoothScroll';
import ParticleBackground from '../ui/ParticleBackground';
import InteractiveStoryDeck from './InteractiveStoryDeck';

// ── 6 Saturated Rights Specimen Cards Data (Exact Order: Education, Child Marriage, Child Labour, Abuse, Healthcare, Equality) ──
const RIGHTS_CATEGORIES = [
  {
    id: 'right-to-education',
    number: '01',
    badge: 'Article 21A & RTE Act',
    title: 'Right for Education',
    blurb: 'Guaranteed free and compulsory schooling for every child aged 6–14 with zero discrimination or hidden barrier fees.',
    bg: 'bg-[#F2A65A]', // --card-1: warm amber
    badgeBg: 'bg-[#0D1F17]/15 text-[#0D1F17]',
    storyRoute: '/onboarding',
  },
  {
    id: 'protection-from-child-marriage',
    number: '02',
    badge: 'PCMA Act 2006',
    title: 'Right against Child Marriage',
    blurb: 'Absolute legal safeguard for young dreams, nullifying child marriages and securing educational continuity.',
    bg: 'bg-[#6FBF8F]', // --card-2: soft leaf green
    badgeBg: 'bg-[#0D1F17]/15 text-[#0D1F17]',
    storyRoute: '/onboarding',
  },
  {
    id: 'protection-from-child-labour',
    number: '03',
    badge: 'Child Labour Act 1986',
    title: 'Right against Child Labor',
    blurb: 'Strict legal prohibition of hazardous child employment, safeguarding your freedom to learn, play, and grow safely.',
    bg: 'bg-[#E8845C]', // --card-3: terracotta
    badgeBg: 'bg-[#0D1F17]/15 text-[#0D1F17]',
    storyRoute: '/onboarding',
  },
  {
    id: 'protection-from-abuse',
    number: '04',
    badge: 'POCSO Act & JJ Act',
    title: 'Right against Abuse',
    blurb: 'Zero-tolerance protections against physical, emotional, and digital harm, with mandatory child-safe reporting channels.',
    bg: 'bg-[#8AA9C9]', // --card-4: dusty blue
    badgeBg: 'bg-[#0D1F17]/15 text-[#0D1F17]',
    storyRoute: '/onboarding',
  },
  {
    id: 'right-to-healthcare',
    number: '05',
    badge: 'Article 21 & Health Rights',
    title: 'Right to Healthcare',
    blurb: 'Immediate emergency medical treatment and essential nutrition for every minor, regardless of payment capability.',
    bg: 'bg-[#C98BB0]', // --card-5: muted rose
    badgeBg: 'bg-[#0D1F17]/15 text-[#0D1F17]',
    storyRoute: '/onboarding',
  },
  {
    id: 'right-to-equality',
    number: '06',
    badge: 'Articles 14, 15 & 17',
    title: 'Right to Equality',
    blurb: 'Equal dignity, sportsmanship, and constitutional standing irrespective of gender, caste, language, or background.',
    bg: 'bg-[#D9C15E]', // --card-6: muted gold-green
    badgeBg: 'bg-[#0D1F17]/15 text-[#0D1F17]',
    storyRoute: '/onboarding',
  },
];

// ── Interactive Gameplay Demo Choices ──
const MINI_DEMO_CHOICES = [
  {
    id: 'c1',
    text: 'Form a Student Delegation to cite Section 3 of the RTE Act to the Headmaster',
    xp: 15,
    outcome: '🌟 Best Choice! The school committee confirms no child can be turned away for unreceipted fees.',
    type: 'strong',
  },
  {
    id: 'c2',
    text: 'Quietly pool pocket money together with classmates for a short-term fix',
    xp: 10,
    outcome: '✨ Helpful intention, but temporary. Knowing the law ensures lasting, systemic protection!',
    type: 'medium',
  },
  {
    id: 'c3',
    text: 'Sell school text books at the local market to secretly raise the demanded funds',
    xp: 2,
    outcome: '💔 Risky shortcut! Textbooks are your future — the Constitution firmly protects your right to study.',
    type: 'risky',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [activeChoice, setActiveChoice] = useState(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isReturningUser = Boolean(state.currentUser?.nickname);

  // Monitor scroll for nav solidifying
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConfetti = (e) => {
    sound.win();
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

    confetti({
      particleCount: 55,
      spread: 65,
      origin: { x, y },
      colors: ['#F5B942', '#FFE5B4', '#F2A65A', '#6FBF8F', '#F5EFE0'],
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

  // Staggered word animation container & item variants
  const headlineContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const headlineWord = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#132A20] text-[#F5EFE0] font-body selection:bg-[#F5B942] selection:text-[#0D1F17] relative overflow-hidden">
        
        {/* ── GOOGLE SYNC / CLOUD ACCOUNT MODAL ── */}
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#132A20] border border-[#F5B942]/40 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl flex flex-col gap-5 relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xl">☁️</span>
                  <h3 className="font-display font-extrabold text-lg text-[#F5EFE0]">
                    Sync / Restore Account
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="text-white/60 hover:text-white text-sm w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <GoogleSignIn onSuccess={(res) => {
                setShowGoogleModal(false);
                if (res?.isNewUser) {
                  navigate('/onboarding');
                } else {
                  navigate('/map');
                }
              }} />
            </div>
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────
            2. NAV (Sticky, solidifies to --bg-deep at 90% opacity with blur)
           ────────────────────────────────────────────────────────────────── */}
        <header
          className={`sticky top-0 z-40 transition-all duration-300 ${
            isScrolled
              ? 'bg-[#132A20]/90 backdrop-blur-md py-3.5'
              : 'bg-transparent py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
            {/* Logo / Wordmark (Left) */}
            <Link
              to="/"
              onClick={() => sound.click()}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#F5B942] text-[#0D1F17] flex items-center justify-center font-black text-xl border border-[#FFE5B4]/50 group-hover:scale-105 transition-transform shadow-md">
                ⚖️
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-2xl text-[#F5B942] tracking-tight leading-none group-hover:text-[#FFE5B4] transition-colors">
                  Legalese
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#F5EFE0]/60 font-semibold mt-0.5">
                  Rights Quest
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Center / Right with left-to-right draw underline) */}
            <nav className="hidden md:flex items-center gap-7 text-xs font-bold tracking-wide text-[#F5EFE0]/80">
              <a
                href="#how-it-works"
                onClick={() => sound.click()}
                className="relative py-1 hover:text-[#F5B942] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#F5B942] hover:after:scale-x-100 after:transition-transform after:duration-200"
              >
                How It Works
              </a>
              <a
                href="#rights-cards"
                onClick={() => sound.click()}
                className="relative py-1 hover:text-[#F5B942] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#F5B942] hover:after:scale-x-100 after:transition-transform after:duration-200"
              >
                The 6 Rights
              </a>
              <Link
                to="/impact"
                onClick={() => sound.click()}
                className="relative py-1 hover:text-[#F5B942] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#F5B942] hover:after:scale-x-100 after:transition-transform after:duration-200"
              >
                Analytics
              </Link>
              <Link
                to="/advocate-login"
                onClick={() => sound.click()}
                className="relative py-1 hover:text-[#F5B942] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#F5B942] hover:after:scale-x-100 after:transition-transform after:duration-200"
              >
                Advocate Portal
              </Link>
              <Link
                to="/waitlist"
                onClick={() => sound.click()}
                className="hover:text-[#FFE5B4] transition-colors flex items-center gap-1.5 text-[#F5B942] font-extrabold"
              >
                <span className="w-2 h-2 rounded-full bg-[#F5B942] animate-ping" />
                Waitlist
              </Link>
            </nav>

            {/* Right Action Area */}
            <div className="flex items-center gap-3">
              {/* Quick Google Sync Button */}
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setShowGoogleModal(true);
                }}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-[#F5EFE0] transition-colors cursor-pointer"
              >
                <span>☁️</span>
                <span>Sync</span>
              </button>

              {/* Filled Gold Pill CTA (Spec: tactile spring feedback) */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to={isReturningUser ? '/map' : '/onboarding'}
                  onClick={() => sound.click()}
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-full bg-[#F5B942] hover:bg-[#FFE5B4] text-[#0D1F17] font-extrabold text-xs sm:text-sm tracking-wide transition-all border border-[#FFE5B4]/60 shadow-md"
                >
                  {isReturningUser ? 'Continue Quest →' : 'Start Your Quest'}
                </Link>
              </motion.div>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F5EFE0] hover:bg-white/15 text-lg cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Dotted Divider as Nav Bottom Edge once solidified */}
          <div className="dotted-divider mt-3.5 opacity-60" />

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#132A20] border-b border-[#F5B942]/20 px-6 py-6 flex flex-col gap-4 text-sm font-bold text-[#F5EFE0] animate-fadeIn">
              <a
                href="#how-it-works"
                onClick={() => { sound.click(); setMobileMenuOpen(false); }}
                className="hover:text-[#F5B942]"
              >
                How It Works
              </a>
              <a
                href="#rights-cards"
                onClick={() => { sound.click(); setMobileMenuOpen(false); }}
                className="hover:text-[#F5B942]"
              >
                The 6 Rights
              </a>
              <a
                href="#story-preview"
                onClick={() => { sound.click(); setMobileMenuOpen(false); }}
                className="hover:text-[#F5B942]"
              >
                Story Moments
              </a>
              <Link
                to="/impact"
                onClick={() => { sound.click(); setMobileMenuOpen(false); }}
                className="hover:text-[#F5B942]"
              >
                📊 Analytics &amp; Impact
              </Link>
              <Link
                to="/advocate-login"
                onClick={() => { sound.click(); setMobileMenuOpen(false); }}
                className="hover:text-[#F5B942]"
              >
                🛡️ Advocate Portal
              </Link>
              <Link
                to="/waitlist"
                onClick={() => { sound.click(); setMobileMenuOpen(false); }}
                className="hover:text-[#F5B942] text-[#F5B942] flex items-center gap-2"
              >
                <span>✨ Join 2026 Expansion Waitlist</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setMobileMenuOpen(false);
                  setShowGoogleModal(true);
                }}
                className="text-left text-xs text-[#F5EFE0]/80 py-2 border-t border-white/10 cursor-pointer"
              >
                ☁️ Sync / Restore Google Account
              </button>
            </div>
          )}
        </header>

        {/* ──────────────────────────────────────────────────────────────────
            3. HERO SECTION (Dark Canvas #132A20, Section 10 Motion Layer)
           ────────────────────────────────────────────────────────────────── */}
        <section className="relative pt-10 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-8 max-w-7xl mx-auto overflow-visible">
          {/* Sparse Fireflies Ambient Layer (Section 10.2) */}
          <ParticleBackground count={20} />

          {/* Drifting Radial Glow (Section 10.2) */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#F5B942]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-ambient-glow" />

          {/* Header Content */}
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
            {/* Eyebrow Badge with Gentle Fade-In */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#132A20] border border-[#F5B942]/40 text-[#F5B942] text-xs font-bold tracking-wider uppercase shadow-inner"
            >
              <span className="text-sm">⚖️</span>
              <span>Constitutional Literacy Game • Ages 8–16</span>
            </motion.div>

            {/* Poster Scale Headline with Word-by-Word Stagger & Magical Glow Pulse (Section 10.1 & 10.2) */}
            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
              className="poster-headline text-[#F5B942] text-center animate-magical-pulse flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-1"
            >
              <motion.span variants={headlineWord}>YOUR</motion.span>
              <motion.span variants={headlineWord}>RIGHTS.</motion.span>
              <span className="w-full h-0" />
              <motion.span variants={headlineWord}>YOUR</motion.span>
              <motion.span variants={headlineWord}>STORY.</motion.span>
            </motion.h1>

            {/* Subheadline (Spec: One sentence, cream/muted gold, regular weight) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="text-base sm:text-xl text-[#F5EFE0]/85 max-w-2xl mx-auto font-normal leading-relaxed"
            >
              Step into an empowering storybook adventure where children master real-world legal protections through heartfelt choices, courageous allies, and zero confusing jargon.
            </motion.p>

            {/* Paired CTA Row with Spring Hover / Tactile Tap (Section 10.5) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              {/* Primary Filled Gold Pill */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to={isReturningUser ? '/map' : '/onboarding'}
                  onClick={() => sound.click()}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#F5B942] hover:bg-[#FFE5B4] text-[#0D1F17] font-extrabold text-sm sm:text-base tracking-wide transition-all border border-[#FFE5B4]/60 shadow-[0_0_20px_rgba(245,185,66,0.25)] hover:shadow-[0_0_30px_rgba(245,185,66,0.4)] cursor-pointer"
                >
                  {isReturningUser ? `Continue as ${state.currentUser?.nickname} →` : 'Start Your Quest'}
                </Link>
              </motion.div>

              {/* Secondary Gold-Outline Pill */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <a
                  href="#how-it-works"
                  onClick={() => sound.click()}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-[#F5B942] hover:bg-[#F5B942]/15 text-[#F5B942] font-extrabold text-sm sm:text-base tracking-wide transition-all cursor-pointer"
                >
                  Explore Story Trail ↓
                </a>
              </motion.div>
            </motion.div>

            {/* Micro Feature Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-[#F5EFE0]/65"
            >
              <span>🎒 <strong>6 Core Chapters</strong></span>
              <span>•</span>
              <span>🛡️ <strong>100% Anonymous & Safe</strong></span>
              <span>•</span>
              <span>🌐 <strong>English • हिंदी • ಕನ್ನಡ</strong></span>
            </motion.div>
          </div>

          {/* Below-The-Fold: Interactive Fanned-Out Story Flashcards Deck */}
          <div className="mt-12 sm:mt-16">
            <InteractiveStoryDeck />
          </div>
        </section>

        {/* ── DOTTED DIVIDER ── */}
        <div className="dotted-divider" />

        {/* ──────────────────────────────────────────────────────────────────
            4. "HOW IT WORKS" BAND (Light Canvas #F5EFE0, Text in #0D1F17)
           ────────────────────────────────────────────────────────────────── */}
        <section id="how-it-works" className="bg-[#F5EFE0] text-[#0D1F17] py-20 sm:py-28 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto flex flex-col gap-16">
            {/* Header with Stagger Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto"
            >
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#0D1F17]/60">
                Calm • Intuitive • Safe
              </span>
              <h2 className="section-headline text-[#0D1F17]">
                How Rights Quest Works
              </h2>
              <p className="text-sm sm:text-base text-[#0D1F17]/75 font-normal leading-relaxed">
                A non-intrusive, interactive journey designed for classrooms, community centers, and curious young minds at home.
              </p>
            </motion.div>

            {/* 4 Steps Grid (Staggered cascading entrance Section 10.1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  num: '01',
                  title: 'Pick an Avatar',
                  desc: 'Enter anonymously with zero personal data collection — pick your explorer avatar and preferred language.',
                },
                {
                  num: '02',
                  title: 'Walk the Trail',
                  desc: 'Journey through 6 illustrated story chapters tackling school admissions, healthcare, safety, and equality.',
                },
                {
                  num: '03',
                  title: 'Make Choices',
                  desc: 'Decide how your hero acts in critical dilemmas, discovering statutory protections and earning XP.',
                },
                {
                  num: '04',
                  title: 'Earn Certificate',
                  desc: 'Collect all 6 rights badges along the trail and generate your official, printable Rights Quest Certificate.',
                },
              ].map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col gap-3 p-6 rounded-3xl bg-[#0D1F17]/5 border border-[#0D1F17]/10 hover:bg-[#0D1F17]/10 transition-colors"
                >
                  <span className="font-display font-extrabold text-4xl text-[#0D1F17]/40 leading-none">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#0D1F17]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#0D1F17]/80 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOTTED DIVIDER (Dark on Cream closing the section) ── */}
        <div className="dotted-divider-dark" />

        {/* ──────────────────────────────────────────────────────────────────
            5. "YOUR RIGHTS" SECTION (Dark Canvas #132A20, Section 10.4 Sheen & Micro-Motion)
           ────────────────────────────────────────────────────────────────── */}
        <section id="rights-cards" className="bg-[#132A20] text-[#F5EFE0] py-20 sm:py-28 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto"
            >
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#F5B942]">
                Core Constitutional Protections
              </span>
              <h2 className="section-headline text-[#F5B942]">
                The 6 Rights Every Child Owns
              </h2>
              <p className="text-sm sm:text-base text-[#F5EFE0]/80 font-normal leading-relaxed">
                Each card below is a pillar of constitutional law. Saturated in color, simple in language, absolute in protection.
              </p>
            </motion.div>

            {/* 6 Specimen Cards Grid (Diagonal Stagger Reveal + Diagonal Sheen Sweep + Badge Bounce) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {RIGHTS_CATEGORIES.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ scale: 1.025, y: -4 }}
                  className={`group relative overflow-hidden ${card.bg} text-[#0D1F17] rounded-3xl p-8 sm:p-9 flex flex-col justify-between gap-6 min-h-[320px] shadow-lg transition-shadow duration-300`}
                >
                  {/* Diagonal Sheen Sweep Effect on Hover (Section 10.4) */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  {/* Top: Small Badge + Number with Badge Micro-Bounce on Hover */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className={`text-[11px] font-extrabold px-3.5 py-1 rounded-full ${card.badgeBg} group-hover:scale-105 transition-transform duration-200`}>
                      {card.badge}
                    </span>
                    <span className="font-display font-extrabold text-2xl text-[#0D1F17]/40">
                      {card.number}
                    </span>
                  </div>

                  {/* Middle: Title + One Sentence Blurb */}
                  <div className="flex flex-col gap-2.5 relative z-10">
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0D1F17] leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0D1F17]/85 leading-relaxed font-medium">
                      {card.blurb}
                    </p>
                  </div>

                  {/* Bottom: Tiny "Explore →" Text Link with Arrow Nudge */}
                  <div className="pt-4 border-t border-[#0D1F17]/15 flex items-center justify-between relative z-10">
                    <Link
                      to={card.storyRoute}
                      onClick={() => sound.click()}
                      className="text-xs sm:text-sm font-extrabold text-[#0D1F17] hover:underline inline-flex items-center gap-1.5 focus:outline-none cursor-pointer"
                    >
                      <span>Explore this right</span>
                      <span className="text-base group-hover:translate-x-1.5 transition-transform duration-200">→</span>
                    </Link>
                    <span className="text-[11px] font-bold text-[#0D1F17]/60">Interactive Quest</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOTTED DIVIDER ── */}
        <div className="dotted-divider" />

        {/* ──────────────────────────────────────────────────────────────────
            6. STORY PREVIEW / SOCIAL PROOF BAND (Light Canvas #F5EFE0)
           ────────────────────────────────────────────────────────────────── */}
        <section id="story-preview" className="bg-[#F5EFE0] text-[#0D1F17] py-20 sm:py-28 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto"
            >
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#0D1F17]/60">
                Inside The Quest
              </span>
              <h2 className="section-headline text-[#0D1F17]">
                Real Moments. Real Reflections.
              </h2>
              <p className="text-sm sm:text-base text-[#0D1F17]/75 font-normal leading-relaxed">
                See how children and educators across India experience constitutional literacy first-hand.
              </p>
            </motion.div>

            {/* 3 Tilted Floating Cards (+4°, -5°, +3° alternating with spring settling) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Card 1: Interactive Gameplay Dilemma (Tilted +4°) */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 160, damping: 20 }}
                whileHover={{ scale: 1.03, y: -4, rotate: 2 }}
                className="rounded-3xl bg-[#0D1F17] text-[#F5EFE0] border border-[#0D1F17] p-7 flex flex-col gap-4 transition-transform duration-300 relative shadow-md"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[11px] font-bold text-[#F5B942] uppercase tracking-wider">
                    Interactive Moment
                  </span>
                  <span className="text-xs text-[#F5EFE0]/60">Try a choice!</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#F5EFE0]/90 leading-relaxed font-medium">
                  &quot;Meena’s seat is empty again. When you find her, she reveals the school asked for fees her family cannot pay. What do you do?&quot;
                </div>

                {/* 3 Choices */}
                <div className="flex flex-col gap-2">
                  {MINI_DEMO_CHOICES.map((choice) => (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={(e) => handleDemoChoice(choice, e)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between text-xs font-semibold cursor-pointer ${
                        activeChoice?.id === choice.id
                          ? 'bg-[#F5B942] text-[#0D1F17] border-[#F5B942] font-bold'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#F5EFE0]'
                      }`}
                    >
                      <span className="line-clamp-1">{choice.text}</span>
                      <span className="shrink-0 ml-2 text-[10px] font-extrabold">+{choice.xp} XP</span>
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {activeChoice && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-3.5 rounded-xl text-xs font-bold ${
                        activeChoice.type === 'strong'
                          ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/40'
                          : activeChoice.type === 'risky'
                          ? 'bg-rose-950/90 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-950/90 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {activeChoice.outcome}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Card 2: Student Voice (Tilted -5°) */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.1 }}
                whileHover={{ scale: 1.03, y: -4, rotate: -3 }}
                className="rounded-3xl bg-[#0D1F17] text-[#F5EFE0] border border-[#0D1F17] p-7 flex flex-col justify-between gap-6 min-h-[360px] transition-transform duration-300 relative shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F5B942] text-[#0D1F17] font-extrabold flex items-center justify-center text-sm">
                    PK
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[#F5EFE0]">
                      Priya K., Age 12
                    </h4>
                    <span className="text-[11px] text-[#F5EFE0]/60">Government High School, Bengaluru</span>
                  </div>
                </div>

                <blockquote className="text-sm sm:text-base text-[#F5EFE0]/90 leading-relaxed italic">
                  &quot;Playing Aarav’s story in Kannada made me understand what the law actually means in real life. When my friend was told to leave school, I knew exactly what rule to show them.&quot;
                </blockquote>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#F5B942] font-bold">
                  <span>Story Explorer</span>
                  <span>🏆 450 XP Earned</span>
                </div>
              </motion.div>

              {/* Card 3: Educator Testimonial (Tilted +3°) */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.2 }}
                whileHover={{ scale: 1.03, y: -4, rotate: 1 }}
                className="rounded-3xl bg-[#0D1F17] text-[#F5EFE0] border border-[#0D1F17] p-7 flex flex-col justify-between gap-6 min-h-[360px] transition-transform duration-300 relative shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#6FBF8F] text-[#0D1F17] font-extrabold flex items-center justify-center text-sm">
                    RM
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[#F5EFE0]">
                      Rajeshwari M.
                    </h4>
                    <span className="text-[11px] text-[#F5EFE0]/60">Civics Educator & Social Science Head</span>
                  </div>
                </div>

                <blockquote className="text-sm sm:text-base text-[#F5EFE0]/90 leading-relaxed italic">
                  &quot;Instead of memorizing dry legal articles, 8th graders debated the consequences of each choice in groups. Rights Quest turned a textbook lesson into active constitutional courage.&quot;
                </blockquote>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#6FBF8F] font-bold">
                  <span>Classroom Implementation</span>
                  <span>👩‍🏫 120 Students</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── DOTTED DIVIDER ── */}
        <div className="dotted-divider-dark" />

        {/* ──────────────────────────────────────────────────────────────────
            7. FINAL CTA SECTION (Dark Canvas #132A20, Poster Line, Tactile Pill)
           ────────────────────────────────────────────────────────────────── */}
        <section className="bg-[#132A20] text-[#F5EFE0] py-24 sm:py-36 px-4 sm:px-8 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
            {/* Small Eyebrow */}
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F5B942]">
              Take Your First Step
            </span>

            {/* Poster Scale Callout (Spec: ~80-96px desktop clamp) */}
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#F5B942] tracking-tight leading-[0.92] animate-magical-pulse">
              READY TO BEGIN?
            </h2>

            <p className="text-base sm:text-xl text-[#F5EFE0]/80 max-w-xl mx-auto font-normal leading-relaxed">
              Join thousands of young explorers discovering their rights today. 100% free, anonymous, and forever ad-free.
            </p>

            {/* Single Filled Gold Pill CTA with Expanding Soft Glow Aura (Section 10.5) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-full bg-[#F5B942]/30 blur-xl group-hover:bg-[#F5B942]/50 transition-all scale-95 group-hover:scale-110 pointer-events-none" />
              <Link
                to={isReturningUser ? '/map' : '/onboarding'}
                onClick={handleConfetti}
                className="relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#F5B942] hover:bg-[#FFE5B4] text-[#0D1F17] font-extrabold text-base sm:text-lg tracking-wide transition-all border border-[#FFE5B4]/60 shadow-xl cursor-pointer"
              >
                {isReturningUser ? 'Resume Your Journey →' : 'Start Your Quest'}
              </Link>
            </motion.div>

            <span className="text-xs text-[#F5EFE0]/60">
              No email required • Instant access • Works on any phone or browser
            </span>
          </div>
        </section>

        {/* ── DOTTED DIVIDER ── */}
        <div className="dotted-divider opacity-70" />

        {/* ──────────────────────────────────────────────────────────────────
            8. FOOTER (Dark Canvas #132A20, Minimal, Cream Text at Low Opacity)
           ────────────────────────────────────────────────────────────────── */}
        <footer className="bg-[#132A20] py-14 px-4 sm:px-8 text-xs text-[#F5EFE0]/65 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {/* Col 1: Wordmark & Purpose */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚖️</span>
                <span className="font-display font-extrabold text-xl text-[#F5B942]">Legalese</span>
              </div>
              <p className="text-[12px] leading-relaxed text-[#F5EFE0]/70">
                A public constitutional literacy platform empowering children across India with courage, knowledge, and rights protection.
              </p>
            </div>

            {/* Col 2: The Journey */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs uppercase font-extrabold text-[#F5B942] tracking-wider">
                The Quest
              </span>
              <Link to="/onboarding" onClick={() => sound.click()} className="hover:text-white transition-colors">
                🚀 Play Rights Quest
              </Link>
              <Link to="/map" onClick={() => sound.click()} className="hover:text-white transition-colors">
                🗺️ Rights Trail Map
              </Link>
              <Link to="/leaderboard" onClick={() => sound.click()} className="hover:text-white transition-colors">
                🏆 Hall of Fame
              </Link>
              <Link to="/certificate" onClick={() => sound.click()} className="hover:text-white transition-colors">
                🎓 Award Certificate
              </Link>
            </div>

            {/* Col 3: For Schools & NGOs */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs uppercase font-extrabold text-[#F5B942] tracking-wider">
                For Schools & NGOs
              </span>
              <Link to="/teachers" onClick={() => sound.click()} className="hover:text-white transition-colors">
                👩‍🏫 Teacher Toolkit
              </Link>
              <Link to="/impact" onClick={() => sound.click()} className="hover:text-white transition-colors">
                📊 Realtime Impact Stats
              </Link>
              <Link to="/advocate-login" onClick={() => sound.click()} className="hover:text-white transition-colors">
                🛡️ Advocate Portal
              </Link>
              <Link to="/waitlist" onClick={() => sound.click()} className="hover:text-[#F5B942] transition-colors text-[#F5B942] font-bold">
                ✨ Expansion Waitlist
              </Link>
            </div>

            {/* Col 4: Child Safety by Design */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs uppercase font-extrabold text-[#F5B942] tracking-wider">
                Child Safety First
              </span>
              <p className="text-[11px] leading-relaxed text-[#F5EFE0]/70">
                Zero telemetry tracking. No personal identifying data. Designed in full accordance with India’s DPDP Act 2023.
              </p>
              <div className="mt-1 p-2.5 rounded-xl bg-[#0D1F17] border border-[#F5B942]/30 text-[11px] text-[#F5B942] flex items-center gap-2">
                <span>📞</span>
                <span>Emergency Childline: <strong>1098</strong></span>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F5EFE0]/50">
            <span>© 2026 Legalese • Free Open Constitutional Resource</span>
            <span>Where Courage Teaches Children Their Rights</span>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
