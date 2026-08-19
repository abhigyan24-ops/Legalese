/**
 * InteractiveStoryDeck.jsx — Animated Fanned Flashcard Deck
 * 
 * Features:
 * - 6 Handcrafted story flashcards fanned out with 3D perspective
 * - One-by-one auto-cycling animation when in viewport (pauses on mouse hover)
 * - Hovering any card brings it into spotlight with spring physics, scale, and gold aura
 * - Rich vector medallion icons, statutory facts, dilemma choices, and XP rewards
 * - Smooth touch & click pagination controls
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MedallionIcon from '../ui/MedallionIcon';
import sound from '../../lib/sound';

const FLASHCARDS = [
  {
    id: 'right-to-education',
    chapterNum: '01',
    chapterTag: 'Chapter 01 • RTE Act',
    lawCite: 'Article 21-A & RTE Act 2009',
    title: 'Meena’s First Day Stand',
    iconType: 'education',
    colorAccent: '#F2A65A', // warm amber
    dilemma: 'When unauthorized barrier fees threaten her classroom seat, invoke Section 3 to protect her education.',
    quote: '“No school can deny admission or withhold documentation over unpaid fees.”',
    choiceText: 'Stand with School Committee',
    xp: '+15 XP',
    badge: 'Education Shield',
    storyRoute: '/onboarding',
  },
  {
    id: 'protection-from-child-marriage',
    chapterNum: '02',
    chapterTag: 'Chapter 02 • Dreams Safe',
    lawCite: 'PCMA Act 2006 (Sec. 13)',
    title: 'Pooja’s Higher Studies',
    iconType: 'child-marriage',
    colorAccent: '#6FBF8F', // soft leaf green
    dilemma: 'Protect education dreams against underage marriage with the support of Childline 1098 & CMPO officers.',
    quote: '“Magistrates possess statutory authority to issue immediate injunctions.”',
    choiceText: 'Alert Childline 1098 & Teacher',
    xp: '+20 XP',
    badge: 'Guardian Shield',
    storyRoute: '/onboarding',
  },
  {
    id: 'protection-from-child-labour',
    chapterNum: '03',
    chapterTag: 'Chapter 03 • Freedom',
    lawCite: 'CLPRA Act 1986 / 2016 Amend.',
    title: 'Aarav’s Workshop Escape',
    iconType: 'child-labour',
    colorAccent: '#E8845C', // terracotta
    dilemma: 'Rescue adolescent peers from hazardous furnace labour and enforce their right to school over factory work.',
    quote: '“Child labour under 14 is strictly prohibited across all commercial establishments.”',
    choiceText: 'Enforce School Priority',
    xp: '+20 XP',
    badge: 'Freedom Shield',
    storyRoute: '/onboarding',
  },
  {
    id: 'protection-from-abuse',
    chapterNum: '04',
    chapterTag: 'Chapter 04 • Safety Aegis',
    lawCite: 'POCSO Act 2012 (Sec. 23)',
    title: 'Deepa’s Safe Boundaries',
    iconType: 'abuse',
    colorAccent: '#8AA9C9', // dusty blue
    dilemma: 'Combat harassment and safety violations with strict victim confidentiality and zero victim blame.',
    quote: '“Identity confidentiality is mandatory by law. The child is NEVER at fault.”',
    choiceText: 'Confide in Trusted Ally',
    xp: '+20 XP',
    badge: 'Safety Shield',
    storyRoute: '/onboarding',
  },
  {
    id: 'right-to-healthcare',
    chapterNum: '05',
    chapterTag: 'Chapter 05 • Health Shield',
    lawCite: 'Article 21 & NHM Mandate',
    title: 'Rohan’s Health Rescue',
    iconType: 'healthcare',
    colorAccent: '#C98BB0', // muted rose
    dilemma: 'Enforce unconditional emergency paediatric treatment and nutrition rights at government health centres.',
    quote: '“The right to health and emergency care is an integral facet of Article 21.”',
    choiceText: 'Request Free Emergency Aid',
    xp: '+20 XP',
    badge: 'Health Shield',
    storyRoute: '/onboarding',
  },
  {
    id: 'right-to-equality',
    chapterNum: '06',
    chapterTag: 'Chapter 06 • Equal Standing',
    lawCite: 'Articles 14, 15 & 17',
    title: 'Kabir’s Playground Stand',
    iconType: 'equality',
    colorAccent: '#D9C15E', // muted gold-green
    dilemma: 'Assert equal dignity and fair access when unfair tournament discrimination threatens student athletes.',
    quote: '“Equality before the law and equal protection in all public institutions.”',
    choiceText: 'Assert Articles 14 & 15',
    xp: '+25 XP',
    badge: 'Equality Shield',
    storyRoute: '/onboarding',
  },
];

export default function InteractiveStoryDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  // Detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Auto-cycle one-by-one every 3.8 seconds when in view and NOT hovered
  useEffect(() => {
    if (!isInView || isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FLASHCARDS.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isInView, isHovered]);

  const handleCardClick = (index) => {
    sound.click();
    setActiveIndex(index);
  };

  const handlePrev = () => {
    sound.click();
    setActiveIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  const handleNext = () => {
    sound.click();
    setActiveIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-6xl mx-auto flex flex-col items-center select-none relative pt-6 pb-12 overflow-visible"
    >
      {/* ── AMBIENT SPOTLIGHT GLOW BEHIND THE ACTIVE CARD ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(245,185,66,0.2)_0%,_rgba(245,185,66,0.05)_50%,_transparent_75%)] blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      {/* ── DESKTOP FANNED-OUT FLASHCARD STACK (6 Cards Interactive Arc) ── */}
      <div className="hidden lg:flex items-center justify-center relative w-full h-[480px] perspective-[1400px]">
        {FLASHCARDS.map((card, index) => {
          // Calculate relative position to active card
          let offset = index - activeIndex;
          if (offset < -3) offset += FLASHCARDS.length;
          if (offset > 2) offset -= FLASHCARDS.length;

          const isActive = offset === 0;
          const isLeft = offset < 0;
          const isRight = offset > 0;
          const absOffset = Math.abs(offset);

          // Calculate 3D transforms based on offset
          const xPos = offset * 210; // spread distance
          const yPos = absOffset * 18; // gentle curve
          const rotateZ = offset * 6; // fanned rotation angle
          const zIndex = 30 - absOffset * 8;
          const scale = isActive ? 1.05 : Math.max(0.85, 1 - absOffset * 0.08);
          const opacity = isActive ? 1 : Math.max(0.6, 1 - absOffset * 0.2);

          return (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(index)}
              initial={false}
              animate={{
                x: xPos,
                y: yPos,
                rotateZ: rotateZ,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
              }}
              whileHover={{
                scale: isActive ? 1.08 : 0.95,
                y: yPos - 12,
                opacity: 1,
                zIndex: 40,
                transition: { duration: 0.2 },
              }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 24,
              }}
              className={`absolute w-[330px] rounded-3xl p-6 flex flex-col justify-between gap-4 text-left cursor-pointer transition-shadow duration-300 overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-b from-[#214736] via-[#1B3B2D] to-[#132A20] border-2 border-[#F5B942] shadow-[0_16px_50px_rgba(0,0,0,0.7)] ring-2 ring-[#F5B942]/40'
                  : 'bg-[#183528] border border-[#F5B942]/30 shadow-xl brightness-90 hover:brightness-100 hover:border-[#F5B942]/70'
              }`}
              style={{ minHeight: '410px' }}
            >
              {/* Glossy Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

              {/* Card Header: Medallion + Tag */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2.5">
                  <MedallionIcon type={card.iconType} size="md" shape={isActive ? 'shield' : 'circle'} />
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#F5B942]">
                    {card.chapterTag}
                  </span>
                </div>
                <span className="font-display font-black text-xl text-white/30">
                  {card.chapterNum}
                </span>
              </div>

              {/* Title & Dilemma */}
              <div className="flex flex-col gap-1.5 relative z-10">
                <h3 className="font-display font-extrabold text-xl text-[#F5EFE0] leading-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-[#F5EFE0]/80 leading-relaxed font-normal">
                  {card.dilemma}
                </p>
              </div>

              {/* Statutory Parchment Quote */}
              <div className="p-3.5 rounded-2xl bg-[#0D1F17]/80 border border-[#F5B942]/30 text-[11px] text-[#FFE5B4] italic leading-relaxed relative z-10">
                {card.quote}
                <span className="block not-italic font-bold text-[9px] uppercase tracking-wider text-[#F5B942] mt-1.5 pt-1 border-t border-white/10">
                  ⚖️ {card.lawCite}
                </span>
              </div>

              {/* Choice Action & XP Reward */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-extrabold text-[#F5B942] relative z-10">
                <span className="text-[11px] text-[#F5EFE0]/90 font-bold truncate max-w-[190px]">
                  {card.choiceText}
                </span>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#F5B942]/20 border border-[#F5B942]/40 text-[#F5B942] text-[10px]">
                  {card.xp} 🌟
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── TABLET & MOBILE VIEW (Smooth Swipeable Cards with Active Focus) ── */}
      <div className="lg:hidden w-full flex flex-col items-center gap-6 px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={FLASHCARDS[activeIndex].id}
            initial={{ opacity: 0, x: 20, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#214736] via-[#1B3B2D] to-[#132A20] border-2 border-[#F5B942] p-6 sm:p-7 flex flex-col gap-4 text-left shadow-2xl relative ring-2 ring-[#F5B942]/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MedallionIcon type={FLASHCARDS[activeIndex].iconType} size="md" shape="shield" />
                <span className="text-xs uppercase font-extrabold text-[#F5B942] tracking-wider">
                  {FLASHCARDS[activeIndex].chapterTag}
                </span>
              </div>
              <span className="font-display font-extrabold text-2xl text-white/30">
                {FLASHCARDS[activeIndex].chapterNum}
              </span>
            </div>

            <div>
              <h3 className="font-display font-extrabold text-2xl text-[#F5EFE0]">
                {FLASHCARDS[activeIndex].title}
              </h3>
              <p className="text-xs text-[#F5EFE0]/80 mt-1.5 leading-relaxed">
                {FLASHCARDS[activeIndex].dilemma}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0D1F17]/85 border border-[#F5B942]/30 text-xs text-[#FFE5B4] italic leading-relaxed">
              {FLASHCARDS[activeIndex].quote}
              <span className="block not-italic font-bold text-[10px] text-[#F5B942] mt-1.5">
                ⚖️ {FLASHCARDS[activeIndex].lawCite}
              </span>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-extrabold text-[#F5B942]">
              <span>{FLASHCARDS[activeIndex].choiceText}</span>
              <span>{FLASHCARDS[activeIndex].xp} 🌟</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── CAROUSEL CONTROLS & PAGINATION ── */}
      <div className="flex items-center justify-center gap-4 mt-6 z-20">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Flashcard"
          className="w-10 h-10 rounded-full bg-[#183528] hover:bg-[#234A39] border border-[#F5B942]/40 text-[#F5B942] font-black text-sm flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
        >
          ←
        </button>

        {/* 6 Indicator Dots */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0D1F17]/80 border border-white/10 shadow-inner">
          {FLASHCARDS.map((card, idx) => (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(idx)}
              aria-label={`Go to chapter ${idx + 1}`}
              className={`transition-all rounded-full cursor-pointer ${
                activeIndex === idx
                  ? 'w-6 h-2 bg-[#F5B942] shadow-[0_0_10px_rgba(245,185,66,0.7)]'
                  : 'w-2 h-2 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Flashcard"
          className="w-10 h-10 rounded-full bg-[#183528] hover:bg-[#234A39] border border-[#F5B942]/40 text-[#F5B942] font-black text-sm flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
        >
          →
        </button>
      </div>

      <span className="text-[11px] text-[#F5EFE0]/55 mt-2.5 font-medium tracking-wide">
        Hover or click any flashcard to explore • Auto-cycles through all 6 chapters
      </span>
    </div>
  );
}
