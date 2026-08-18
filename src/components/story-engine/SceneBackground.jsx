/**
 * SceneBackground.jsx
 *
 * Immersive, richly animated vector scene system for Rights Quest story mode.
 *
 * Features per location:
 * - Classroom: sunlit walls, blackboard, animated floating dust motes, classroom windows with moving trees
 * - Tea Stall: vibrant street awning, steaming kettle, lanterns, crowd shadow movement
 * - Corridor: deep arched hallway with perspective depth, flickering wall lamp
 * - Gate: open school gate with sky, animated birds
 * - Schoolyard: open outdoor sky, swaying trees, moving cloud shadows
 * - Staffroom: moody desk scene, window blinds, wall maps
 * - Street: busy road perspective, animated cycle silhouette
 *
 * Time of day: day (bright sky), dusk (amber haze), evening (deep purple with stars)
 * Mood overlays: hopeful, worried, happy, sad
 */

import { LOCATIONS } from '../../content/scene-props/props';

// ── Animated Element Components ──

function Cloud({ x, y, w, opacity, speed, id }) {
  return (
    <g opacity={opacity}>
      <ellipse cx={x} cy={y} rx={w} ry={w * 0.4} fill="rgba(255,255,255,0.85)">
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to={`${speed} 0`}
          dur={`${28 + id * 7}s`}
          repeatCount="indefinite"
        />
      </ellipse>
      <ellipse cx={x - w * 0.3} cy={y + 5} rx={w * 0.6} ry={w * 0.35} fill="rgba(255,255,255,0.75)">
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to={`${speed} 0`}
          dur={`${28 + id * 7}s`}
          repeatCount="indefinite"
        />
      </ellipse>
      <ellipse cx={x + w * 0.35} cy={y + 4} rx={w * 0.5} ry={w * 0.3} fill="rgba(255,255,255,0.7)">
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to={`${speed} 0`}
          dur={`${28 + id * 7}s`}
          repeatCount="indefinite"
        />
      </ellipse>
    </g>
  );
}

