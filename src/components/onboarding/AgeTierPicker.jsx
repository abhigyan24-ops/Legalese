/**
 * AgeTierPicker.jsx
 * 
 * Onboarding step 3 — exactly two age buckets: 8–11 and 12–16.
 */

const OPTIONS = [
  { value: '8-11', label: '8–11', desc: 'Ages 8 to 11' },
  { value: '12-16', label: '12–16', desc: 'Ages 12 to 16' },
];

export default function AgeTierPicker({ value, onSelect }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-display font-bold text-text-primary mb-6">How old are you?</h2>
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
            <span className="text-xl font-bold">{opt.label}</span>
            <span className="block text-sm text-text-secondary">{opt.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
