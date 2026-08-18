/**
 * CompletionCertificate.jsx — Clean, Elegant & Modern Rights Defender Certificate
 * 
 * Features:
 * - High-end vector SVG with crisp typography and delicate gold filigree
 * - Dual Theme Switcher: Classic Ivory Parchment 📜 (print-perfect) vs. Royal Midnight Navy 🌌
 * - 5 Constitutional Milestone Badges with clear statutory articles
 * - High-res Vector SVG export + 1-Click Print Support
 */

import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import sound from '../../lib/sound';

const BADGES_LIST = [
  { id: 'right-to-education', name: 'Education Champion', icon: '🎒', article: 'Art. 21-A' },
  { id: 'right-to-healthcare', name: 'Health Defender', icon: '🏥', article: 'Art. 21' },
  { id: 'protection-from-child-labour', name: 'Childhood Protector', icon: '🏭', article: 'Child Labour Act' },
  { id: 'protection-from-abuse', name: 'Safety Shield', icon: '🛡️', article: 'POCSO Act' },
  { id: 'protection-from-child-marriage', name: 'Dreams Guardian', icon: '📜', article: 'PCMA 2006' },
];

export default function CompletionCertificate() {
  const { state } = useApp();
  const certRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [theme, setTheme] = useState('ivory'); // 'ivory' | 'midnight'

  const nickname = state.currentUser?.nickname || 'Young Explorer';
  const totalXp = state.xp || 0;
  const completedCount = (state.completedStories || []).length;
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    sound.click();
    window.print();
  };

  const handleDownloadSvg = () => {
    sound.win();
    setDownloading(true);

    const svgElement = document.getElementById('rights-quest-certificate-svg');
    if (svgElement) {
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svgElement);

      if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `Rights_Quest_Certificate_${nickname.replace(/\s+/g, '_')}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    setDownloading(false);
  };

  const isDark = theme === 'midnight';

  return (
    <div className="min-h-screen bg-[#0F0D1B] text-[#F0EDF6] font-body select-none py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* ── TOP HEADER / TOOLBAR ── */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 print:hidden">
          <Link
            to="/map"
            onClick={() => sound.click()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
          >
            ← Back to Rights Trail
          </Link>

          {/* Theme Selector */}
          <div className="flex items-center gap-2 bg-[#1C1830] border border-white/15 p-1 rounded-xl">
            <button
              onClick={() => {
                sound.click();
                setTheme('ivory');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                theme === 'ivory'
                  ? 'bg-amber-100 text-stone-900 shadow font-extrabold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              📜 Classic Ivory
            </button>
            <button
              onClick={() => {
                sound.click();
                setTheme('midnight');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                theme === 'midnight'
                  ? 'bg-[#FFB84D] text-black shadow font-extrabold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              🌌 Royal Midnight
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow flex items-center gap-1.5"
            >
              <span>🖨️</span>
              <span>Print</span>
            </button>
            <button
              onClick={handleDownloadSvg}
              disabled={downloading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFB84D] to-[#FFD700] text-black font-extrabold text-xs shadow-xl hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <span>⬇️</span>
              <span>Download Vector SVG</span>
            </button>
          </div>
        </header>

        {/* ── CERTIFICATE CANVAS CONTAINER ── */}
        <div
          ref={certRef}
          className={`w-full rounded-3xl p-3 sm:p-6 shadow-2xl transition-all duration-500 overflow-hidden flex flex-col items-center justify-center ${
            isDark ? 'bg-[#151226] border-2 border-[#FFB84D]/40' : 'bg-[#FAF8F5] border-2 border-stone-300'
          }`}
        >
          {/* ── CLEAN VECTOR SVG CERTIFICATE ── */}
          <svg
            id="rights-quest-certificate-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 920 640"
            className="w-full h-auto drop-shadow-md rounded-2xl"
          >
            <defs>
              {/* Premium Gold Gradients */}
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="25%" stopColor="#F9E498" />
                <stop offset="50%" stopColor="#DFBA48" />
                <stop offset="75%" stopColor="#FDEAB2" />
                <stop offset="100%" stopColor="#B38728" />
              </linearGradient>

              <linearGradient id="darkBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#141124" />
                <stop offset="100%" stopColor="#0B0915" />
              </linearGradient>

              <linearGradient id="ivoryBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDFBF7" />
                <stop offset="100%" stopColor="#F4EFE6" />
              </linearGradient>
            </defs>

            {/* 1. Main Background */}
            <rect
              width="920"
              height="640"
              rx="16"
              fill={isDark ? 'url(#darkBg)' : 'url(#ivoryBg)'}
            />

            {/* 2. Outer Geometric Border */}
            <rect
              x="24"
              y="24"
              width="872"
              height="592"
              rx="12"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
            />

            {/* Inner Thin Border */}
            <rect
              x="32"
              y="32"
              width="856"
              height="576"
              rx="8"
              fill="none"
              stroke={isDark ? 'rgba(212,175,55,0.3)' : 'rgba(179,135,40,0.3)'}
              strokeWidth="1"
            />

            {/* Corner Filigree Accents */}
            <g stroke="url(#goldGradient)" strokeWidth="1.5" fill="none">
              {/* Top-Left */}
              <path d="M42 60 L42 42 L60 42" />
              <circle cx="42" cy="42" r="3" fill="url(#goldGradient)" />
              {/* Top-Right */}
              <path d="M878 60 L878 42 L860 42" />
              <circle cx="878" cy="42" r="3" fill="url(#goldGradient)" />
              {/* Bottom-Left */}
              <path d="M42 580 L42 598 L60 598" />
              <circle cx="42" cy="598" r="3" fill="url(#goldGradient)" />
              {/* Bottom-Right */}
              <path d="M878 580 L878 598 L860 598" />
              <circle cx="878" cy="598" r="3" fill="url(#goldGradient)" />
            </g>

            {/* 3. Top Emblem / Seal */}
            <g transform="translate(460, 85)">
              <circle cx="0" cy="0" r="28" fill={isDark ? '#221D38' : '#FAF6EE'} stroke="url(#goldGradient)" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="24" fill="none" stroke={isDark ? '#FFB84D' : '#B38728'} strokeWidth="0.8" strokeDasharray="3 2" />
              <text x="0" y="8" textAnchor="middle" fontSize="22">⚖️</text>
            </g>

            {/* 4. Main Subtitle / Authority */}
            <text
              x="460"
              y="142"
              textAnchor="middle"
              fill={isDark ? '#FFB84D' : '#8C6D1F'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="11"
              fontWeight="800"
              letterSpacing="3.5"
            >
              LEGALESE • CONSTITUTIONAL LITERACY INITIATIVE
            </text>

            {/* 5. Main Certificate Title */}
            <text
              x="460"
              y="180"
              textAnchor="middle"
              fill={isDark ? 'url(#goldGradient)' : '#1F1A12'}
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="28"
              fontWeight="bold"
              letterSpacing="1.5"
            >
              CERTIFICATE OF CONSTITUTIONAL DEFENDER
            </text>

            {/* 6. Certification Text */}
            <text
              x="460"
              y="218"
              textAnchor="middle"
              fill={isDark ? 'rgba(255,255,255,0.65)' : '#665C4F'}
              fontFamily="Georgia, serif"
              fontSize="14"
              fontStyle="italic"
            >
              This award is proudly presented to
            </text>

            {/* 7. Explorer Name Box */}
            <text
              x="460"
              y="268"
              textAnchor="middle"
              fill={isDark ? '#FFFFFF' : '#14110E'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="26"
              fontWeight="900"
              letterSpacing="1"
            >
              {nickname}
            </text>

            {/* Name Underline Decors */}
            <path
              d="M320 282 L600 282"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="460" cy="282" r="3.5" fill="url(#goldGradient)" />

            {/* 8. Description */}
            <text
              x="460"
              y="320"
              textAnchor="middle"
              fill={isDark ? 'rgba(255,255,255,0.75)' : '#4A4237'}
              fontFamily="system-ui, sans-serif"
              fontSize="13"
              fontWeight="500"
            >
              for demonstrating courage, constitutional literacy, and mastering child rights in India:
            </text>

            {/* 9. 5 Badges Cards Row */}
            <g transform="translate(90, 348)">
              {BADGES_LIST.map((badge, idx) => (
                <g key={badge.id} transform={`translate(${idx * 152}, 0)`}>
                  {/* Badge Card Background */}
                  <rect
                    width="134"
                    height="98"
                    rx="10"
                    fill={isDark ? '#1C1830' : '#FFFFFF'}
                    stroke={isDark ? 'rgba(255,184,77,0.3)' : 'rgba(179,135,40,0.25)'}
                    strokeWidth="1.2"
                  />
                  {/* Icon Circle */}
                  <circle
                    cx="67"
                    cy="32"
                    r="18"
                    fill={isDark ? '#2A2447' : '#F7F3EB'}
                    stroke="url(#goldGradient)"
                    strokeWidth="1.2"
                  />
                  <text x="67" y="39" textAnchor="middle" fontSize="17">
                    {badge.icon}
                  </text>
                  {/* Title */}
                  <text
                    x="67"
                    y="66"
                    textAnchor="middle"
                    fill={isDark ? '#FFFFFF' : '#1A1612'}
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="system-ui, sans-serif"
                  >
                    {badge.name}
                  </text>
                  {/* Statutory Article Tag */}
                  <text
                    x="67"
                    y="82"
                    textAnchor="middle"
                    fill={isDark ? '#FFB84D' : '#8C6D1F'}
                    fontSize="9"
                    fontWeight="800"
                    fontFamily="system-ui, sans-serif"
                  >
                    {badge.article}
                  </text>
                </g>
              ))}
            </g>

            {/* 10. Footer Section with Details */}
            <line
              x1="70"
              y1="485"
              x2="850"
              y2="485"
              stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}
              strokeWidth="1"
            />

            {/* Left Detail: Date */}
            <g transform="translate(100, 520)">
              <text x="0" y="0" fill={isDark ? 'rgba(255,255,255,0.45)' : '#7D7365'} fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">
                DATE ISSUED
              </text>
              <text x="0" y="20" fill={isDark ? '#FFFFFF' : '#1A1612'} fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">
                {dateStr}
              </text>
            </g>

            {/* Center Detail: Score & Milestone */}
            <g transform="translate(460, 520)">
              <text x="0" y="0" textAnchor="middle" fill={isDark ? 'rgba(255,255,255,0.45)' : '#7D7365'} fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">
                DEFENDER MERIT RECORD
              </text>
              <text x="0" y="20" textAnchor="middle" fill={isDark ? '#FFB84D' : '#8C6D1F'} fontSize="14" fontWeight="800" fontFamily="system-ui, sans-serif">
                {totalXp} XP EARNED • {completedCount}/5 QUESTS COMPLETED
              </text>
            </g>

            {/* Right Detail: Verified Seal */}
            <g transform="translate(820, 520)">
              <text x="0" y="0" textAnchor="end" fill={isDark ? 'rgba(255,255,255,0.45)' : '#7D7365'} fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">
                STATUS
              </text>
              <text x="0" y="20" textAnchor="end" fill={isDark ? '#34D399' : '#059669'} fontSize="13" fontWeight="bold" fontFamily="system-ui, sans-serif">
                ✓ VERIFIED RECORD
              </text>
            </g>

            {/* 11. Bottom Decorative Tagline */}
            <text
              x="460"
              y="592"
              textAnchor="middle"
              fill={isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'}
              fontFamily="system-ui, sans-serif"
              fontSize="9"
              fontStyle="italic"
            >
              Personal learning recognition celebrating youth constitutional awareness in India.
            </text>
          </svg>
        </div>

        {/* ── HELPFUL NOTE ── */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/60 text-center leading-relaxed print:hidden">
          💡 <strong>Tip:</strong> Choose between <strong>Classic Ivory</strong> or <strong>Royal Midnight</strong> and tap <strong>Download Vector SVG</strong> or <strong>Print</strong> to save your keepsake award!
        </div>
      </div>
    </div>
  );
}