function Star({ x, y, r, delay }) {
  return (
    <circle cx={x} cy={y} r={r} fill="white">
      <animate
        attributeName="opacity"
        values="0.2;1;0.2"
        dur="3s"
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

function DustMote({ x, y, delay }) {
  return (
    <circle cx={x} cy={y} r="1.5" fill="rgba(255,220,120,0.55)">
      <animate attributeName="cy" values={`${y};${y - 40};${y}`} dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;0.7;0" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
    </circle>
  );
}

function SteamPuff({ x, y, delay }) {
  return (
    <path d={`M${x} ${y} Q${x - 4} ${y - 12} ${x} ${y - 22}`} stroke="rgba(255,255,255,0.35)" fill="none" strokeWidth="3" strokeLinecap="round">
      <animate attributeName="d" values={`M${x} ${y} Q${x - 4} ${y - 12} ${x} ${y - 22};M${x} ${y} Q${x + 5} ${y - 14} ${x} ${y - 22};M${x} ${y} Q${x - 4} ${y - 12} ${x} ${y - 22}`} dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;0.8;0" dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
    </path>
  );
}

function SwayingTree({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Trunk */}
      <rect x="-6" y="0" width="12" height="60" rx="4" fill="#5a3520" />
      {/* Main canopy */}
      <ellipse cx="0" cy="-20" rx="38" ry="30" fill="#2e7d32">
        <animateTransform attributeName="transform" type="rotate" values="0 0 30;3 0 30;0 0 30;-2 0 30;0 0 30" dur="6s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="-20" cy="-5" rx="28" ry="22" fill="#388e3c" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate" values="0 0 30;-2 0 30;0 0 30;3 0 30;0 0 30" dur="7s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="20" cy="-8" rx="25" ry="20" fill="#43a047" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate" values="0 0 30;2 0 30;0 0 30;-3 0 30;0 0 30" dur="5s" repeatCount="indefinite" />
      </ellipse>
    </g>
  );
}

function FlickeringLamp({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-2" y="0" width="4" height="28" fill="#6b5030" />
      <polygon points="-8,-2 8,-2 6,12 -6,12" fill="#d4a017" stroke="#b8860b" strokeWidth="1" />
      <ellipse cx="0" cy="5" rx="6" ry="4" fill="rgba(255,240,100,0.5)">
        <animate attributeName="opacity" values="0.4;1;0.6;1;0.4" dur="3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="0" cy="5" rx="14" ry="10" fill="rgba(255,220,50,0.12)">
        <animate attributeName="opacity" values="0.2;0.5;0.3;0.5;0.2" dur="3s" repeatCount="indefinite" />
      </ellipse>
    </g>
  );
}

function Bird({ x, y, delay }) {
  return (
    <g>
      <path d={`M${x} ${y} Q${x + 6} ${y - 5} ${x + 12} ${y}`} fill="none" stroke="rgba(30,30,50,0.7)" strokeWidth="1.5" strokeLinecap="round">
        <animateTransform attributeName="transform" type="translate" from="0 0" to="200 -40" dur="8s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="d" values={`M${x} ${y} Q${x + 6} ${y - 6} ${x + 12} ${y};M${x} ${y} Q${x + 6} ${y - 2} ${x + 12} ${y};M${x} ${y} Q${x + 6} ${y - 6} ${x + 12} ${y}`} dur="0.6s" repeatCount="indefinite" />
      </path>
    </g>
  );
}

// ── Scene-Specific Layers ──

function ClassroomScene({ colors }) {
  return (
    <g>
      {/* Back Wall */}
      <rect x="0" y="60" width="1000" height="360" fill={colors.wall} opacity="0.55" />
      <rect x="0" y="60" width="1000" height="360" fill="url(#wall-shading-cls)" />

      {/* Wainscoting line */}
      <rect x="0" y="408" width="1000" height="14" fill="rgba(0,0,0,0.12)" rx="0" />
      <line x1="0" y1="408" x2="1000" y2="408" stroke="rgba(0,0,0,0.2)" strokeWidth="3" />

      {/* Blackboard */}
      <rect x="60" y="80" width="380" height="200" rx="5" fill="#1e4d1e" stroke="#5a4a3a" strokeWidth="4" />
      <rect x="70" y="90" width="360" height="180" fill="#235e23" />
      {/* Chalk text on board */}
      <text x="250" y="150" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="18" fontFamily="serif">भारतीय संविधान</text>
      <text x="250" y="175" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="14" fontFamily="serif">Article 21A — Right to Education</text>
      <line x1="90" y1="195" x2="410" y2="195" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <text x="250" y="215" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="12" fontFamily="serif">Every child 6–14 years has the right</text>
      {/* Chalk tray */}
      <rect x="70" y="268" width="360" height="10" rx="2" fill="#4a3a2a" />
      <rect x="90" y="269" width="22" height="7" rx="1" fill="rgba(255,255,255,0.5)" />
      <rect x="120" y="269" width="16" height="7" rx="1" fill="rgba(200,180,140,0.6)" />

      {/* Windows right side */}
      <g transform="translate(620, 90)">
        <rect x="0" y="0" width="170" height="200" rx="6" fill="rgba(135,206,235,0.3)" stroke="#8b7b6b" strokeWidth="5" />
        <line x1="85" y1="0" x2="85" y2="200" stroke="#8b7b6b" strokeWidth="3" />
        <line x1="0" y1="100" x2="170" y2="100" stroke="#8b7b6b" strokeWidth="3" />
        <rect x="6" y="6" width="76" height="88" fill="rgba(135,206,235,0.25)" />
        {/* Outdoor view through window — trees */}
        <ellipse cx="130" cy="50" rx="30" ry="25" fill="#2e7d32" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" values="0 130 80;2 130 80;0 130 80;-2 130 80;0 130 80" dur="6s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="115" cy="65" rx="22" ry="18" fill="#388e3c" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" values="0 115 90;-2 115 90;0 115 90;3 115 90;0 115 90" dur="7.5s" repeatCount="indefinite" />
        </ellipse>
        {/* Sunlight diagonal */}
        <polygon points="0,0 20,0 0,30" fill="rgba(255,250,200,0.18)" />
      </g>

      {/* Second window */}
      <g transform="translate(820, 90)">
        <rect x="0" y="0" width="140" height="200" rx="6" fill="rgba(135,206,235,0.28)" stroke="#8b7b6b" strokeWidth="5" />
        <line x1="70" y1="0" x2="70" y2="200" stroke="#8b7b6b" strokeWidth="3" />
        <line x1="0" y1="100" x2="140" y2="100" stroke="#8b7b6b" strokeWidth="3" />
      </g>

      {/* Sunrays through window */}
      <polygon points="620,90 680,90 620,230" fill="rgba(255,250,180,0.07)" />
      <polygon points="820,90 870,90 820,250" fill="rgba(255,250,180,0.05)" />

      {/* Wall Clock */}
      <circle cx="490" cy="135" r="26" fill="#f5f0e6" stroke="#5a4a3a" strokeWidth="3" />
      <circle cx="490" cy="135" r="22" fill="none" stroke="#d4c5a9" strokeWidth="0.5" />
      <line x1="490" y1="135" x2="490" y2="118" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="490" y1="135" x2="503" y2="142" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <circle cx="490" cy="135" r="3" fill="#333" />

      {/* Row of desks in foreground */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${80 + i * 260}, 450) scale(1.8)`}>
          <rect x="0" y="0" width="80" height="50" rx="3" fill="#5a4a3a" stroke="#4a3a2a" strokeWidth="1.5" />
          <rect x="5" y="2" width="70" height="30" rx="2" fill="#6b5b4b" />
          <rect x="15" y="6" width="30" height="20" rx="2" fill="#e8d5b0" opacity="0.6" />
          <rect x="10" y="35" width="8" height="18" fill="#4a3a2a" />
          <rect x="62" y="35" width="8" height="18" fill="#4a3a2a" />
        </g>
      ))}

      {/* Animated dust motes in sunlight */}
      {[0, 1, 2, 3, 4].map((i) => (
        <DustMote key={i} x={640 + i * 30} y={200 + i * 20} delay={i * 1.2} />
      ))}

      {/* Bulletin board on left wall */}
      <rect x="470" y="85" width="120" height="90" rx="3" fill="#8b6914" stroke="#6b4f10" strokeWidth="2" />
      <rect x="476" y="91" width="108" height="78" fill="#d4a574" />
      {/* Pinned papers */}
      <rect x="480" y="96" width="28" height="34" fill="#f5f0e6" transform="rotate(-3 494 113)" />
      <circle cx="494" cy="98" r="2.5" fill="#e44" />
      <rect x="516" y="98" width="28" height="34" fill="#fdf2d5" transform="rotate(2 530 115)" />
      <circle cx="530" cy="100" r="2.5" fill="#2e7d32" />
    </g>
  );
}

function TeaStallScene({ colors }) {
  return (
    <g>
      {/* Street background */}
      <rect x="0" y="80" width="1000" height="330" fill={colors.wall} opacity="0.4" />

      {/* Buildings in background */}
      <rect x="0" y="120" width="200" height="300" fill="rgba(180,160,130,0.5)" />
      <rect x="10" y="140" width="40" height="30" rx="2" fill="rgba(135,206,235,0.35)" stroke="#8b7b6b" strokeWidth="2" />
      <rect x="60" y="140" width="40" height="30" rx="2" fill="rgba(135,206,235,0.35)" stroke="#8b7b6b" strokeWidth="2" />
      <rect x="110" y="140" width="40" height="30" rx="2" fill="rgba(135,206,235,0.35)" stroke="#8b7b6b" strokeWidth="2" />

      <rect x="750" y="110" width="250" height="310" fill="rgba(170,150,120,0.45)" />
      <rect x="760" y="130" width="40" height="30" rx="2" fill="rgba(135,206,235,0.3)" stroke="#8b7b6b" strokeWidth="2" />
      <rect x="820" y="130" width="40" height="30" rx="2" fill="rgba(135,206,235,0.3)" stroke="#8b7b6b" strokeWidth="2" />
      <rect x="880" y="130" width="40" height="30" rx="2" fill="rgba(135,206,235,0.3)" stroke="#8b7b6b" strokeWidth="2" />

      {/* Canopy / Awning — vibrant striped */}
      <path d="M0,65 Q250,100 500,65 Q750,100 1000,65 L1000,115 Q750,150 500,115 Q250,150 0,115 Z" fill="#c0392b" opacity="0.9" />
      {/* Awning stripes */}
      <path d="M120,78 L230,95 L230,140 L120,123 Z M380,70 L500,65 L500,115 L380,120 Z M620,75 L730,95 L730,140 L620,120 Z M870,75 L1000,65 L1000,115 L870,120 Z" fill="#f1c40f" opacity="0.85" />
      {/* Fringe on canopy */}
      {Array.from({ length: 20 }, (_, i) => (
        <line key={i} x1={25 + i * 50} y1="115" x2={25 + i * 50 + 5} y2="130" stroke="#f1c40f" strokeWidth="2" />
      ))}

      {/* Wooden support poles */}
      <rect x="70" y="112" width="16" height="310" fill="#5a3520" opacity="0.8" />
      <rect x="920" y="112" width="16" height="310" fill="#5a3520" opacity="0.8" />
      <rect x="380" y="112" width="14" height="310" fill="#6b4226" opacity="0.7" />
      <rect x="610" y="112" width="14" height="310" fill="#6b4226" opacity="0.7" />

      {/* Hanging lanterns */}
      <FlickeringLamp x={225} y={115} />
      <FlickeringLamp x={500} y={118} />
      <FlickeringLamp x={775} y={115} />

      {/* Counter / Stall surface */}
      <rect x="80" y="360" width="840" height="65" rx="4" fill="#7b5236" stroke="#5a3520" strokeWidth="3" />
      <rect x="85" y="363" width="830" height="38" rx="2" fill="#8b6246" />
      <rect x="85" y="401" width="830" height="6" fill="#5a3520" />
      {/* Hindi text on counter */}
      <text x="500" y="388" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="16" fontFamily="serif">चाय • कॉफी • नाश्ता</text>

      {/* Steaming kettle + cups */}
      <g transform="translate(180, 310)">
        <ellipse cx="22" cy="36" rx="22" ry="16" fill="#777" stroke="#555" strokeWidth="2" />
        <rect x="4" y="22" width="38" height="18" rx="4" fill="#888" stroke="#666" strokeWidth="1.5" />
        <rect x="42" y="27" width="14" height="5" rx="2.5" fill="#666" />
        <SteamPuff x={14} y={22} delay={0} />
        <SteamPuff x={22} y={20} delay={0.8} />
        <SteamPuff x={30} y={22} delay={1.5} />
      </g>

      {/* Tea cups */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${300 + i * 50}, 320)`}>
          <rect x="0" y="0" width="22" height="16" rx="3" fill="#eee" stroke="#ccc" strokeWidth="1" />
          <rect x="22" y="4" width="7" height="5" rx="2" fill="#ccc" />
          <ellipse cx="11" cy="2" rx="9" ry="4" fill="#a0522d" opacity="0.8" />
        </g>
      ))}

      {/* Crowd silhouettes */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${680 + i * 55}, 270) scale(0.8)`} opacity="0.45">
          <circle cx="15" cy="0" r="8" fill="#5a3520" />
          <rect x="8" y="8" width="14" height="30" rx="4" fill="#4a2a15" />
          <animateTransform attributeName="transform" type="translate" values={`${680 + i * 55},270 0,0;${680 + i * 55},265 0,0;${680 + i * 55},270 0,0`} dur={`${3 + i}s`} repeatCount="indefinite" />
        </g>
      ))}
    </g>
  );
}

function CorridorScene({ colors }) {
  return (
    <g>
      {/* Back wall deep */}
      <rect x="300" y="80" width="400" height="340" fill={colors.wall} opacity="0.7" />

      {/* Vanishing-point corridor walls */}
      <polygon points="0,80 300,80 300,420 0,650" fill={colors.wall} opacity="0.5" />
      <polygon points="1000,80 700,80 700,420 1000,650" fill={colors.wall} opacity="0.5" />

      {/* Perspective floor tiles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <polygon key={i}
          points={`${i * 200},650 ${100 + i * 125},420 ${100 + (i + 1) * 125},420 ${(i + 1) * 200},650`}
          fill={i % 2 === 0 ? '#a09078' : '#b0a088'}
          opacity="0.9"
        />
      ))}

      {/* Arched doorways in perspective */}
      <path d="M300,80 Q300,40 350,40 L650,40 Q700,40 700,80 L700,420 L300,420 Z" fill="none" stroke="rgba(120,100,80,0.4)" strokeWidth="8" />

      {/* Wall lamps */}
      <FlickeringLamp x={200} y={160} />
      <FlickeringLamp x={800} y={160} />

      {/* Pillars */}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i === 0 ? 260 : 720}, 80)`}>
          <rect x="-12" y="0" width="24" height="340" rx="3" fill="#a0906a" stroke="#8b7b6b" strokeWidth="1.5" />
          <rect x="-18" y="0" width="36" height="12" fill="#8b7b6b" />
          <rect x="-18" y="328" width="36" height="12" fill="#8b7b6b" />
        </g>
      ))}

      {/* Notice board */}
      <rect x="310" y="110" width="100" height="80" rx="2" fill="#8b6914" stroke="#6b4f10" strokeWidth="2" />
      <rect x="315" y="115" width="90" height="70" fill="#d4a574" />
      <rect x="320" y="120" width="38" height="28" fill="#f5f0e6" transform="rotate(-2 339 134)" />
      <circle cx="339" cy="122" r="2" fill="#e44" />

      {/* Depth shadow at far end */}
      <rect x="350" y="80" width="300" height="340" fill="rgba(0,0,0,0.18)" />

      {/* Light beam from far end */}
      <polygon points="450,250 550,250 580,420 420,420" fill="rgba(255,250,200,0.05)" />
    </g>
  );
}

