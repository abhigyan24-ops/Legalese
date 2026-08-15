/**
 * CharacterAvatar.jsx
 * 
 * Expressive character SVG rendering engine.
 * Supports:
 * - Protagonist avatar (Kabir / Ananya / Custom) with moods (worried, hopeful, happy, sad, neutral) and poses (standing, walking, eavesdrop).
 * - Secondary NPCs (Meena, Aisha, Teacher, Father, etc.) with poses (wiping, seated, talking, standing).
 */

export function ProtagonistSprite({ gender = 'boy', mood = 'neutral', pose = 'standing' }) {
  const isBoy = gender === 'boy' || gender === 'kabir';
  const skin = '#d4a574';
  const hair = isBoy ? '#2c1810' : '#1a0f0a';
  const shirt = isBoy ? '#2e86c1' : '#e74c3c';
  const pants = isBoy ? '#34495e' : '#8e44ad';

  // Eyes & Mouth expressions
  let eyes = <ellipse rx="3" ry="3" fill="#222" />;
  let mouth = <path d="M-3 3 L3 3" stroke="#222" strokeWidth="1" />;

  switch (mood) {
    case 'worried':
      eyes = (
        <g>
          <ellipse rx="3" ry="2.5" fill="#222" />
          <line x1="-4" y1="-6" x2="4" y2="-4" stroke="#222" strokeWidth="0.8" />
        </g>
      );
      mouth = <path d="M-4 4 Q0 2 4 4" stroke="#222" fill="none" strokeWidth="1" />;
      break;
    case 'hopeful':
      eyes = (
        <g>
          <ellipse rx="3" ry="3" fill="#222" />
          <ellipse rx="1.5" ry="1.5" fill="#fff" cx="1" cy="-1" />
        </g>
      );
      mouth = <path d="M-4 3 Q0 6 4 3" stroke="#222" fill="none" strokeWidth="1" />;
      break;
    case 'happy':
      eyes = <path d="M-3 0 Q0 -4 3 0" stroke="#222" fill="none" strokeWidth="1.5" />;
      mouth = <path d="M-5 2 Q0 8 5 2" fill="#c0392b" opacity="0.7" />;
      break;
    case 'sad':
      eyes = (
        <g>
          <ellipse rx="3" ry="2" fill="#222" />
          <line x1="-4" y1="-3" x2="4" y2="-5" stroke="#222" strokeWidth="0.8" />
        </g>
      );
      mouth = <path d="M-4 5 Q0 2 4 5" stroke="#222" fill="none" strokeWidth="1" />;
      break;
    default:
      break;
  }

  // Hair
  const hairSvg = isBoy ? (
    <g>
      <ellipse cx="0" cy="-28" rx="18" ry="10" fill={hair} />
      <rect x="-16" y="-32" width="32" height="10" rx="5" fill={hair} />
    </g>
  ) : (
    <g>
      <ellipse cx="0" cy="-28" rx="18" ry="12" fill={hair} />
      <path d="M-17 -20 Q-22 0 -18 15" stroke={hair} fill="none" strokeWidth="5" />
      <path d="M17 -20 Q22 0 18 15" stroke={hair} fill="none" strokeWidth="5" />
    </g>
  );

  // Body pose
  let body = (
    <g>
      <rect x="-10" y="10" width="20" height="30" rx="4" fill={shirt} />
      <rect x="-8" y="40" width="7" height="25" rx="3" fill={pants} />
      <rect x="1" y="40" width="7" height="25" rx="3" fill={pants} />
      <rect x="-18" y="12" width="8" height="22" rx="3" fill={shirt} />
      <rect x="10" y="12" width="8" height="22" rx="3" fill={shirt} />
    </g>
  );

  if (pose === 'walking') {
    body = (
      <g>
        <rect x="-10" y="10" width="20" height="30" rx="4" fill={shirt} />
        <rect x="-8" y="40" width="7" height="25" rx="3" fill={pants} />
        <rect x="1" y="40" width="7" height="25" rx="3" fill={pants} transform="rotate(10 4 40)" />
        <rect x="-18" y="12" width="8" height="22" rx="3" fill={shirt} transform="rotate(-15 -14 12)" />
        <rect x="10" y="12" width="8" height="22" rx="3" fill={shirt} transform="rotate(20 14 12)" />
      </g>
    );
  } else if (pose === 'eavesdrop') {
    body = (
      <g>
        <rect x="-10" y="10" width="20" height="30" rx="4" fill={shirt} />
        <rect x="-8" y="40" width="7" height="25" rx="3" fill={pants} />
        <rect x="1" y="40" width="7" height="25" rx="3" fill={pants} />
        <rect x="-18" y="14" width="8" height="20" rx="3" fill={shirt} transform="rotate(-5 -14 14)" />
        <rect x="10" y="10" width="8" height="24" rx="3" fill={shirt} transform="rotate(30 14 10)" />
        <ellipse cx="22" cy="12" rx="5" ry="4" fill={skin} />
      </g>
    );
  }

  return (
    <svg viewBox="-26 -44 52 114" className="w-full h-full drop-shadow-md max-w-full max-h-full" preserveAspectRatio="xMidYMid meet">
      <g>
        {body}
        <circle cx="0" cy="-16" r="16" fill={skin} />
        {hairSvg}
        <g transform="translate(-6, -18)">{eyes}</g>
        <g transform="translate(6, -18)">{eyes}</g>
        <g transform="translate(0, -12)">{mouth}</g>
      </g>
    </svg>
  );
}

