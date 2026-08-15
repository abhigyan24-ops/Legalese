/**
 * AvatarPicker.jsx
 * 
 * Onboarding step 1 — Boy/Girl selection driving a parametric avatar identifier.
 * Output: an avatar string like "boy-spiky-blue-medium" stored in local onboarding state.
 */

const HAIR_BY_GENDER = {
  boy:  ['short', 'spiky', 'wavy'],
  girl: ['long', 'braided', 'ponytail'],
};

const SKIN_TONES = ['light', 'medium', 'dark'];
const OUTFIT_COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'];

const previewEmoji = { boy: '👦', girl: '👧' };

export default function AvatarPicker({ avatar, onSelect }) {
  const pickColor = (seed) => OUTFIT_COLORS[Math.abs(seed) % OUTFIT_COLORS.length];

  const choose = (gender) => {
    const seed = Math.floor(Math.random() * 1000);
    const hair = HAIR_BY_GENDER[gender][Math.abs(seed) % HAIR_BY_GENDER[gender].length];
    const colorIdx = Math.abs(seed) % OUTFIT_COLORS.length;
    const skinIdx = Math.abs(seed) % SKIN_TONES.length;
    const colorName = ['red', 'teal', 'yellow', 'mint'][colorIdx];
    onSelect({
      avatar: `${gender}-${hair}-${colorName}-${SKIN_TONES[skinIdx]}`,
      gender,
      color: OUTFIT_COLORS[colorIdx],
    });
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-display font-bold text-text-primary mb-6">Pick Your Avatar</h2>
      {avatar && (
        <div className="mb-6">
          <div
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl shadow-lg"
            style={{ backgroundColor: avatar.color }}
          >
            {previewEmoji[avatar.gender]}
          </div>
          <p className="mt-2 text-sm text-text-secondary font-body">{avatar.avatar}</p>
        </div>
      )}
      <div className="flex justify-center gap-6">
        <button
          type="button"
          onClick={() => choose('boy')}
          className="p-4 bg-surface rounded-2xl shadow border-2 border-transparent hover:border-primary hover:scale-105 transition-all"
        >
          <div className="text-5xl mb-1">👦</div>
          <span className="font-display">Boy</span>
        </button>
        <button
          type="button"
          onClick={() => choose('girl')}
          className="p-4 bg-surface rounded-2xl shadow border-2 border-transparent hover:border-primary hover:scale-105 transition-all"
        >
          <div className="text-5xl mb-1">👧</div>
          <span className="font-display">Girl</span>
        </button>
      </div>
    </div>
  );
}
