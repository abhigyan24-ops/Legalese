/**
 * CompletionCertificate.jsx
 * 
 * Rights Defender Award of Completion.
 * Downloadable & Printable SVG vector certificate featuring:
 * - Child's anonymous handle (never real name)
 * - 5 Constitutional Rights Badges
 * - Total XP earned
 * - Verified completion date
 * 
 * Kept strictly as a personal keepsake / motivational award (not a formal credential).
 */

import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import sound from '../../lib/sound';

const BADGES_LIST = [
  { id: 'right-to-education', name: 'Education Champion', icon: '🎓', article: 'Article 21-A' },
  { id: 'right-to-healthcare', name: 'Health Defender', icon: '🏥', article: 'Article 21' },
  { id: 'protection-from-child-labour', name: 'Childhood Protector', icon: '🏭', article: 'Child Labour Act' },
  { id: 'protection-from-abuse', name: 'Safety Shield', icon: '🛡️', article: 'POCSO Act 2012' },
  { id: 'protection-from-child-marriage', name: 'Dreams Guardian', icon: '📜', article: 'PCMA 2006' },
];

export default function CompletionCertificate() {
  const { state } = useApp();
  const certRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const nickname = state.currentUser?.nickname || 'Young Explorer';
  const totalXp = state.xp || 0;
  const completedCount = (state.completedStories || []).length;
  const isComplete = completedCount >= 5;
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
      link.download = `Rights_Quest_Certificate_${nickname}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    setDownloading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c1e] via-[#132A20] to-[#0a0a18] text-[#FBF3E3] font-body select-none py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header Navigation */}
        <header className="flex items-center justify-between pb-4 border-b border-white/10 print:hidden">
          <Link
            to="/map"
            onClick={() => sound.click()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
          >
            ← Back to Rights Trail
          </Link>

          <div className="text-center">
            <h1 className="text-base sm:text-lg font-display font-extrabold text-[#F5B942]">
              Rights Defender Keepsake Certificate
            </h1>
            <p className="text-[11px] text-white/50">Personal motivational milestone award</p>
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
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5B942] to-[#ffd700] text-black font-extrabold text-xs shadow-xl hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <span>⬇️</span>
              <span>Download Vector SVG</span>
            </button>
          </div>
        </header>

        {/* ── VECTOR SVG CERTIFICATE CANVAS ── */}
        <div
          ref={certRef}
          className="w-full bg-[#132A20] border-4 border-[#F5B942] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center"
        >
          {/* Certificate SVG Canvas */}
          <svg
            id="rights-quest-certificate-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 900 620"
            className="w-full h-auto drop-shadow-2xl"
          >
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5B942" />
                <stop offset="50%" stopColor="#FFE7A8" />
                <stop offset="100%" stopColor="#F5B942" />
              </linearGradient>
              <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#132A20" />
                <stop offset="100%" stopColor="#1D3C2C" />
              </linearGradient>
              <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#3A6650" opacity="0.4" />
              </pattern>
            </defs>

            {/* Background Parchment */}
            <rect width="900" height="620" rx="24" fill="url(#bgGrad)" stroke="url(#goldGrad)" strokeWidth="8" />
            <rect x="20" y="20" width="860" height="580" rx="16" fill="url(#dotPattern)" stroke="#3A6650" strokeWidth="2" strokeDasharray="6 4" />
            <rect x="30" y="30" width="840" height="560" rx="12" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" />

            {/* Corner Ornaments */}
            <g fill="none" stroke="#F5B942" strokeWidth="3">
              <path d="M40,70 L40,40 L70,40" />
              <circle cx="40" cy="40" r="4" fill="#F5B942" />
              <path d="M860,70 L860,40 L830,40" />
              <circle cx="860" cy="40" r="4" fill="#F5B942" />
              <path d="M40,550 L40,580 L70,580" />
              <circle cx="40" cy="580" r="4" fill="#F5B942" />
              <path d="M860,550 L860,580 L830,580" />
              <circle cx="860" cy="580" r="4" fill="#F5B942" />
            </g>

            {/* Top Emblem */}
            <circle cx="450" cy="85" r="36" fill="#25493A" stroke="url(#goldGrad)" strokeWidth="4" />
            <text x="450" y="96" textAnchor="middle" fontSize="30" fill="#FFE7A8">⚖️</text>

            {/* Certificate Header Titles */}
            <text x="450" y="150" textAnchor="middle" fill="#FFE7A8" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="bold" letterSpacing="4">
              REPUBLIC OF INDIA • CONSTITUTIONAL RIGHTS EXPEDITION
            </text>

            <text x="450" y="195" textAnchor="middle" fill="url(#goldGrad)" fontFamily="system-ui, sans-serif" fontSize="32" fontWeight="900">
              RIGHTS DEFENDER AWARD
            </text>

            <text x="450" y="230" textAnchor="middle" fill="#9FBBAB" fontFamily="system-ui, sans-serif" fontSize="14" fontStyle="italic">
              This milestone certifies that young explorer
            </text>

            {/* Child's Nickname Highlight */}
            <rect x="250" y="250" width="400" height="50" rx="14" fill="#25493A" stroke="url(#goldGrad)" strokeWidth="2" />
            <text x="450" y="285" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontSize="24" fontWeight="bold">
              {nickname}
            </text>

            <text x="450" y="330" textAnchor="middle" fill="#FBF3E3" fontFamily="system-ui, sans-serif" fontSize="14">
              has completed all 5 constitutional journeys and mastered the fundamental rights of Indian children:
            </text>

            {/* 5 Badges Row */}
            <g transform="translate(130, 360)">
              {BADGES_LIST.map((b, idx) => (
                <g key={b.id} transform={`translate(${idx * 130}, 0)`}>
                  <rect width="115" height="95" rx="12" fill="#25493A" stroke="#3A6650" strokeWidth="2" />
                  <circle cx="57.5" cy="30" r="18" fill="#1D3C2C" stroke="#F5B942" strokeWidth="1.5" />
                  <text x="57.5" y="38" textAnchor="middle" fontSize="18">{b.icon}</text>
                  <text x="57.5" y="65" textAnchor="middle" fill="#FFE7A8" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">
                    {b.name.split(' ')[0]}
                  </text>
                  <text x="57.5" y="78" textAnchor="middle" fill="#9FBBAB" fontSize="8" fontFamily="system-ui, sans-serif">
                    {b.article}
                  </text>
                </g>
              ))}
            </g>

            {/* Footer Stats & Keepsake Notice */}
            <line x1="80" y1="495" x2="820" y2="495" stroke="#3A6650" strokeWidth="1.5" />

            <text x="140" y="530" textAnchor="start" fill="#FFE7A8" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="bold">
              Total Score: <tspan fill="#FFFFFF">{totalXp} XP</tspan>
            </text>

            <text x="450" y="530" textAnchor="middle" fill="#FFE7A8" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="bold">
              Rights Mastered: <tspan fill="#FFFFFF">{completedCount}/5 Stories</tspan>
            </text>

            <text x="760" y="530" textAnchor="end" fill="#FFE7A8" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="bold">
              Date: <tspan fill="#FFFFFF">{dateStr}</tspan>
            </text>

            <text x="450" y="570" textAnchor="middle" fill="#9FBBAB" fontFamily="system-ui, sans-serif" fontSize="10" fontStyle="italic">
              * A personal motivational keepsake celebrating courage and knowledge of child rights in India.
            </text>
          </svg>
        </div>

        {/* Disclaimer Note */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/60 text-center leading-relaxed">
          ℹ️ <strong>Personal Keepsake Notice:</strong> This award is a personal learning certificate to celebrate
          your courage and understanding of children's rights. It is not an official government credential.
        </div>
      </div>
    </div>
  );
}