export function SecondarySprite({ id = 'meena', mood = 'neutral', pose = 'standing' }) {
  let skin = '#c49464';
  let hair = '#1a0f0a';
  let outfit = '#e67e22';

  if (id === 'meena') {
    skin = '#c49464';
    hair = '#0d0805';
    outfit = '#e67e22';
  } else if (id === 'aisha') {
    skin = '#d4a574';
    hair = '#2c1810';
    outfit = '#9b59b6';
  } else if (id === 'teacher' || id === 'counselor') {
    skin = '#c49464';
    hair = '#4a4a4a';
    outfit = '#27ae60';
  } else if (id === 'father' || id === 'parent') {
    skin = '#8b6f4e';
    hair = '#2c1810';
    outfit = '#7f8c8d';
  } else if (id === 'doctor') {
    skin = '#d4a574';
    hair = '#2c1810';
    outfit = '#0284c7';
  }

  let eyes = <ellipse rx="2.5" ry="2.5" fill="#222" />;
  let mouth = <path d="M-3 3 L3 3" stroke="#222" strokeWidth="0.8" />;

  switch (mood) {
    case 'worried':
      eyes = <ellipse rx="2.5" ry="2" fill="#222" />;
      mouth = <path d="M-3 4 Q0 2 3 4" stroke="#222" fill="none" strokeWidth="0.8" />;
      break;
    case 'hopeful':
      eyes = <ellipse rx="2.5" ry="2.5" fill="#222" />;
      mouth = <path d="M-3 3 Q0 5 3 3" stroke="#222" fill="none" strokeWidth="0.8" />;
      break;
    case 'happy':
      eyes = <path d="M-2.5 0 Q0 -3 2.5 0" stroke="#222" fill="none" strokeWidth="1.2" />;
      mouth = <path d="M-4 2 Q0 7 4 2" fill="#c0392b" opacity="0.6" />;
      break;
    case 'sad':
      eyes = <ellipse rx="2.5" ry="1.5" fill="#222" />;
      mouth = <path d="M-3 5 Q0 3 3 5" stroke="#222" fill="none" strokeWidth="0.8" />;
      break;
    case 'embarrassed':
      eyes = <ellipse rx="2.5" ry="2" fill="#222" />;
      mouth = <path d="M-2 4 Q0 3 2 4" stroke="#222" fill="none" strokeWidth="0.8" />;
      break;
    case 'concerned':
      eyes = (
        <g>
          <ellipse rx="2.5" ry="2" fill="#222" />
          <line x1="-3" y1="-5" x2="3" y2="-3" stroke="#222" strokeWidth="0.6" />
        </g>
      );
      mouth = <path d="M-3 4 Q0 2 3 4" stroke="#222" fill="none" strokeWidth="0.8" />;
      break;
    default:
      break;
  }

  const isAdult = id === 'teacher' || id === 'father' || id === 'parent' || id === 'doctor' || id === 'counselor';
  const hairSvg = isAdult ? (
    <g>
      <ellipse cx="0" cy="-24" rx="15" ry="8" fill={hair} />
      <rect x="-14" y="-28" width="28" height="8" rx="4" fill={hair} />
    </g>
  ) : (
    <g>
      <ellipse cx="0" cy="-24" rx="15" ry="10" fill={hair} />
      <path d="M-14 -17 Q-18 0 -15 12" stroke={hair} fill="none" strokeWidth="4" />
      <path d="M14 -17 Q18 0 15 12" stroke={hair} fill="none" strokeWidth="4" />
    </g>
  );

  let body = (
    <g>
      <rect x="-8" y="8" width="16" height="26" rx="3" fill={outfit} />
      <rect x="-7" y="34" width="6" height="22" rx="3" fill="#555" />
      <rect x="1" y="34" width="6" height="22" rx="3" fill="#555" />
      <rect x="-15" y="10" width="7" height="18" rx="3" fill={outfit} />
      <rect x="8" y="10" width="7" height="18" rx="3" fill={outfit} />
    </g>
  );

  if (pose === 'wiping') {
    body = (
      <g>
        <rect x="-8" y="8" width="16" height="26" rx="3" fill={outfit} />
        <rect x="-7" y="34" width="6" height="22" rx="3" fill="#555" />
        <rect x="1" y="34" width="6" height="22" rx="3" fill="#555" />
        <rect x="-15" y="10" width="7" height="20" rx="3" fill={outfit} transform="rotate(-25 -11 10)" />
        <rect x="8" y="8" width="7" height="20" rx="3" fill={outfit} transform="rotate(15 11 8)" />
      </g>
    );
  } else if (pose === 'seated') {
    body = (
      <g>
        <rect x="-8" y="8" width="16" height="26" rx="3" fill={outfit} />
        <rect x="-8" y="30" width="6" height="14" rx="3" fill="#555" transform="rotate(80 -5 30)" />
        <rect x="2" y="30" width="6" height="14" rx="3" fill="#555" transform="rotate(80 5 30)" />
        <rect x="-15" y="10" width="7" height="18" rx="3" fill={outfit} />
        <rect x="8" y="10" width="7" height="18" rx="3" fill={outfit} />
      </g>
    );
  } else if (pose === 'talking') {
    body = (
      <g>
        <rect x="-8" y="8" width="16" height="26" rx="3" fill={outfit} />
        <rect x="-7" y="34" width="6" height="22" rx="3" fill="#555" />
        <rect x="1" y="34" width="6" height="22" rx="3" fill="#555" />
        <rect x="-15" y="10" width="7" height="18" rx="3" fill={outfit} transform="rotate(-10 -11 10)" />
        <rect x="8" y="8" width="7" height="20" rx="3" fill={outfit} transform="rotate(25 11 8)" />
      </g>
    );
  }

  const blush = mood === 'embarrassed' ? (
    <g>
      <ellipse cx="-8" cy="-8" rx="4" ry="2" fill="#e8a0a0" opacity="0.5" />
      <ellipse cx="8" cy="-8" rx="4" ry="2" fill="#e8a0a0" opacity="0.5" />
    </g>
  ) : null;

  return (
    <svg viewBox="-20 -35 40 100" className="w-full h-full drop-shadow-lg overflow-visible">
      <g transform="scale(0.9)">
        {body}
        <circle cx="0" cy="-14" r="14" fill={skin} />
        {hairSvg}
        {blush}
        <g transform="translate(-5, -16)">{eyes}</g>
        <g transform="translate(5, -16)">{eyes}</g>
        <g transform="translate(0, -10)">{mouth}</g>
      </g>
    </svg>
  );
}

export default function CharacterAvatar({
  avatar = 'boy-short-blue-medium',
  mood = 'neutral',
  pose = 'standing',
  isHero = true,
  secondaryId = null,
  className = '',
}) {
  if (!isHero && secondaryId) {
    return (
      <div className={`w-20 h-28 ${className}`}>
        <SecondarySprite id={secondaryId} mood={mood} pose={pose} />
      </div>
    );
  }

  const gender = avatar.includes('girl') ? 'girl' : 'boy';
  return (
    <div className={`w-24 h-32 ${className}`}>
      <ProtagonistSprite gender={gender} mood={mood} pose={pose} />
    </div>
  );
}
