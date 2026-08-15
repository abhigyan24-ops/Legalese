/**
 * Scene Props Library — Comprehensive SVG graphical props for Rights Quest
 * Rich, stylized, lightweight vector illustrations matching the educational narrative scenes.
 */

export const SCENE_PROPS = {
  // ── CLASSROOM & SCHOOL ──
  emptyDesk: ({ x = 0, y = 0, scale = 1, highlight = false }) => {
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        {highlight && (
          <rect x="-2" y="-2" width="84" height="54" rx="4" fill="none" stroke="#F5B942" strokeWidth="2" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </rect>
        )}
        <rect x="0" y="0" width="80" height="50" rx="3" fill="#5a4a3a" stroke="#4a3a2a" strokeWidth="1.5" />
        <rect x="5" y="2" width="70" height="30" rx="2" fill="#6b5b4b" />
        <rect x="10" y="35" width="8" height="18" fill="#4a3a2a" />
        <rect x="62" y="35" width="8" height="18" fill="#4a3a2a" />
      </g>
    );
  },

  deskRow: ({ x = 0, y = 0, scale = 1, count = 4 }) => {
    const desks = [];
    for (let i = 0; i < count; i++) {
      desks.push(
        <g key={i} transform={`translate(${i * 90}, 0)`}>
          <rect x="0" y="0" width="80" height="50" rx="3" fill="#5a4a3a" stroke="#4a3a2a" strokeWidth="1.5" />
          <rect x="5" y="2" width="70" height="30" rx="2" fill="#6b5b4b" />
          <rect x="10" y="35" width="8" height="18" fill="#4a3a2a" />
          <rect x="62" y="35" width="8" height="18" fill="#4a3a2a" />
        </g>
      );
    }
    return <g transform={`translate(${x}, ${y}) scale(${scale})`}>{desks}</g>;
  },

  filledDesk: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="80" height="50" rx="3" fill="#5a4a3a" stroke="#4a3a2a" strokeWidth="1.5" />
      <rect x="5" y="2" width="70" height="30" rx="2" fill="#6b5b4b" />
      <rect x="15" y="6" width="30" height="20" rx="2" fill="#e8d5b0" opacity="0.7" />
      <rect x="50" y="10" width="12" height="15" rx="1" fill="#4a8b5c" />
      <rect x="10" y="35" width="8" height="18" fill="#4a3a2a" />
      <rect x="62" y="35" width="8" height="18" fill="#4a3a2a" />
    </g>
  ),

  schoolBell: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="8" y="0" width="4" height="15" fill="#888" />
      <ellipse cx="10" cy="25" rx="12" ry="10" fill="#d4a017" stroke="#b8860b" strokeWidth="1" />
      <circle cx="10" cy="33" r="2.5" fill="#b8860b" />
      <line x1="10" y1="25" x2="10" y2="30" stroke="#8b6914" strokeWidth="1.5" />
    </g>
  ),

  classroomWindow: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="70" height="55" rx="3" fill="#87CEEB" opacity="0.35" stroke="#8b7b6b" strokeWidth="2" />
      <line x1="35" y1="0" x2="35" y2="55" stroke="#8b7b6b" strokeWidth="1.5" />
      <line x1="0" y1="27" x2="70" y2="27" stroke="#8b7b6b" strokeWidth="1.5" />
      <rect x="3" y="3" width="30" height="22" fill="rgba(135,206,235,0.2)" />
      <circle cx="50" cy="14" r="8" fill="#FFD700" opacity="0.25" />
    </g>
  ),

  wallClock: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="20" cy="20" r="20" fill="#f5f0e6" stroke="#5a4a3a" strokeWidth="2" />
      <circle cx="20" cy="20" r="17" fill="none" stroke="#d4c5a9" strokeWidth="0.5" />
      <line x1="20" y1="20" x2="20" y2="8" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="20" x2="28" y2="24" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2" fill="#333" />
    </g>
  ),

  blackboard: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="200" height="100" rx="3" fill="#2d5a27" stroke="#5a4a3a" strokeWidth="3" />
      <rect x="8" y="8" width="184" height="84" fill="#346b2e" />
      <text x="100" y="40" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="serif">अ आ इ ई</text>
      <text x="100" y="60" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="serif">2 + 3 = 5</text>
      <rect x="80" y="96" width="40" height="6" rx="2" fill="#8b7b6b" />
    </g>
  ),

  teacherDesk: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="100" height="55" rx="3" fill="#6b4226" stroke="#5a3520" strokeWidth="1.5" />
      <rect x="5" y="3" width="90" height="32" rx="2" fill="#7b5236" />
      <rect x="10" y="8" width="35" height="22" rx="2" fill="#e8d5b0" opacity="0.6" />
      <circle cx="70" cy="18" r="5" fill="#666" opacity="0.5" />
      <rect x="60" y="10" width="3" height="18" fill="#333" opacity="0.5" />
      <rect x="10" y="40" width="8" height="20" fill="#5a3520" />
      <rect x="82" y="40" width="8" height="20" fill="#5a3520" />
    </g>
  ),

  attendanceRegister: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="50" height="35" rx="2" fill="#d4a574" stroke="#8b6914" strokeWidth="1" />
      <rect x="3" y="3" width="44" height="29" fill="#f5e6cc" />
      <line x1="8" y1="10" x2="42" y2="10" stroke="#999" strokeWidth="0.5" />
      <line x1="8" y1="16" x2="42" y2="16" stroke="#999" strokeWidth="0.5" />
      <line x1="8" y1="22" x2="42" y2="22" stroke="#999" strokeWidth="0.5" />
      <text x="12" y="15" fill="#c44" fontSize="6" fontWeight="bold">✗ absent</text>
      <text x="12" y="21" fill="#c44" fontSize="6" fontWeight="bold">✗ absent</text>
      <text x="12" y="27" fill="#c44" fontSize="6" fontWeight="bold">✗ absent</text>
    </g>
  ),

  calendarPage: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="40" height="45" rx="2" fill="#fff" stroke="#ccc" strokeWidth="1" />
      <rect x="0" y="0" width="40" height="12" rx="2" fill="#e44" />
      <text x="20" y="10" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">MON</text>
      <text x="20" y="32" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">14</text>
      <line x1="5" y1="38" x2="35" y2="38" stroke="#ddd" strokeWidth="0.5" />
    </g>
  ),

  // ── TEA STALL & STREET ──
  teaStallCounter: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="180" height="60" rx="3" fill="#7b5236" stroke="#5a3520" strokeWidth="2" />
      <rect x="5" y="3" width="170" height="35" rx="2" fill="#8b6246" />
      <rect x="0" y="60" width="180" height="5" fill="#5a3520" />
      <rect x="10" y="65" width="15" height="25" fill="#5a3520" />
      <rect x="155" y="65" width="15" height="25" fill="#5a3520" />
      <text x="90" y="22" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="11" fontFamily="serif">चाय</text>
    </g>
  ),

  kettleSteaming: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="18" cy="30" rx="18" ry="14" fill="#888" stroke="#666" strokeWidth="1.5" />
      <rect x="2" y="16" width="32" height="16" rx="3" fill="#999" stroke="#777" strokeWidth="1" />
      <rect x="34" y="20" width="10" height="4" rx="2" fill="#777" />
      <path d="M10 14 Q8 6 12 0" stroke="rgba(255,255,255,0.45)" fill="none" strokeWidth="1.5">
        <animate attributeName="d" values="M10 14 Q8 6 12 0;M10 14 Q14 6 10 0;M10 14 Q8 6 12 0" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M20 14 Q18 4 22 -2" stroke="rgba(255,255,255,0.35)" fill="none" strokeWidth="1.5">
        <animate attributeName="d" values="M20 14 Q18 4 22 -2;M20 14 Q24 4 20 -2;M20 14 Q18 4 22 -2" dur="2.5s" repeatCount="indefinite" />
      </path>
    </g>
  ),

  teaCups: ({ x = 0, y = 0, scale = 1, count = 3 }) => {
    const cups = [];
    for (let i = 0; i < count; i++) {
      const cx = i * 22;
      cups.push(
        <g key={i} transform={`translate(${cx}, 0)`}>
          <ellipse cx="8" cy="12" rx="8" ry="5" fill="#ddd" stroke="#bbb" strokeWidth="1" />
          <rect x="1" y="7" width="14" height="8" rx="2" fill="#eee" stroke="#ccc" strokeWidth="0.8" />
          <rect x="15" y="9" width="5" height="3" rx="1.5" fill="#ccc" />
          <ellipse cx="8" cy="8" rx="6" ry="3" fill="#a0522d" opacity="0.7" />
        </g>
      );
    }
    return <g transform={`translate(${x}, ${y}) scale(${scale})`}>{cups}</g>;
  },

  stool: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="18" cy="0" rx="18" ry="5" fill="#8b6914" stroke="#6b4f10" strokeWidth="1" />
      <line x1="5" y1="3" x2="3" y2="30" stroke="#6b4f10" strokeWidth="2.5" />
      <line x1="31" y1="3" x2="33" y2="30" stroke="#6b4f10" strokeWidth="2.5" />
      <line x1="18" y1="5" x2="18" y2="30" stroke="#6b4f10" strokeWidth="2" />
    </g>
  ),

  emptyStool: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity="0.5">
      <ellipse cx="18" cy="0" rx="18" ry="5" fill="#8b6914" stroke="#6b4f10" strokeWidth="1" />
      <line x1="5" y1="3" x2="3" y2="30" stroke="#6b4f10" strokeWidth="2.5" />
      <line x1="31" y1="3" x2="33" y2="30" stroke="#6b4f10" strokeWidth="2.5" />
      <line x1="18" y1="5" x2="18" y2="30" stroke="#6b4f10" strokeWidth="2" />
    </g>
  ),

  twoRags: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="22" height="16" rx="2" fill="#8fbc8f" opacity="0.75" transform="rotate(-8 11 8)" />
      <rect x="18" y="4" width="22" height="16" rx="2" fill="#b0c4de" opacity="0.75" transform="rotate(5 29 12)" />
    </g>
  ),

  dustCue: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity="0.4">
      <circle cx="0" cy="0" r="3" fill="#a0906a">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="15" cy="-5" r="2" fill="#a0906a">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="8" cy="8" r="2.5" fill="#a0906a">
        <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3.5s" repeatCount="indefinite" />
      </circle>
    </g>
  ),

  // ── SCHOOLYARD, CORRIDOR, GATES & COMMITTEES ──
  busStandSign: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="12" y="0" width="4" height="50" fill="#777" />
      <rect x="0" y="0" width="28" height="18" rx="2" fill="#1a5276" stroke="#154360" strokeWidth="1" />
      <text x="14" y="8" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="bold">BUS</text>
      <text x="14" y="14" textAnchor="middle" fill="#fff" fontSize="4">STAND →</text>
    </g>
  ),

  corridorPillars: ({ x = 0, y = 0, scale = 1, count = 3 }) => {
    const pillars = [];
    for (let i = 0; i < count; i++) {
      const px = i * 70;
      pillars.push(
        <g key={i} transform={`translate(${px}, 0)`}>
          <rect x="0" y="0" width="18" height="120" rx="2" fill="#a0906a" stroke="#8b7b6b" strokeWidth="1" />
          <rect x="-4" y="0" width="26" height="8" fill="#8b7b6b" />
          <rect x="-4" y="112" width="26" height="8" fill="#8b7b6b" />
        </g>
      );
    }
    return <g transform={`translate(${x}, ${y}) scale(${scale})`}>{pillars}</g>;
  },

  schoolGate: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="12" height="100" fill="#5a4a3a" />
      <rect x="88" y="0" width="12" height="100" fill="#5a4a3a" />
      <rect x="0" y="0" width="100" height="14" rx="2" fill="#6b5b4b" />
      <text x="50" y="11" textAnchor="middle" fill="#d4a574" fontSize="7" fontWeight="bold" fontFamily="serif">विद्यालय</text>
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={14 + i * 13} y="14" width="4" height="86" fill="#5a4a3a" rx="1" />
      ))}
    </g>
  ),

  schoolGateClosed: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="12" height="100" fill="#5a4a3a" />
      <rect x="88" y="0" width="12" height="100" fill="#5a4a3a" />
      <rect x="0" y="0" width="100" height="14" rx="2" fill="#6b5b4b" />
      <text x="50" y="11" textAnchor="middle" fill="#d4a574" fontSize="7" fontWeight="bold" fontFamily="serif">विद्यालय</text>
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={14 + i * 13} y="14" width="4" height="86" fill="#5a4a3a" rx="1" />
      ))}
      <line x1="20" y1="30" x2="80" y2="30" stroke="#8b0000" strokeWidth="2.5" />
      <rect x="44" y="50" width="12" height="8" rx="2" fill="#888" stroke="#666" strokeWidth="1" />
    </g>
  ),

  noticeBoard: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="80" height="65" rx="2" fill="#8b6914" stroke="#6b4f10" strokeWidth="2" />
      <rect x="5" y="5" width="70" height="55" fill="#d4a574" />
    </g>
  ),

  pinnedPaper: ({ x = 0, y = 0, scale = 1, text = 'Notice' }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="30" height="36" fill="#f5f0e6" transform="rotate(-3 15 18)" />
      <circle cx="15" cy="3" r="2.5" fill="#e44" />
      <text x="15" y="16" textAnchor="middle" fill="#333" fontSize="5" fontWeight="bold">{text}</text>
      <line x1="5" y1="22" x2="25" y2="22" stroke="#999" strokeWidth="0.4" />
      <line x1="5" y1="26" x2="25" y2="26" stroke="#999" strokeWidth="0.4" />
    </g>
  ),

  handwrittenNote: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="36" height="28" fill="#f5f0c8" rx="1" transform="rotate(5 18 14)" />
      <path d="M6 8 Q18 6 30 9" stroke="#334" fill="none" strokeWidth="0.6" />
      <path d="M6 13 Q18 11 28 14" stroke="#334" fill="none" strokeWidth="0.6" />
      <path d="M6 18 Q15 17 22 19" stroke="#334" fill="none" strokeWidth="0.6" />
    </g>
  ),

  bookStack: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="16" width="40" height="8" rx="1" fill="#2e86c1" stroke="#1a5276" strokeWidth="0.5" />
      <rect x="2" y="8" width="38" height="8" rx="1" fill="#c0392b" stroke="#922b21" strokeWidth="0.5" />
      <rect x="1" y="0" width="36" height="8" rx="1" fill="#27ae60" stroke="#1e8449" strokeWidth="0.5" />
    </g>
  ),

  oldTextbooks: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="12" width="36" height="7" rx="1" fill="#a0906a" stroke="#8b7b6b" strokeWidth="0.5" />
      <rect x="2" y="5" width="34" height="7" rx="1" fill="#b8a07a" stroke="#a0906a" strokeWidth="0.5" />
      <rect x="1" y="0" width="32" height="5" rx="1" fill="#c8b090" stroke="#a0906a" strokeWidth="0.5" />
      <text x="18" y="4" textAnchor="middle" fill="#666" fontSize="3.5">Hindi</text>
    </g>
  ),

  feeNoticePaper: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="40" height="50" fill="#f5f0e6" rx="1" stroke="#ccc" strokeWidth="0.5" />
      <text x="20" y="10" textAnchor="middle" fill="#c44" fontSize="5" fontWeight="bold">FEE DUE</text>
      <line x1="5" y1="16" x2="35" y2="16" stroke="#999" strokeWidth="0.4" />
      <text x="20" y="24" textAnchor="middle" fill="#333" fontSize="4">₹ 2,400</text>
      <line x1="5" y1="30" x2="35" y2="30" stroke="#999" strokeWidth="0.4" />
      <line x1="5" y1="35" x2="35" y2="35" stroke="#999" strokeWidth="0.4" />
      <text x="20" y="44" textAnchor="middle" fill="#c44" fontSize="4">OVERDUE</text>
    </g>
  ),

  rtePamphlet: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="42" height="54" fill="#fdf2d5" rx="2" stroke="#d4a017" strokeWidth="1" />
      <text x="21" y="12" textAnchor="middle" fill="#1a5276" fontSize="5" fontWeight="bold">RTE Act</text>
      <text x="21" y="20" textAnchor="middle" fill="#1a5276" fontSize="4">2009</text>
      <line x1="6" y1="24" x2="36" y2="24" stroke="#d4a017" strokeWidth="0.5" />
      <text x="21" y="32" textAnchor="middle" fill="#333" fontSize="3.5">Article</text>
      <text x="21" y="39" textAnchor="middle" fill="#c44" fontSize="7" fontWeight="bold">21-A</text>
      <text x="21" y="49" textAnchor="middle" fill="#333" fontSize="3">Free &amp; Compulsory</text>
    </g>
  ),

  committeeTable: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="160" height="45" rx="3" fill="#5a3520" stroke="#4a2510" strokeWidth="2" />
      <rect x="5" y="3" width="150" height="25" rx="2" fill="#6b4226" />
      <rect x="10" y="30" width="12" height="25" fill="#4a2510" />
      <rect x="138" y="30" width="12" height="25" fill="#4a2510" />
      <rect x="15" y="8" width="20" height="14" rx="1" fill="#e8d5b0" opacity="0.5" />
      <rect x="40" y="8" width="20" height="14" rx="1" fill="#e8d5b0" opacity="0.5" />
      <circle cx="80" cy="15" r="5" fill="#888" opacity="0.3" />
    </g>
  ),

  bench: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="70" height="10" rx="2" fill="#8b6914" stroke="#6b4f10" strokeWidth="1" />
      <rect x="5" y="10" width="6" height="18" fill="#6b4f10" />
      <rect x="59" y="10" width="6" height="18" fill="#6b4f10" />
    </g>
  ),

  notebooksOut: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="28" height="36" fill="#a0c4e8" rx="1" transform="rotate(-5 14 18)" />
      <rect x="16" y="2" width="28" height="36" fill="#f5c0c0" rx="1" transform="rotate(3 30 20)" />
      <path d="M4 10 L22 9" stroke="#334" strokeWidth="0.5" />
      <path d="M4 16 L20 15" stroke="#334" strokeWidth="0.5" />
      <circle cx="34" cy="14" r="3" fill="#ffd700" />
    </g>
  ),

  penProp: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="45" height="5" rx="1" fill="#1a5276" transform="rotate(-15 22 2)" />
      <polygon points="45,-1 50,2 45,5" fill="#d4a017" transform="rotate(-15 22 2)" />
    </g>
  ),

  seedlingPot: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="5" y="15" width="22" height="18" rx="2" fill="#a0522d" stroke="#8b4513" strokeWidth="1" />
      <ellipse cx="16" cy="16" rx="13" ry="3" fill="#6b3410" />
      <path d="M16 14 Q12 4 16 0" stroke="#27ae60" fill="none" strokeWidth="1.5" />
      <ellipse cx="16" cy="0" rx="5" ry="3" fill="#2ecc71" opacity="0.8" />
      <ellipse cx="12" cy="4" rx="4" ry="2.5" fill="#27ae60" opacity="0.7" transform="rotate(-20 12 4)" />
    </g>
  ),

  recedingTeaStall: ({ x = 0, y = 0, scale = 0.5 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity="0.4">
      <rect x="0" y="0" width="180" height="60" rx="3" fill="#7b5236" stroke="#5a3520" strokeWidth="2" />
      <rect x="5" y="3" width="170" height="35" rx="2" fill="#8b6246" />
    </g>
  ),

  teaStallFamilies: ({ x = 0, y = 0, scale = 1 }) => {
    const person = (px, py, c, key) => (
      <g key={key}>
        <circle cx={px} cy={py} r="5" fill={c} />
        <rect x={px - 3} y={py + 6} width="6" height="12" rx="2" fill={c} />
      </g>
    );
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity="0.55">
        {person(0, 0, '#7b5236', 1)}
        {person(16, 2, '#a0522d', 2)}
        {person(34, -1, '#6b4226', 3)}
        {person(48, 3, '#8b6246', 4)}
      </g>
    );
  },

  // ── GENERAL PROPS ──
  trophy: ({ x = 0, y = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <polygon points="50,15 56,30 70,30 58,40 63,55 50,47 37,55 42,40 30,30 34,30" fill="var(--color-accent, #F5B942)" stroke="#d4a017" strokeWidth="1" />
      <rect x="46" y="55" width="8" height="6" fill="#8b6914" rx="2" />
    </g>
  ),
};

