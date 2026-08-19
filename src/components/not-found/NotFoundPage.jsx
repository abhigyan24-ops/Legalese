/**
 * NotFoundPage.jsx — 404 Off The Rights Trail
 * 
 * Design Tokens:
 * - Canvas: Deep Forest (#132A20), Gold Accent (#F5B942), Cream (#F5EFE0), Ink (#0D1F17)
 * - Typography: Poster scale Baloo 2 + Plus Jakarta Sans
 * - Storybook adventure 404 experience with quick navigational rescue trails
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import sound from '../../lib/sound';
import SmoothScroll from '../ui/SmoothScroll';

export default function NotFoundPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#132A20] text-[#F5EFE0] font-body selection:bg-[#F5B942] selection:text-[#0D1F17] flex flex-col justify-between relative overflow-hidden">
        {/* Navigation Bar */}
        <header className="py-6 px-6 sm:px-12 flex items-center justify-between border-b border-[#F5B942]/20">
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
                Rights Quest
              </span>
            </div>
          </Link>

          <Link
            to="/onboarding"
            onClick={() => sound.click()}
            className="px-5 py-2 rounded-full bg-[#F5B942] hover:bg-[#FFE5B4] text-[#0D1F17] font-extrabold text-xs sm:text-sm tracking-wide transition-all border border-[#FFE5B4]/60"
          >
            Start Quest →
          </Link>
        </header>

        {/* Main 404 Hero */}
        <main className="max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center flex flex-col items-center gap-8 z-10 relative">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B382B] border border-[#F5B942]/40 text-[#F5B942] text-xs font-bold tracking-wider uppercase">
            <span>🧭 Uncharted Territory</span>
          </div>

          {/* Poster 404 Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="font-display font-extrabold text-7xl sm:text-9xl text-[#F5B942]/30 leading-none select-none">
              404
            </span>
            <h1 className="poster-headline text-[#F5B942] -mt-6 sm:-mt-10">
              OFF THE TRAIL
            </h1>
          </motion.div>

          <p className="text-base sm:text-xl text-[#F5EFE0]/80 max-w-xl mx-auto leading-relaxed">
            You have ventured beyond the mapped chapters of the Constitution. Don&apos;t worry — every great explorer takes an unexpected detour!
          </p>

          {/* Rescue Action Trails Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
            <Link
              to="/map"
              onClick={() => sound.click()}
              className="p-5 rounded-2xl bg-[#1B382B] border border-[#F5B942]/40 hover:border-[#F5B942] hover:bg-[#234A39] transition-all flex flex-col items-center text-center gap-2 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">🗺️</span>
              <span className="font-display font-bold text-base text-[#F5EFE0]">
                Rights Map
              </span>
              <span className="text-xs text-[#F5EFE0]/60">
                Return to the main quest trail
              </span>
            </Link>

            <Link
              to="/landing"
              onClick={() => sound.click()}
              className="p-5 rounded-2xl bg-[#1B382B] border border-[#F5B942]/40 hover:border-[#F5B942] hover:bg-[#234A39] transition-all flex flex-col items-center text-center gap-2 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">📖</span>
              <span className="font-display font-bold text-base text-[#F5EFE0]">
                Home Base
              </span>
              <span className="text-xs text-[#F5EFE0]/60">
                Explore the 6 constitutional rights
              </span>
            </Link>

            <Link
              to="/waitlist"
              onClick={() => sound.click()}
              className="p-5 rounded-2xl bg-[#1B382B] border border-[#F5B942]/40 hover:border-[#F5B942] hover:bg-[#234A39] transition-all flex flex-col items-center text-center gap-2 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">✨</span>
              <span className="font-display font-bold text-base text-[#F5EFE0]">
                2026 Expansion
              </span>
              <span className="text-xs text-[#F5EFE0]/60">
                Join the upcoming waitlist
              </span>
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-4 text-center text-xs text-[#F5EFE0]/60 border-t border-[#F5B942]/20">
          © 2026 Legalese • Free Open Constitutional Literacy Resource • Where Courage Teaches Children Their Rights
        </footer>
      </div>
    </SmoothScroll>
  );
}
