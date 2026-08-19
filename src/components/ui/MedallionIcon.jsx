/**
 * MedallionIcon.jsx — Illustrated Gold Medallions for Rights Quest
 * 
 * Replaces generic emojis with handcrafted vector badge medallions:
 * - Consistent 1.75px stroke
 * - Warm gold (#F5B942) accents & highlights
 * - Circular or shield medallion frames with subtle dual-ring borders
 */

export default function MedallionIcon({
  type,
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  shape = 'circle', // 'circle' | 'shield'
  className = '',
}) {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const pxMap = {
    sm: 28,
    md: 40,
    lg: 48,
    xl: 64,
  };

  const px = pxMap[size] || 40;

  // Icon Vector Glyphs
  const renderGlyph = () => {
    switch (type) {
      case 'education':
      case 'right-to-education':
      case 'backpack':
        return (
          // Satchel / Knowledge Book with Feather Quill
          <svg width={px * 0.55} height={px * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
            <path d="M6 14h6" />
            <circle cx="17" cy="17" r="2" fill="currentColor" fillOpacity="0.2" />
          </svg>
        );

      case 'child-marriage':
      case 'protection-from-child-marriage':
      case 'marriage':
        return (
          // Broken Chain / Freedom Ribbon & Educational Diploma
          <svg width={px * 0.55} height={px * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 12 2 2 4-4" />
            <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z" />
            <path d="M9 3v4" />
            <path d="M15 3v4" />
            <path d="M12 17v4" />
            <path d="M8 21h8" />
          </svg>
        );

      case 'child-labour':
      case 'protection-from-child-labour':
      case 'labour':
        return (
          // Lantern of Hope / Shield against Exploitation
          <svg width={px * 0.55} height={px * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3h6v3H9z" />
            <path d="M6 8h12l-2 11H8L6 8z" />
            <path d="M12 11v4" />
            <circle cx="12" cy="13" r="1.5" fill="currentColor" />
            <path d="M10 21h4" />
          </svg>
        );

      case 'abuse':
      case 'protection-from-abuse':
      case 'shield':
        return (
          // Guardian Aegis Shield with Heart / Trust Star
          <svg width={px * 0.55} height={px * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        );

      case 'healthcare':
      case 'right-to-healthcare':
      case 'health':
        return (
          // Heart of Life & Caring Hands / Healing Cross
          <svg width={px * 0.55} height={px * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 7v6" />
            <path d="M9 10h6" />
          </svg>
        );

      case 'equality':
      case 'right-to-equality':
      case 'scales':
        return (
          // Balance Scales of Justice & Constitutional Pillar
          <svg width={px * 0.55} height={px * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="M7 21h10" />
            <path d="M12 3v18" />
            <path d="M3 7h18" />
            <circle cx="12" cy="5" r="1" fill="currentColor" />
          </svg>
        );

      case 'certificate':
      case 'trophy':
        return (
          <svg width={px * 0.55} height={px * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        );

      default:
        // Constitutional Scales fallback
        return (
          <svg width={px * 0.55} height={px * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="M7 21h10" />
            <path d="M12 3v18" />
            <path d="M3 7h18" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none text-[#F5B942] ${sizeMap[size] || sizeMap.md} ${
        shape === 'shield'
          ? 'bg-gradient-to-b from-[#1E3B2E] to-[#132A20] rounded-2xl border border-[#F5B942]/60 shadow-[0_2px_12px_rgba(245,185,66,0.2)]'
          : 'bg-[#183528] rounded-full border border-[#F5B942]/60 ring-1 ring-[#F5B942]/30 shadow-[0_2px_10px_rgba(245,185,66,0.15)]'
      } ${className}`}
    >
      {/* Subtle Inner Ring Glow */}
      <div className="absolute inset-0.5 rounded-full border border-[#FFE5B4]/20 pointer-events-none" />
      {renderGlyph()}
    </div>
  );
}
