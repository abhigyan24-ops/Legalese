/**
 * AnimatedButton.jsx — Delightful Spring Micro-interactive Button
 * Inspired by animate-ui & uiverse micro-interactions.
 * Supports spring hover/tap scales, glowing borders, and built-in click sound.
 */

import { motion } from 'framer-motion';
import sound from '../../lib/sound';
import { cn } from '../../lib/utils';

export default function AnimatedButton({
  children,
  onClick,
  className,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  icon,
  type = 'button',
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    sound.click();
    if (onClick) onClick(e);
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-[#F5B942] via-amber-300 to-[#F5B942] text-black font-extrabold shadow-[0_4px_20px_rgba(245,185,66,0.35)] hover:shadow-[0_6px_25px_rgba(245,185,66,0.5)] border border-[#FFE7A8]/50',
    gold:
      'bg-[#F5B942] hover:bg-[#FFE7A8] text-black font-extrabold shadow-lg border border-amber-300',
    secondary:
      'bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 shadow-md backdrop-blur-sm',
    ghost:
      'bg-transparent hover:bg-white/10 text-white/80 hover:text-white font-medium',
    danger:
      'bg-gradient-to-r from-rose-600 to-rose-500 text-white font-bold shadow-lg shadow-rose-900/40 border border-rose-400/30',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-2xl gap-2',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5',
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      whileHover={disabled ? {} : { scale: 1.04, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.96, y: 1 }}
      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
      className={cn(
        'relative inline-flex items-center justify-center select-none outline-none focus-visible:ring-2 focus-visible:ring-[#F5B942] focus-visible:ring-offset-2 focus-visible:ring-offset-[#132A20] transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0 text-base">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