function GateScene({ colors }) {
  return (
    <g>
      {/* Open sky + nature */}
      <SwayingTree x={100} y={280} scale={1.4} />
      <SwayingTree x={850} y={260} scale={1.2} />
      <SwayingTree x={950} y={300} scale={0.9} />
      <SwayingTree x={30} y={310} scale={0.8} />

      {/* School boundary wall */}
      <rect x="0" y="280" width="320" height="140" fill="#c8a888" stroke="#a89878" strokeWidth="2" />
      <rect x="680" y="280" width="320" height="140" fill="#c8a888" stroke="#a89878" strokeWidth="2" />
      {/* Wall crenellations */}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={i * 38} y="265" width="25" height="20" fill="#c8a888" rx="2" />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={700 + i * 38} y="265" width="25" height="20" fill="#c8a888" rx="2" />
      ))}

      {/* Gate pillars */}
      <rect x="300" y="140" width="40" height="260" fill="#8b7b6b" stroke="#6b5b4b" strokeWidth="2" rx="3" />
      <rect x="660" y="140" width="40" height="260" fill="#8b7b6b" stroke="#6b5b4b" strokeWidth="2" rx="3" />
      {/* Pillar tops */}
      <ellipse cx="320" cy="138" rx="24" ry="10" fill="#a09080" />
      <ellipse cx="680" cy="138" rx="24" ry="10" fill="#a09080" />

      {/* Gate signboard */}
      <rect x="310" y="100" width="380" height="50" rx="4" fill="#5a3520" />
      <text x="500" y="133" textAnchor="middle" fill="#d4a574" fontSize="22" fontWeight="bold" fontFamily="serif">विद्यालय</text>

      {/* Iron gate bars */}
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i} transform={`translate(${340 + i * 32}, 148)`}>
          <rect x="0" y="0" width="6" height="240" fill="#4a4a5a" rx="2" />
          <polygon points="0,0 3,-12 6,0" fill="#3a3a4a" />
        </g>
      ))}
      {/* Horizontal gate rails */}
      <rect x="340" y="170" width="320" height="8" rx="2" fill="#5a5a6a" />
      <rect x="340" y="300" width="320" height="8" rx="2" fill="#5a5a6a" />

      {/* Birds flying */}
      <Bird x={400} y={80} delay={0} />
      <Bird x={450} y={65} delay={1.5} />
      <Bird x={500} y={75} delay={3} />
    </g>
  );
}

