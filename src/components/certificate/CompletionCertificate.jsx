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
  { id: 'protection-from-child-marriage', name: 'Dreams Guardian', icon: '📜', article: 'PCMA 2006' },
  { id: 'protection-from-child-labour', name: 'Childhood Protector', icon: '🏭', article: 'Child Labour Act' },
  { id: 'protection-from-abuse', name: 'Safety Shield', icon: '🛡️', article: 'POCSO Act' },
  { id: 'right-to-healthcare', name: 'Health Defender', icon: '🏥', article: 'Art. 21' },
  { id: 'right-to-equality', name: 'Equality Champion', icon: '⚖️', article: 'Art. 14 & 15' },
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
      link.download = `Rights-Quest-Certificate-${nickname.replace(/\s+/g, '_')}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    setTimeout(() => setDownloading(false), 800);
  };

  const isDark = theme === 'midnight';

  return (
    <div className="min-h-screen bg-[#110D22] text-white font-body p-4 sm:p-8 flex flex-col items-center justify-center relative select-none">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* ── TOP ACTION BAR ── */}
        <header className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#1D1836] border border-white/10 shadow-lg print:hidden">
          <Link
            to="/map"
            onClick={() => sound.click()}
            className="text-xs font-bold text-[#FFB84D] hover:underline flex items-center gap-1.5"
          >
            <span>←</span>
            <span>Return to Rights Map</span>
          </Link>

          {/* Theme Switcher Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-black/30 border border-white/10">
            <button
              onClick={() => {
                sound.click();
                setTheme('ivory');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                theme === 'ivory'
                  ? 'bg-[#FAF8F5] text-black shadow font-extrabold'
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
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#FDEAB2" />
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

            <rect width="920" height="640" rx="16" fill={isDark ? 'url(#darkBg)' : 'url(#ivoryBg)'} />

            <rect
              x="24"
              y="24"
              width="872"
              height="592"
              rx="10"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
            />
            <rect
              x="30"
              y="30"
              width="860"
              height="580"
              rx="8"
              fill="none"
              stroke={isDark ? 'rgba(255,184,77,0.3)' : 'rgba(179,135,40,0.3)'}
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            <g fill="url(#goldGradient)">
              <path d="M34 34 L60 34 L60 38 L38 38 L38 60 L34 60 Z" />
              <circle cx="48" cy="48" r="3" />
              <path d="M886 34 L860 34 L860 38 L882 38 L882 60 L886 60 Z" />
              <circle cx="872" cy="48" r="3" />
              <path d="M34 606 L60 606 L60 602 L38 602 L38 580 L34 580 Z" />
              <circle cx="48" cy="592" r="3" />
              <path d="M886 606 L860 606 L860 602 L882 602 L882 580 L886 580 Z" />
              <circle cx="872" cy="592" r="3" />
            </g>

            <g transform="translate(460, 82)">
              <circle cx="0" cy="0" r="28" fill="url(#goldGradient)" />
              <circle cx="0" cy="0" r="24" fill={isDark ? '#141124' : '#FDFBF7'} />
              <text x="0" y="8" textAnchor="middle" fontSize="24">⚖️</text>
            </g>

            <text
              x="460"
              y="136"
              textAnchor="middle"
              fill="url(#goldGradient)"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="13"
              fontWeight="800"
              letterSpacing="3"
            >
              LEGALESE • RIGHTS QUEST FOUNDATION
            </text>

            <text
              x="460"
              y="178"
              textAnchor="middle"
              fill={isDark ? '#FFFFFF' : '#1F1A14'}
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="34"
              fontWeight="bold"
              letterSpacing="1"
            >
              Certificate of Constitutional Literacy
            </text>

            <text
              x="460"
              y="208"
              textAnchor="middle"
              fill={isDark ? 'rgba(255,255,255,0.7)' : '#5A5248'}
              fontFamily="system-ui, sans-serif"
              fontSize="13"
              fontWeight="500"
            >
              This official citation of honour is hereby conferred upon
            </text>

            <text
              x="460"
              y="268"
              textAnchor="middle"
              fill={isDark ? '#FFFFFF' : '#14110E'}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="28"
              fontWeight="900"
            >
              {nickname}
            </text>

            <path d="M320 282 L600 282" stroke="url(#goldGradient)" strokeWidth="2" fill="none" />

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

            <g transform="translate(68, 348)">
              {BADGES_LIST.map((badge, idx) => (
                <g key={badge.id} transform={`translate(${idx * 132}, 0)`}>
                  <rect
                    width="120"
                    height="98"
                    rx="10"
                    fill={isDark ? '#1C1830' : '#FFFFFF'}
                    stroke={isDark ? 'rgba(255,184,77,0.3)' : 'rgba(179,135,40,0.25)'}
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="60"
                    cy="32"
                    r="18"
                    fill={isDark ? '#2A2447' : '#F7F3EB'}
                    stroke="url(#goldGradient)"
                    strokeWidth="1.2"
                  />
                  <text x="60" y="39" textAnchor="middle" fontSize="17">
                    {badge.icon}
                  </text>
                  <text
                    x="60"
                    y="66"
                    textAnchor="middle"
                    fill={isDark ? '#FFFFFF' : '#1A1612'}
                    fontSize="9.5"
                    fontWeight="bold"
                    fontFamily="system-ui, sans-serif"
                  >
                    {badge.name}
                  </text>
                  <text
                    x="60"
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
                {totalXp} XP EARNED • {completedCount}/{BADGES_LIST.length} QUESTS COMPLETED
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
