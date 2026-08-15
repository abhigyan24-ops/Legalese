/**
 * LanguagePicker.jsx
 * 
 * Onboarding step 4 — trilingual: English / हिंदी / ಕನ್ನಡ.
 */

const OPTIONS = [
  { value: 'en', label: 'English', native: 'English' },
  { value: 'hi', label: 'हिंदी (Hindi)', native: 'हिंदी' },
  { value: 'kn', label: 'ಕನ್ನಡ (Kannada)', native: 'ಕನ್ನಡ' },
];

export default function LanguagePicker({ value, onSelect }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-display font-bold text-text-primary mb-6">Choose your language</h2>
      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`p-4 rounded-xl border-2 font-display text-left transition-all ${
              value === opt.value
                ? 'border-primary bg-primary/10 scale-105'
                : 'border-stage-inactive bg-surface hover:border-primary'
            }`}
          >
            <span className="text-lg font-bold">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