function SchoolyardScene({ colors }) {
  return (
    <g>
      {/* Multiple trees */}
      <SwayingTree x={80} y={250} scale={1.5} />
      <SwayingTree x={220} y={280} scale={1.0} />
      <SwayingTree x={780} y={260} scale={1.3} />
      <SwayingTree x={900} y={290} scale={0.9} />

      {/* School building in background */}
      <rect x="350" y="120" width="300" height="300" fill="#c8b898" opacity="0.7" />
      {/* Building windows */}
      {[0, 1, 2].map((col) =>
        [0, 1, 2].map((row) => (
          <rect key={`${col}-${row}`} x={370 + col * 90} y={145 + row * 80} width="55" height="50" rx="3" fill="rgba(135,206,235,0.4)" stroke="#8b7b6b" strokeWidth="2" />
        ))
      )}
      {/* Building entrance */}
      <rect x="440" y="340" width="120" height="80" rx="4" fill="#8b7b6b" />
      <path d="M440,370 Q500,330 560,370" fill="none" stroke="#6b5b4b" strokeWidth="3" />

      {/* Flag pole */}
      <rect x="497" y="60" width="6" height="140" fill="#888" />
      <rect x="503" y="60" width="50" height="30" fill="#ff9933" opacity="0.9">
        <animate attributeName="d" values="M503,60 L553,60 L553,90 L503,90;M503,60 L555,63 L553,90 L503,87;M503,60 L553,60 L553,90 L503,90" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="503" y="90" width="50" height="30" fill="white" opacity="0.9" />
      <rect x="503" y="120" width="50" height="30" fill="#138808" opacity="0.9" />

      {/* Playground equipment */}
      {/* Slide */}
      <rect x="100" y="360" width="8" height="70" fill="#888" />
      <rect x="180" y="360" width="8" height="70" fill="#888" />
      <rect x="100" y="358" width="88" height="8" fill="#888" />
      <line x1="100" y1="358" x2="180" y2="420" stroke="#e44" strokeWidth="10" strokeLinecap="round" />

      {/* Children silhouettes playing */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${680 + i * 60}, 390)`} opacity="0.5">
          <circle cx="8" cy="-8" r="7" fill="#5a3520" />
          <rect x="2" y="0" width="12" height="22" rx="3" fill="#4a2a15" />
        </g>
      ))}

      {/* Birds */}
      <Bird x={300} y={100} delay={0} />
      <Bird x={360} y={85} delay={2} />
    </g>
  );
}

function StaffroomScene({ colors }) {
  return (
    <g>
      {/* Back wall */}
      <rect x="0" y="70" width="1000" height="350" fill={colors.wall} opacity="0.55" />
      <rect x="0" y="70" width="1000" height="350" fill="url(#wall-shading-cls)" />
      <line x1="0" y1="420" x2="1000" y2="420" stroke="rgba(0,0,0,0.2)" strokeWidth="4" />

      {/* Large window */}
      <g transform="translate(50, 90)">
        <rect x="0" y="0" width="200" height="220" rx="4" fill="rgba(135,206,235,0.3)" stroke="#8b7b6b" strokeWidth="5" />
        <line x1="100" y1="0" x2="100" y2="220" stroke="#8b7b6b" strokeWidth="3" />
        <line x1="0" y1="110" x2="200" y2="110" stroke="#8b7b6b" strokeWidth="3" />
        {/* Venetian blinds */}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1="5" y1={i * 13 + 6} x2="195" y2={i * 13 + 6} stroke="rgba(200,185,150,0.5)" strokeWidth="3" />
        ))}
        <SwayingTree x={80} y={50} scale={0.4} />
      </g>

      {/* India map / wall decoration */}
      <rect x="700" y="90" width="230" height="180" rx="3" fill="#1a5276" opacity="0.85" />
      <text x="815" y="120" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="12" fontWeight="bold">INDIA</text>
      {/* Simplified map outline */}
      <path d="M730,130 Q760,125 800,135 Q840,130 870,145 Q885,175 870,210 Q840,235 800,240 Q760,235 740,210 Q720,180 730,130 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <circle cx="790" cy="175" r="4" fill="rgba(255,100,100,0.8)" />
      <text x="790" y="165" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="8">Delhi</text>

      {/* Teacher's large desk */}
      <rect x="230" y="330" width="540" height="90" rx="4" fill="#6b4226" stroke="#5a3520" strokeWidth="2" />
      <rect x="235" y="333" width="530" height="52" rx="3" fill="#7b5236" />
      {/* Papers on desk */}
      <rect x="260" y="338" width="120" height="42" rx="2" fill="#f5f0e6" transform="rotate(-2 320 359)" />
      <rect x="310" y="340" width="100" height="40" rx="2" fill="#fff8e1" transform="rotate(3 360 360)" />
      <rect x="230" y="405" width="30" height="35" fill="#5a3520" />
      <rect x="720" y="405" width="30" height="35" fill="#5a3520" />

      {/* Name plate */}
      <rect x="470" y="345" width="90" height="22" rx="2" fill="#d4a017" />
      <text x="515" y="360" textAnchor="middle" fill="#5a3520" fontSize="9" fontWeight="bold">PRINCIPAL</text>

      {/* Bookshelf */}
      <rect x="830" y="90" width="150" height="330" rx="3" fill="#5a3520" stroke="#4a2510" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="838" y={100 + i * 62} width="134" height="3" fill="#4a2510" />
      ))}
      {/* Book spines */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect key={`${row}-${col}`}
            x={842 + col * 32}
            y={104 + row * 62}
            width="28"
            height="55"
            rx="2"
            fill={['#c0392b', '#2e86c1', '#27ae60', '#8e44ad'][col]}
            opacity="0.8"
          />
        ))
      )}

      {/* Dust motes */}
      {[0, 1, 2].map((i) => (
        <DustMote key={i} x={130 + i * 40} y={220 + i * 15} delay={i * 1.8} />
      ))}
    </g>
  );
}

function StreetScene({ colors }) {
  return (
    <g>
      {/* Buildings both sides */}
      <rect x="0" y="100" width="180" height="320" fill="#c8a070" opacity="0.65" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={15} y={115 + i * 80} width="50" height="45" rx="3" fill="rgba(135,206,235,0.35)" stroke="#8b7b6b" strokeWidth="2" />
      ))}
      <rect x="820" y="90" width="180" height="330" fill="#b8906a" opacity="0.65" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={835} y={105 + i * 80} width="50" height="45" rx="3" fill="rgba(135,206,235,0.3)" stroke="#8b7b6b" strokeWidth="2" />
      ))}

      {/* Trees lining road */}
      <SwayingTree x={200} y={290} scale={1.1} />
      <SwayingTree x={750} y={280} scale={1.0} />

      {/* Road surface */}
      <polygon points="100,650 900,650 780,420 220,420" fill="#7a7a7a" opacity="0.85" />
      {/* Road markings */}
      {[0, 1, 2].map((i) => (
        <polygon key={i}
          points={`475 + ${i * 5 - 5},${420 + i * 60} ${525 + i * 5 - 5},${420 + i * 60} ${520},${460 + i * 60} ${480},${460 + i * 60}`}
          fill="rgba(255,255,255,0.25)"
        />
      ))}

      {/* Bus stand */}
      <rect x="160" y="310" width="70" height="110" rx="2" fill="#1a5276" opacity="0.85" />
      <rect x="160" y="310" width="70" height="20" fill="#154360" />
      <text x="195" y="325" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">BUS STOP</text>
      <rect x="228" y="330" width="6" height="90" fill="#888" />

      {/* Cycle rickshaw silhouette animating across road */}
      <g opacity="0.55">
        <ellipse cx="680" cy="430" rx="22" ry="22" fill="none" stroke="#333" strokeWidth="4">
          <animateTransform attributeName="transform" type="translate" from="0 0" to="-400 0" dur="12s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="730" cy="430" rx="22" ry="22" fill="none" stroke="#333" strokeWidth="4">
          <animateTransform attributeName="transform" type="translate" from="0 0" to="-400 0" dur="12s" repeatCount="indefinite" />
        </ellipse>
        <g>
          <animateTransform attributeName="transform" type="translate" from="0 0" to="-400 0" dur="12s" repeatCount="indefinite" />
          <rect x="648" y="385" width="120" height="45" rx="8" fill="#c0392b" opacity="0.75" />
          <rect x="695" y="370" width="50" height="20" rx="5" fill="#922b21" opacity="0.75" />
        </g>
      </g>

      {/* Pedestrian crowd */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${400 + i * 60}, 380)`} opacity="0.45">
          <circle cx="8" cy="-8" r="7" fill={['#5a3520', '#4a3a2a', '#6b4226', '#7b5236'][i]} />
          <rect x="2" y="0" width="12" height="25" rx="3" fill={['#1a5276', '#c0392b', '#27ae60', '#8b4513'][i]} />
          <animate attributeName="transform" values={`translate(${400 + i * 60}, 380);translate(${408 + i * 60}, 375);translate(${400 + i * 60}, 380)`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
        </g>
      ))}
    </g>
  );
}

