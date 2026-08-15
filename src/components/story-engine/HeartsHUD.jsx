/**
 * HeartsHUD.jsx
 * 
 * Displays the 3-hearts "second chance" system for risky story choices.
 * Per spec Section 10: Hearts dim on risky choices but NEVER force a game-over.
 * The story always routes to a recovery node instead of ending immediately.
 * 
 * Props:
 * - hearts: number (0-3) - current hearts remaining
 * - maxHearts: number (default 3) - maximum hearts
 */

export default function HeartsHUD({ hearts = 3, maxHearts = 3 }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-surface/80 backdrop-blur-sm rounded-full border border-primary/20">
      <span className="text-sm font-display text-text-secondary">Hearts:</span>
      <div className="flex gap-1">
        {Array.from({ length: maxHearts }).map((_, i) => (
          <span
            key={i}
            className={`text-2xl transition-all duration-300 ${
              i < hearts
                ? 'opacity-100 scale-100'
                : 'opacity-30 scale-90 grayscale'
            }`}
            style={{
              filter: i < hearts ? 'none' : 'brightness(0.5)',
            }}
          >
            ❤️
          </span>
        ))}
      </div>
      {hearts === 0 && (
        <span className="text-xs text-warning ml-2 font-body">
          Use caution!
        </span>
      )}
    </div>
  );
}
