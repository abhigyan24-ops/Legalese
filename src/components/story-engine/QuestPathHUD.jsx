/**
 * QuestPathHUD.jsx
 * 
 * 5-stage quest progress HUD. Highlights reached stages (Stage 0 up to currentStage).
 * Accessible to screen readers with proper role="region", aria-current="step",
 * and descriptive stage labels per WCAG 2.1 AA.
 */

export default function QuestPathHUD({ currentStage = 0, stages = [] }) {
  const count = stages.length || 5;
  const stageList = stages.length
    ? stages
    : Array.from({ length: count }, (_, i) => ({ icon: '📍', label: `Stage ${i + 1}` }));

  return (
    <nav
      role="region"
      aria-label="Story chapter progress tracker"
      className="flex items-center gap-1 px-3 py-2 bg-surface/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-md"
    >
      {stageList.map((stage, i) => {
        const reached = i <= currentStage;
        const isCurrent = i === currentStage;
        const Icon = stage.icon || '📍';
        const label = stage.label || `Stage ${i + 1}`;
        return (
          <div key={i} className="flex items-center gap-1">
            <div
              className={`rounded-full border-2 flex items-center justify-center text-xl transition-all ${
                reached
                  ? 'bg-stage-active border-stage-active scale-110'
                  : 'bg-stage-inactive/20 border-stage-inactive'
              } ${isCurrent ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''}`}
              style={{
                width: 28,
                height: 28,
                color: reached ? 'var(--color-surface)' : 'var(--color-stage-inactive)',
                borderColor: reached ? 'var(--color-stage-active)' : 'var(--color-stage-inactive)',
                backgroundColor: reached ? 'var(--color-stage-active)' : 'rgba(203,213,222,0.2)',
              }}
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`Stage ${i + 1} of ${stageList.length}: ${label} ${
                isCurrent ? '(current stage)' : reached ? '(completed)' : '(upcoming)'
              }`}
            >
              <span role="img" aria-hidden>
                {Icon}
              </span>
            </div>
            {i < stageList.length - 1 && (
              <span
                className="block h-0.5 w-4 rounded"
                style={{ backgroundColor: reached ? 'var(--color-stage-active)' : 'var(--color-stage-inactive)' }}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
