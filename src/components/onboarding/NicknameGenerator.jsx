/**
 * NicknameGenerator.jsx
 * 
 * Onboarding step 2 — auto-generates "AdjectiveAnimalNumber" nicknames (no free text).
 * Contract: OnboardingScreen passes `value` + `onChange(nickname)`.
 */

const ADJECTIVES = [
  'Brave', 'Clever', 'Kind', 'Bright', 'Swift', 'Bold', 'Gentle', 'Joyful',
  'Curious', 'Strong', 'Happy', 'Quick', 'Wise', 'Sunny', 'Cool',
];
const ANIMALS = [
  'Tiger', 'Eagle', 'Dolphin', 'Panda', 'Fox', 'Owl', 'Rabbit', 'Lion',
  'Bear', 'Wolf', 'Falcon', 'Otter', 'Peacock', 'Horse', 'Monkey',
];

export function generateNickname() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const ani = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const num = Math.floor(10 + Math.random() * 90);
  return `${adj}${ani}${num}`;
}

export default function NicknameGenerator({ value, onChange }) {
  const label = value || generateNickname();

  const regen = () => {
    const n = generateNickname();
    onChange(n);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-display font-bold text-text-primary mb-6">Your Nickname</h2>
      <p className="text-3xl font-display font-bold text-primary mb-6 break-all">{label}</p>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={regen}
          className="px-5 py-2 bg-secondary text-white rounded-full font-display hover:bg-secondary/90 transition-colors"
          aria-label="Shuffle nickname"
          title="Shuffle nickname"
        >
          🔀 Shuffle
        </button>
      </div>
      <p className="mt-4 text-sm text-text-secondary font-body">
        No name collection — just a fun game name!
      </p>
    </div>
  );
}
