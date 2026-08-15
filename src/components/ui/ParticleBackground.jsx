/**
 * ParticleBackground.jsx — Warm Golden Ambient Floating Dust
 * Pure lightweight CSS-animated particle field for warm storybook atmosphere.
 */

import { useMemo } from 'react';

export default function ParticleBackground({ count = 24 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 17) % 100}%`,
      top: `${(i * 23) % 100}%`,
      size: `${3 + (i % 4)}px`,
      opacity: 0.2 + ((i % 5) * 0.12),
      duration: `${12 + (i % 10)}s`,
      delay: `${(i % 7) * 1.5}s`,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#F5B942] animate-floatParticle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}
