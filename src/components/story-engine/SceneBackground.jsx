/**
 * SceneBackground.jsx
 * 
 * Rich, full-screen composited vector environment for interactive story scenes.
 * Features:
 * - Multi-layer scene geometry (Sky/Outdoor, Back Wall, Windows, Floor with Perspective)
 * - Thematic props (Desks, Blackboards, Teastalls, Gates, Stools, Posters)
 * - Atmospheric time-of-day lighting & mood filters
 */

import { SCENE_PROPS, LOCATIONS } from '../../content/scene-props/props';

export default function SceneBackground({
  location = 'classroom',
  timeOfDay = 'day',
  sceneObjects = [],
  mood = 'neutral',
}) {
  const locData = LOCATIONS[location] || LOCATIONS.classroom;
  const colors = locData[timeOfDay] || locData.day || LOCATIONS.default.day;

  const moodOverlays = {
    neutral: 'transparent',
    worried: 'rgba(30, 40, 70, 0.25)',
    hopeful: 'rgba(245, 200, 66, 0.08)',
    happy: 'rgba(245, 200, 66, 0.12)',
    sad: 'rgba(30, 30, 55, 0.35)',
  };

  const gradId = `bg-grad-${location}-${timeOfDay}`;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none transition-all duration-700">
      <svg
        viewBox="0 0 1000 650"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Atmosphere Gradient */}
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.sky} />
            <stop offset="45%" stopColor={colors.mid} />
            <stop offset="100%" stopColor={colors.ground} />
          </linearGradient>

          {/* Wall Texture Gradient */}
          <linearGradient id="wall-shading" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.02)" />
          </linearGradient>

          {/* Window Glass Gradient */}
          <linearGradient id="window-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(135,206,235,0.15)" />
          </linearGradient>
        </defs>

        {/* ── LAYER 1: BASE SKY & OUTDOOR LIGHT ── */}
        <rect width="1000" height="650" fill={`url(#${gradId})`} />

        {/* ── LAYER 2: LOCATION-SPECIFIC ARCHITECTURE ── */}
        {location === 'classroom' && (
          <g>
            {/* Back Wall */}
            <rect x="0" y="80" width="1000" height="340" fill={colors.wall} opacity="0.4" />
            <rect x="0" y="80" width="1000" height="340" fill="url(#wall-shading)" />
            {/* Wall Wainscoting line */}
            <line x1="0" y1="420" x2="1000" y2="420" stroke="rgba(0,0,0,0.2)" strokeWidth="3" />

            {/* Large Classroom Windows */}
            <g transform="translate(620, 110)">
              <rect x="0" y="0" width="300" height="200" rx="8" fill="rgba(135,206,235,0.3)" stroke="#8b7b6b" strokeWidth="6" />
              <line x1="150" y1="0" x2="150" y2="200" stroke="#8b7b6b" strokeWidth="4" />
              <line x1="0" y1="100" x2="300" y2="100" stroke="#8b7b6b" strokeWidth="4" />
              <rect x="10" y="10" width="130" height="80" fill="url(#window-glass)" />
              {/* Outdoor tree outside window */}
              <circle cx="230" cy="80" r="45" fill="#2e7d32" opacity="0.5" />
              <circle cx="200" cy="65" r="35" fill="#388e3c" opacity="0.6" />
            </g>
          </g>
        )}

        {location === 'teastall' && (
          <g>
            {/* Distant street background */}
            <rect x="0" y="100" width="1000" height="300" fill={colors.wall} opacity="0.35" />
            {/* Stall Fabric Awning / Canopy */}
            <path
              d="M0,80 Q250,110 500,80 Q750,110 1000,80 L1000,120 Q750,150 500,120 Q250,150 0,120 Z"
              fill="#c0392b"
              opacity="0.85"
            />
            {/* Awning stripes */}
            <path
              d="M150,90 L250,105 L250,145 L150,130 Z M400,95 L500,80 L500,120 L400,135 Z M650,90 L750,105 L750,145 L650,130 Z M900,95 L1000,80 L1000,120 L900,135 Z"
              fill="#f1c40f"
              opacity="0.9"
            />
            {/* Wooden poles */}
            <rect x="80" y="120" width="14" height="400" fill="#5a3520" opacity="0.7" />
            <rect x="900" y="120" width="14" height="400" fill="#5a3520" opacity="0.7" />
          </g>
        )}

        {location === 'corridor' && (
          <g>
            <rect x="0" y="80" width="1000" height="340" fill={colors.wall} opacity="0.4" />
            {/* Archway perspective */}
            <path d="M150,80 Q250,20 350,80 L350,420 L150,420 Z" fill="rgba(0,0,0,0.15)" />
            <path d="M650,80 Q750,20 850,80 L850,420 L650,420 Z" fill="rgba(0,0,0,0.15)" />
          </g>
        )}

        {/* ── LAYER 3: FLOOR WITH PERSPECTIVE & SHADOWS ── */}
        <g>
          {/* Floor plane */}
          <polygon
            points="0,420 1000,420 1000,650 0,650"
            fill={colors.ground}
            opacity="0.95"
          />
          {/* Floor perspective grid lines */}
          <line x1="0" y1="420" x2="0" y2="650" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
          <line x1="250" y1="420" x2="150" y2="650" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
          <line x1="500" y1="420" x2="500" y2="650" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
          <line x1="750" y1="420" x2="850" y2="650" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
          <line x1="1000" y1="420" x2="1000" y2="650" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
          {/* Baseboard shadow */}
          <rect x="0" y="420" width="1000" height="12" fill="rgba(0,0,0,0.18)" />
        </g>

        {/* ── LAYER 4: SCENE OBJECTS (PROPS) ── */}
        {sceneObjects &&
          sceneObjects.map((item, idx) => {
            if (typeof item === 'string') {
              const PropComp = SCENE_PROPS[item];
              if (!PropComp) return null;
              return (
                <g key={idx} transform="scale(1.8)">
                  <PropComp x={40 + idx * 100} y={190} scale={1} />
                </g>
              );
            }
            if (item && item.p) {
              const PropComp = SCENE_PROPS[item.p];
              if (!PropComp) return null;
              const args = item.args || [];
              const highlight = args[0] === true;
              const count = typeof args[0] === 'number' ? args[0] : undefined;
              const text = typeof args[0] === 'string' ? args[0] : undefined;

              // Scale and position for 1000x650 viewport
              const scaledX = (item.x || 0) * 1.9;
              const scaledY = (item.y || 0) * 1.4;
              const propScale = (item.scale || 1) * 1.5;

              return (
                <PropComp
                  key={idx}
                  x={scaledX}
                  y={scaledY}
                  scale={propScale}
                  highlight={highlight}
                  count={count}
                  text={text}
                />
              );
            }
            return null;
          })}

        {/* ── LAYER 5: CHARACTER FLOOR SHADOWS ── */}
        {/* Hero Shadow (Left) */}
        <ellipse cx="220" cy="510" rx="45" ry="12" fill="rgba(0,0,0,0.28)" />

        {/* Secondary Character Shadow (Right) */}
        <ellipse cx="780" cy="505" rx="42" ry="11" fill="rgba(0,0,0,0.28)" />
      </svg>

      {/* Atmospheric Mood Overlay */}
      <div
        className="absolute inset-0 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: moodOverlays[mood] || 'transparent' }}
      />
    </div>
  );
}
