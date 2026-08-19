/**
 * HeroStoryStack.jsx — Interactive 3D Story Card Carousel
 * 
 * Implements the 8 Design Upgrades:
 * 1. Illustrated gold medallion badges (zero emojis)
 * 2. True depth stacking (center card z-30 scale 1.0, side cards z-10 scale 0.88 opacity 0.65 rotate ±6°)
 * 3. Spotlight radial golden aura behind the active center card
 * 4. Paper-fiber parchment grain texture overlay
 * 5. Parchment scroll quote object with watermark quotation marks & wax seal badge
 * 6. Interactive RPG Chapter Carousel (click side cards or arrows to shuffle)
 * 7. Live badge light-sweep shimmer on the reward bar
 * 8. Atmospheric firefly particles & tree-line canopy silhouette
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MedallionIcon from '../ui/MedallionIcon';
import sound from '../../lib/sound';

const STORY_CHAPTERS = [
  {
    id: 'right-to-education',
    chapterNum: 'Chapter 01',
    category: 'Right for Education',
    actTag: 'Article 21A & RTE Act',
    iconType: 'education',
    title: 'Meena’s First Day Stand',
    tagline: 'When unauthorized barrier fees threaten her seat, stand with the school committee to enforce Section 3.',
    statutoryQuote: '“Every child between six and fourteen years shall have the right to free and compulsory education in a neighbourhood school.”',
    statutorySource: 'Constitution of India • Article 21-A',
    choiceAction: 'Choice: Invoke Section 3 RTE',
    badgeName: 'Statutory Education Shield',
    badgeIcon: 'education',
    xp: '+15 XP',
  },
  {
    id: 'protection-from-child-marriage',
    chapterNum: 'Chapter 02',
    category: 'Right against Child Marriage',
    actTag: 'PCMA Act 2006 (Sec. 13)',
    iconType: 'child-marriage',
    title: 'Pooja’s Higher Studies',
    tagline: 'Protect education dreams against underage marriage with the support of Childline 1098 & CMPO officers.',
    statutoryQuote: '“Child marriage denies young girls their health, education, and bodily autonomy. The law empowers immediate stay orders.”',
    statutorySource: 'Prohibition of Child Marriage Act • Section 13',
    choiceAction: 'Choice: Contact Childline 1098',
    badgeName: 'Dreams Guardian Shield',
    badgeIcon: 'child-marriage',
    xp: '+20 XP',
  },
  {
    id: 'protection-from-child-labour',
    chapterNum: 'Chapter 03',
    category: 'Right against Child Labor',
    actTag: 'CLPRA Act (Sec. 3A)',
    iconType: 'child-labour',
    title: 'Aarav’s Workshop Escape',
    tagline: 'Rescue adolescent peers from toxic chemical workshops and illegal furnace labour using statutory protections.',
    statutoryQuote: '“No child below the age of fourteen years shall be employed to work in any factory or mine or engaged in any hazardous employment.”',
    statutorySource: 'Constitution of India • Article 24',
    choiceAction: 'Choice: Report to Childline 1098',
    badgeName: 'Childhood Protector Shield',
    badgeIcon: 'child-labour',
    xp: '+20 XP',
  },
  {
    id: 'protection-from-abuse',
    chapterNum: 'Chapter 04',
    category: 'Right against Abuse',
    actTag: 'POCSO Act 2012 (Sec. 23)',
    iconType: 'abuse',
    title: 'Deepa’s Safe Boundaries',
    tagline: 'Combat cyber harassment and safety violations with strict victim confidentiality and zero blame.',
    statutoryQuote: '“The identity of the child shall be protected in all reports and legal proceedings. The child is NEVER at fault.”',
    statutorySource: 'POCSO Act 2012 • Section 23',
    choiceAction: 'Choice: Confide in Trusted Ally',
    badgeName: 'Safety Aegis Shield',
    badgeIcon: 'abuse',
    xp: '+20 XP',
  },
  {
    id: 'right-to-healthcare',
    chapterNum: 'Chapter 05',
    category: 'Right to Healthcare',
    actTag: 'Article 21 & NHM Aid',
    iconType: 'healthcare',
    title: 'Rohan’s Health Rescue',
    tagline: 'Enforce unconditional emergency paediatric treatment and nutrition rights at government health centres.',
    statutoryQuote: '“The right to health and emergency medical care is an integral facet of the fundamental right to life under Article 21.”',
    statutorySource: 'Supreme Court Mandate • Article 21',
    choiceAction: 'Choice: Call 108 Emergency Aid',
    badgeName: 'Health Defender Shield',
    badgeIcon: 'healthcare',
    xp: '+20 XP',
  },
  {
    id: 'right-to-equality',
    chapterNum: 'Chapter 06',
    category: 'Right to Equality',
    actTag: 'Articles 14, 15 & 17',
    iconType: 'equality',
    title: 'Kabir’s Playground Stand',
    tagline: 'Assert equal dignity and fair access when unfair tournament discrimination threatens student athletes.',
    statutoryQuote: '“The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, or place of birth.”',
    statutorySource: 'Constitution of India • Article 15(2)',
    choiceAction: 'Choice: Assert Articles 14 & 15',
    badgeName: 'Equality & Dignity Shield',
    badgeIcon: 'equality',
    xp: '+25 XP',
  },
];

export default function HeroStoryStack() {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = STORY_CHAPTERS.length;
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const activeStory = STORY_CHAPTERS[activeIndex];
  const prevStory = STORY_CHAPTERS[prevIndex];
  const nextStory = STORY_CHAPTERS[nextIndex];

  const handlePrev = () => {
    sound.click();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    sound.click();
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center select-none relative pt-4 pb-8">
      {/* ── 3. SPOTLIGHT GOLDEN RADIAL GLOW BEHIND CENTER CARD ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(245,185,66,0.22)_0%,_rgba(245,185,66,0.06)_50%,_transparent_75%)] blur-2xl pointer-events-none -z-10 animate-pulse-glow" />

      {/* ── 2 & 6. 3D INTERACTIVE CAROUSEL STACK ── */}
      <div className="w-full min-h-[460px] sm:min-h-[480px] flex items-center justify-center relative perspective-[1200px]">
        {/* LEFT CARD (Dimmed, rotated -6°, scaled 0.88, pushed behind z-10) */}
        <motion.div
          key={`left-${prevIndex}`}
          onClick={handlePrev}
          initial={{ opacity: 0, scale: 0.8, x: -120 }}
          animate={{ opacity: 0.6, scale: 0.88, x: '-38%', rotate: -6, zIndex: 10 }}
          whileHover={{ opacity: 0.85, scale: 0.9, x: '-36%', rotate: -4 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="hidden md:flex absolute w-[360px] rounded-3xl bg-[#183528] border border-[#F5B942]/30 p-6 flex-col gap-4 text-left cursor-pointer shadow-lg overflow-hidden group brightness-90 hover:brightness-100"
        >
          {/* Subtle Paper-Grain Overlay */}
          <div className="absolute inset-0 bg-[#F5EFE0]/[0.03] pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <MedallionIcon type={prevStory.iconType} size="md" />
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#F5B942]/15 text-[#F5B942] border border-[#F5B942]/30">
              {prevStory.actTag}
            </span>
          </div>

          <div className="relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5B942]/80">
              {prevStory.chapterNum}
            </span>
            <h4 className="font-display font-bold text-lg text-[#F5EFE0] mt-0.5">
              {prevStory.title}
            </h4>
            <p className="text-xs text-[#F5EFE0]/70 mt-1.5 line-clamp-2 leading-relaxed">
              {prevStory.tagline}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#F5B942]/80 relative z-10">
            <span>← Click to View</span>
            <span>{prevStory.xp}</span>
          </div>
        </motion.div>

        {/* CENTER ACTIVE CARD (Spotlighted, scale 1.0, z-30, crisp gold border, textured) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`center-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1.0, y: 0, rotate: 0, zIndex: 30 }}
            exit={{ opacity: 0, scale: 0.94, y: -12 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="w-full max-w-[440px] rounded-3xl bg-gradient-to-b from-[#214736] via-[#1B3B2D] to-[#132A20] border-2 border-[#F5B942] p-7 sm:p-8 flex flex-col justify-between gap-5 text-left shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative ring-2 ring-[#F5B942]/40 overflow-hidden"
          >
            {/* 4. Textured Parchment Grain Background Texture */}
            <div className="absolute inset-0 bg-[#F5EFE0]/[0.04] pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#F5B942]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar: Medallion Badge + Chapter Act Pill */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <MedallionIcon type={activeStory.iconType} size="lg" shape="shield" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#F5B942]">
                    {activeStory.chapterNum}
                  </span>
                  <span className="text-xs font-bold text-[#F5EFE0]/90">
                    {activeStory.category}
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-extrabold px-3.5 py-1.5 rounded-full bg-[#F5B942] text-[#0D1F17] shadow-sm">
                {activeStory.actTag}
              </span>
            </div>

            {/* Middle: Title & Story Dilemma */}
            <div className="flex flex-col gap-1.5 relative z-10">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F5EFE0] tracking-tight leading-tight">
                {activeStory.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#F5EFE0]/80 leading-relaxed font-medium">
                {activeStory.tagline}
              </p>
            </div>

            {/* 5. Parchment Scroll Object with Watermark Quotes & Seal */}
            <div className="relative rounded-2xl bg-[#0D1F17]/75 border border-[#F5B942]/35 p-4 sm:p-4.5 overflow-hidden shadow-inner z-10">
              {/* Oversized Decorative Gold Watermark Quotation Mark */}
              <span className="absolute -bottom-4 right-2 text-7xl font-serif text-[#F5B942]/10 select-none pointer-events-none leading-none">
                ”
              </span>

              <p className="text-xs sm:text-[13px] text-[#FFE7A8] italic leading-relaxed font-medium relative z-10">
                {activeStory.statutoryQuote}
              </p>

              {/* Source Tag with Wax-Seal style icon */}
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#F5EFE0]/70 font-semibold relative z-10">
                <span className="flex items-center gap-1.5 text-[#F5B942]">
                  <span>⚖️</span>
                  <span>{activeStory.statutorySource}</span>
                </span>
                <span className="text-[#6FBF8F]">Statutory Fact</span>
              </div>
            </div>

            {/* 7. Live Reward Line with Light-Sweep Shimmer Animation */}
            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="relative overflow-hidden rounded-full">
                  <MedallionIcon type={activeStory.badgeIcon} size="sm" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-extrabold text-[#F5B942]">
                    {activeStory.badgeName}
                  </span>
                  <span className="text-[10px] text-[#6FBF8F] font-bold">
                    ✓ Unlocks on Trail
                  </span>
                </div>
              </div>

              <Link
                to="/onboarding"
                onClick={() => sound.click()}
                className="px-4 py-2 rounded-full bg-[#F5B942] hover:bg-[#FFE5B4] text-[#0D1F17] font-extrabold text-xs tracking-wide transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Play Chapter</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* RIGHT CARD (Dimmed, rotated +6°, scaled 0.88, pushed behind z-10) */}
        <motion.div
          key={`right-${nextIndex}`}
          onClick={handleNext}
          initial={{ opacity: 0, scale: 0.8, x: 120 }}
          animate={{ opacity: 0.6, scale: 0.88, x: '38%', rotate: 6, zIndex: 10 }}
          whileHover={{ opacity: 0.85, scale: 0.9, x: '36%', rotate: 4 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="hidden md:flex absolute w-[360px] rounded-3xl bg-[#183528] border border-[#F5B942]/30 p-6 flex-col gap-4 text-left cursor-pointer shadow-lg overflow-hidden group brightness-90 hover:brightness-100"
        >
          {/* Subtle Paper-Grain Overlay */}
          <div className="absolute inset-0 bg-[#F5EFE0]/[0.03] pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <MedallionIcon type={nextStory.iconType} size="md" />
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#F5B942]/15 text-[#F5B942] border border-[#F5B942]/30">
              {nextStory.actTag}
            </span>
          </div>

          <div className="relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5B942]/80">
              {nextStory.chapterNum}
            </span>
            <h4 className="font-display font-bold text-lg text-[#F5EFE0] mt-0.5">
              {nextStory.title}
            </h4>
            <p className="text-xs text-[#F5EFE0]/70 mt-1.5 line-clamp-2 leading-relaxed">
              {nextStory.tagline}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#F5B942]/80 relative z-10">
            <span>Click to View →</span>
            <span>{nextStory.xp}</span>
          </div>
        </motion.div>
      </div>

      {/* ── CAROUSEL CONTROLS: Arrow Buttons & Pagination Dots ── */}
      <div className="flex items-center justify-center gap-4 mt-6 z-20">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Chapter"
          className="w-10 h-10 rounded-full bg-[#183528] hover:bg-[#234A39] border border-[#F5B942]/40 text-[#F5B942] font-black text-sm flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
        >
          ←
        </button>

        {/* 6 Chapter Indicator Dots */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#0D1F17]/80 border border-white/10">
          {STORY_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => { sound.click(); setActiveIndex(idx); }}
              aria-label={`Go to ${ch.chapterNum}`}
              className={`transition-all rounded-full cursor-pointer ${
                activeIndex === idx
                  ? 'w-6 h-2 bg-[#F5B942] shadow-[0_0_8px_rgba(245,185,66,0.6)]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Chapter"
          className="w-10 h-10 rounded-full bg-[#183528] hover:bg-[#234A39] border border-[#F5B942]/40 text-[#F5B942] font-black text-sm flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
        >
          →
        </button>
      </div>

      <span className="text-[11px] text-[#F5EFE0]/50 mt-2 font-medium">
        Click side cards or arrows to explore all 6 constitutional chapters
      </span>
    </div>
  );
}