function NobodyScene({ colors }) {
  return (
    <g>
      {/* Generic room */}
      <rect x="0" y="80" width="1000" height="340" fill={colors.wall} opacity="0.5" />
      <rect x="0" y="80" width="1000" height="340" fill="url(#wall-shading-cls)" />
      <line x1="0" y1="420" x2="1000" y2="420" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />
      <g transform="translate(640, 100)">
        <rect x="0" y="0" width="280" height="200" rx="6" fill="rgba(135,206,235,0.28)" stroke="#8b7b6b" strokeWidth="5" />
        <line x1="140" y1="0" x2="140" y2="200" stroke="#8b7b6b" strokeWidth="3" />
        <line x1="0" y1="100" x2="280" y2="100" stroke="#8b7b6b" strokeWidth="3" />
      </g>
    </g>
  );
}

// ── Main Export ──

export default function SceneBackground({
  location = 'classroom',
  timeOfDay = 'day',
  sceneObjects = [],
  mood = 'neutral',
}) {
  const locData = LOCATIONS[location] || LOCATIONS.classroom;
  const colors = locData[timeOfDay] || locData.day || LOCATIONS.default.day;

  const moodOverlayColor = {
    neutral: 'transparent',
    worried: 'rgba(20, 30, 70, 0.28)',
    hopeful: 'rgba(245, 200, 66, 0.09)',
    happy: 'rgba(245, 200, 66, 0.13)',
    sad: 'rgba(20, 20, 55, 0.38)',
    tense: 'rgba(80, 10, 10, 0.22)',
    relieved: 'rgba(30, 130, 80, 0.1)',
  }[mood] || 'transparent';

  const isEvening = timeOfDay === 'evening';
  const isDusk = timeOfDay === 'dusk';

  const gradId = `bg-grad-${location}-${timeOfDay}`;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      <svg
        viewBox="0 0 1000 650"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.sky} />
            <stop offset="45%" stopColor={colors.mid} />
            <stop offset="100%" stopColor={colors.ground} />
          </linearGradient>
          <linearGradient id="wall-shading-cls" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.02)" />
          </linearGradient>
          <radialGradient id="sun-glow" cx="70%" cy="15%" r="35%">
            <stop offset="0%" stopColor={isDusk ? 'rgba(255,140,50,0.25)' : 'rgba(255,250,200,0.18)'} />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="moon-glow" cx="80%" cy="12%" r="20%">
            <stop offset="0%" stopColor="rgba(200,220,255,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* ── LAYER 1: SKY BACKDROP ── */}
        <rect width="1000" height="650" fill={`url(#${gradId})`} />

        {/* Ambient sun/moon light */}
        {!isEvening && <rect width="1000" height="650" fill="url(#sun-glow)" />}
        {isEvening && <rect width="1000" height="650" fill="url(#moon-glow)" />}

        {/* ── LAYER 2: SKY ELEMENTS ── */}
        {/* Stars at evening */}
        {isEvening && (
          <g>
            {[
              [80, 30, 1.5, 0], [200, 15, 1, 0.5], [350, 40, 1.8, 1.1],
              [480, 20, 1.2, 0.3], [600, 35, 1.5, 0.8], [720, 18, 1, 1.5],
              [860, 28, 1.7, 0.2], [940, 45, 1.3, 0.9], [150, 55, 1, 1.3],
              [500, 55, 1.4, 0.6], [750, 50, 1.2, 1.2], [300, 25, 1.6, 0.4],
            ].map(([x, y, r, d], i) => (
              <Star key={i} x={x} y={y} r={r} delay={d} />
            ))}
            {/* Moon */}
            <circle cx="820" cy="55" r="32" fill="rgba(220,230,255,0.9)" />
            <circle cx="835" cy="48" r="28" fill={colors.sky} opacity="0.95" />
          </g>
        )}

        {/* Sun at day/dusk */}
        {!isEvening && (
          <g>
            <circle cx={isDusk ? 850 : 760} cy={isDusk ? 120 : 80} r={isDusk ? 45 : 38}
              fill={isDusk ? 'rgba(255,120,30,0.85)' : 'rgba(255,235,100,0.9)'} />
            <circle cx={isDusk ? 850 : 760} cy={isDusk ? 120 : 80} r={isDusk ? 60 : 55}
              fill={isDusk ? 'rgba(255,120,30,0.12)' : 'rgba(255,240,150,0.12)'} />
          </g>
        )}

        {/* Clouds — only at day/dusk */}
        {!isEvening && (
          <g>
            <Cloud x={100} y={55} w={75} opacity={0.7} speed={120} id={1} />
            <Cloud x={400} y={40} w={55} opacity={0.55} speed={80} id={2} />
            <Cloud x={650} y={65} w={90} opacity={0.65} speed={-100} id={3} />
            <Cloud x={900} y={45} w={60} opacity={0.5} speed={90} id={4} />
          </g>
        )}

        {/* ── LAYER 3: LOCATION-SPECIFIC ART ── */}
        {location === 'classroom' && <ClassroomScene colors={colors} />}
        {location === 'teastall' && <TeaStallScene colors={colors} />}
        {location === 'corridor' && <CorridorScene colors={colors} />}
        {location === 'gate' && <GateScene colors={colors} />}
        {(location === 'schoolyard' || location === 'noticeboard') && <SchoolyardScene colors={colors} />}
        {location === 'staffroom' && <StaffroomScene colors={colors} />}
        {location === 'street' && <StreetScene colors={colors} />}
        {!['classroom', 'teastall', 'corridor', 'gate', 'schoolyard', 'noticeboard', 'staffroom', 'street'].includes(location) && (
          <NobodyScene colors={colors} />
        )}

        {/* ── LAYER 4: FLOOR WITH PERSPECTIVE ── */}
        <polygon points="0,420 1000,420 1000,650 0,650" fill={colors.ground} opacity="0.95" />
        {/* Floor perspective tiles */}
        <line x1="0" y1="420" x2="0" y2="650" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
        <line x1="250" y1="420" x2="130" y2="650" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" />
        <line x1="500" y1="420" x2="500" y2="650" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" />
        <line x1="750" y1="420" x2="870" y2="650" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" />
        <line x1="1000" y1="420" x2="1000" y2="650" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
        {/* Baseboard shadow */}
        <rect x="0" y="420" width="1000" height="14" fill="rgba(0,0,0,0.2)" />

        {/* ── LAYER 5: CHARACTER FLOOR SHADOWS ── */}
        <ellipse cx="215" cy="512" rx="50" ry="13" fill="rgba(0,0,0,0.3)" />
        <ellipse cx="785" cy="508" rx="46" ry="12" fill="rgba(0,0,0,0.3)" />
      </svg>

      {/* Mood colour-grade overlay */}
      <div
        className="absolute inset-0 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: moodOverlayColor }}
      />

      {/* Evening vignette */}
      {isEvening && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(10,5,25,0.55) 100%)',
          }}
        />
      )}
    </div>
  );
}
