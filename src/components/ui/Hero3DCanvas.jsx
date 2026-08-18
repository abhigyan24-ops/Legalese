
/**
 * Hero3DCanvas.jsx — Clean, Crisp Constitutional Monument Artwork Showcase
 * 
 * - 100% distortion-free high-definition reference artwork
 * - Zero box/grid outlines (seamless integration)
 * - Removed bottom overlay badge
 * - Subtle ambient golden glow
 */

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero3DCanvas() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * 5, y: x * 7 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      className="w-full flex items-center justify-center relative select-none py-2"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Warm Golden Halo Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FFB84D]/25 via-[#FFD180]/15 to-[#3874FF]/10 filter blur-3xl -z-10 scale-105 pointer-events-none" />

      {/* Main Monument Showcase (Completely Clean & Distortion-Free) */}
      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="w-full max-w-2xl relative"
      >
        <img
          src="/hero-constitution.jpg"
          alt="Constitution of India with Flag, Gavel, and Ashoka Chakra Pedestal"
          className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
          loading="eager"
        />
      </motion.div>
    </div>
  );
}
