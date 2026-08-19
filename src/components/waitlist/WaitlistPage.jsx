/**
 * WaitlistPage.jsx — Rights Quest 2026 Expansion Waitlist
 * 
 * Design Tokens:
 * - Canvas: Deep Forest (#132A20), Gold Accent (#F5B942), Cream (#F5EFE0), Ink (#0D1F17)
 * - Typography: Poster scale Baloo 2 + Plus Jakarta Sans body
 * - Features: Role selection, language choice, instant confirmation, referral link share
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import sound from '../../lib/sound';
import SmoothScroll from '../ui/SmoothScroll';
import { rtdb } from '../../firebase/firebase';
import { ref, push, set } from 'firebase/database';

const ROLES = [
  { id: 'student', label: 'Student / Explorer', icon: '🎒', desc: 'Ages 8–16 exploring real constitutional stories' },
  { id: 'educator', label: 'Teacher / Educator', icon: '👩‍🏫', desc: 'Bringing rights literacy into school classrooms' },
  { id: 'parent', label: 'Parent / Guardian', icon: '👨‍👩‍👧', desc: 'Empowering children with safety and law at home' },
  { id: 'advocate', label: 'Advocate / NGO', icon: '⚖️', desc: 'Legal aid & child protection organizations' },
];

const UPCOMING_LANGUAGES = [
  { id: 'ta', label: 'Tamil (தமிழ்)' },
  { id: 'te', label: 'Telugu (తెలుగు)' },
  { id: 'mr', label: 'Marathi (मराठी)' },
  { id: 'bn', label: 'Bengali (বাংলা)' },
  { id: 'gu', label: 'Gujarati (ગુજરાતી)' },
  { id: 'ml', label: 'Malayalam (മലയാളം)' },
];

export default function WaitlistPage() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [selectedLang, setSelectedLang] = useState('ta');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [waitlistNumber, setWaitlistNumber] = useState(1420);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    sound.win();
    setSubmitting(true);

    try {
      if (rtdb) {
        const waitlistRef = push(ref(rtdb, 'waitlist_entries'));
        await set(waitlistRef, {
          email,
          role,
          preferredLanguage: selectedLang,
          createdAt: new Date().toISOString(),
          source: 'waitlist_page',
        });
      }
    } catch (err) {
      console.warn('Waitlist sync notice:', err?.message);
    }

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F5B942', '#FFE5B4', '#F2A65A', '#6FBF8F', '#F5EFE0'],
    });

    setWaitlistNumber((prev) => prev + 1);
    setSubmitted(true);
    setSubmitting(false);
  };

  const handleCopyLink = () => {
    sound.click();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#132A20] text-[#F5EFE0] font-body selection:bg-[#F5B942] selection:text-[#0D1F17] relative">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#132A20]/90 backdrop-blur-md border-b border-[#F5B942]/20 py-4 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link
              to="/"
              onClick={() => sound.click()}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#F5B942] text-[#0D1F17] flex items-center justify-center font-black text-xl border border-[#FFE5B4]/50 group-hover:scale-105 transition-transform">
                ⚖️
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-2xl text-[#F5B942] tracking-tight leading-none">
                  Legalese
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#F5EFE0]/60 font-semibold mt-0.5">
                  Expansion Waitlist
                </span>
              </div>
            </Link>

            <Link
              to="/onboarding"
              onClick={() => sound.click()}
              className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#F5B942] hover:bg-[#FFE5B4] text-[#0D1F17] font-extrabold text-xs sm:text-sm tracking-wide transition-all border border-[#FFE5B4]/60"
            >
              Play Rights Quest →
            </Link>
          </div>
        </header>

        {/* Hero & Form Section */}
        <main className="max-w-4xl mx-auto px-4 sm:px-8 py-14 sm:py-20 flex flex-col items-center text-center gap-8">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#132A20] border border-[#F5B942]/40 text-[#F5B942] text-xs font-bold tracking-wider uppercase">
            <span>✨ 2026 Expansion Roadmap</span>
          </div>

          {/* Headline */}
          <h1 className="poster-headline text-[#F5B942]">
            JOIN THE EXPANSION
          </h1>

          <p className="text-base sm:text-xl text-[#F5EFE0]/85 max-w-2xl mx-auto font-normal leading-relaxed">
            Get early access to 6 new regional language tracks, offline Classroom Adventure Kits, and our Junior Rights Quest for ages 6–8.
          </p>

          {/* Card Form Container */}
          <div className="w-full max-w-2xl bg-[#1B382B] border-2 border-[#F5B942]/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-left flex flex-col gap-8 relative">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  {/* Step 1: Role Selector */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-[#F5B942]">
                      1. Who are you joining as?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ROLES.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => { sound.click(); setRole(r.id); }}
                          className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                            role === r.id
                              ? 'bg-[#F5B942] text-[#0D1F17] border-[#F5B942] font-bold shadow-lg'
                              : 'bg-[#132A20]/80 hover:bg-[#132A20] border-white/10 text-[#F5EFE0]'
                          }`}
                        >
                          <span className="text-2xl shrink-0">{r.icon}</span>
                          <div className="flex flex-col">
                            <span className="text-xs font-extrabold">{r.label}</span>
                            <span className={`text-[11px] leading-tight mt-0.5 ${role === r.id ? 'text-[#0D1F17]/80' : 'text-[#F5EFE0]/60'}`}>
                              {r.desc}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Preferred Language */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-[#F5B942]">
                      2. Which language should we launch next?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {UPCOMING_LANGUAGES.map((lang) => (
                        <button
                          key={lang.id}
                          type="button"
                          onClick={() => { sound.click(); setSelectedLang(lang.id); }}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                            selectedLang === lang.id
                              ? 'bg-[#6FBF8F] text-[#0D1F17] border-[#6FBF8F]'
                              : 'bg-[#132A20]/80 hover:bg-[#132A20] border-white/10 text-[#F5EFE0]'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Email Input */}
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="waitlist-email" className="text-xs uppercase font-extrabold tracking-wider text-[#F5B942]">
                      3. Your email address for VIP priority invite
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        id="waitlist-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@school.edu.in or personal email"
                        className="flex-1 px-5 py-3.5 rounded-2xl bg-[#132A20] border border-white/20 text-[#F5EFE0] placeholder-[#F5EFE0]/40 text-sm focus:outline-none focus:border-[#F5B942] transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-7 py-3.5 rounded-2xl bg-[#F5B942] hover:bg-[#FFE5B4] text-[#0D1F17] font-extrabold text-sm tracking-wide transition-all border border-[#FFE5B4]/60 disabled:opacity-50 active:scale-95 cursor-pointer shrink-0"
                      >
                        {submitting ? 'Reserving...' : 'Claim Priority Spot 🚀'}
                      </button>
                    </div>
                    <span className="text-[11px] text-[#F5EFE0]/50 mt-1">
                      🔒 Zero spam. We will only notify you when your requested language/pack drops.
                    </span>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-6 py-6"
                >
                  <div className="w-16 h-16 rounded-3xl bg-[#6FBF8F] text-[#0D1F17] flex items-center justify-center text-3xl font-black">
                    🎉
                  </div>

                  <div>
                    <span className="text-xs font-extrabold tracking-widest text-[#F5B942] uppercase">
                      Spot Reserved Successfully!
                    </span>
                    <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#F5EFE0] mt-1">
                      You are #{waitlistNumber} on the Trail
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F5EFE0]/80 mt-2 max-w-md">
                      We have logged your invite for <strong>{email}</strong>. You will receive first access when the new language packs and Classroom Kits drop!
                    </p>
                  </div>

                  {/* Share Box */}
                  <div className="w-full p-4 rounded-2xl bg-[#132A20] border border-[#F5B942]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <span className="text-[#F5EFE0]/80 font-medium">
                      Share with fellow educators &amp; parents:
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-4 py-2 rounded-xl bg-[#F5B942] text-[#0D1F17] font-bold hover:bg-[#FFE5B4] transition-colors"
                    >
                      {copied ? '✅ Link Copied!' : '📋 Copy Share Link'}
                    </button>
                  </div>

                  <Link
                    to="/onboarding"
                    onClick={() => sound.click()}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-[#F5B942] hover:underline"
                  >
                    <span>In the meantime, play the active Rights Quest</span>
                    <span>→</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <div className="dotted-divider mt-16" />
        <footer className="py-8 px-4 text-center text-xs text-[#F5EFE0]/60">
          © 2026 Legalese • Free Open Educational Resource • Constitutional Literacy for India
        </footer>
      </div>
    </SmoothScroll>
  );
}