// ── LOCATION BACKGROUND GRADIENTS ──
export const LOCATIONS = {
  classroom: {
    day:     { sky: '#87CEEB', mid: '#a8d8ea', ground: '#d4c5a9', wall: '#c8b898' },
    dusk:    { sky: '#e8a87c', mid: '#d4927a', ground: '#b8a088', wall: '#a89878' },
    evening: { sky: '#4a3f6b', mid: '#5a4a6b', ground: '#8b7b6b', wall: '#7b6b5b' }
  },
  schoolyard: {
    day:     { sky: '#87CEEB', mid: '#a0d8b0', ground: '#8fbc8f', wall: '#7aaa7a' },
    dusk:    { sky: '#e8a87c', mid: '#c8a870', ground: '#7b9b6b', wall: '#6b8b5b' }
  },
  teastall: {
    day:     { sky: '#87CEEB', mid: '#c8b898', ground: '#a0906a', wall: '#8b7b5b' },
    dusk:    { sky: '#d4927a', mid: '#b8906a', ground: '#8b7b5b', wall: '#7b6b4b' },
    evening: { sky: '#3a2f5b', mid: '#5a4a5b', ground: '#6b5b4b', wall: '#5b4b3b' }
  },
  corridor: {
    day:     { sky: '#87CEEB', mid: '#b8a888', ground: '#a09078', wall: '#8b7b6b' },
    evening: { sky: '#4a3f6b', mid: '#6b5b6b', ground: '#7b6b5b', wall: '#6b5b4b' }
  },
  noticeboard: {
    day:     { sky: '#87CEEB', mid: '#b8a888', ground: '#a09078', wall: '#8b7b6b' },
    evening: { sky: '#4a3f6b', mid: '#6b5b6b', ground: '#7b6b5b', wall: '#6b5b4b' }
  },
  gate: {
    day:     { sky: '#87CEEB', mid: '#a0d8b0', ground: '#8fbc8f', wall: '#7aaa7a' },
    dusk:    { sky: '#e8a87c', mid: '#c8a870', ground: '#7b9b6b', wall: '#6b8b5b' },
    evening: { sky: '#4a3f6b', mid: '#5a4a5b', ground: '#6b5b4b', wall: '#5b4b3b' }
  },
  street: {
    dusk:    { sky: '#d4927a', mid: '#b8906a', ground: '#8b7b5b', wall: '#7b6b4b' }
  },
  staffroom: {
    day:     { sky: '#87CEEB', mid: '#c8b898', ground: '#b8a888', wall: '#a89878' },
    dusk:    { sky: '#e8a87c', mid: '#b8906a', ground: '#a08868', wall: '#907858' }
  },
  default: {
    day:     { sky: '#87CEEB', mid: '#a8d8ea', ground: '#d4c5a9', wall: '#c8b898' },
  }
};
