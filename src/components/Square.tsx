import { motion, AnimatePresence } from 'motion/react';
import { Player } from '../types';

interface SquareProps {
  key?: number;
  value: Player;
  onClick: () => void;
  isWinningSquare: boolean;
  disabled: boolean;
}

export default function Square({ value, onClick, isWinningSquare, disabled }: SquareProps) {
  return (
    <motion.button
      whileHover={!value && !disabled ? { scale: 1.05 } : {}}
      whileTap={!value && !disabled ? { scale: 0.9 } : {}}
      onClick={onClick}
      disabled={disabled || !!value}
      className={`relative w-full aspect-square flex items-center justify-center text-5xl sm:text-6xl font-bold transition-all duration-500 rounded-xl ${
        isWinningSquare ? 'bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'hover:bg-white/[0.03]'
      }`}
    >
      <AnimatePresence mode="wait">
        {value === 'X' && (
          <motion.span
            key="X"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="neon-cyan"
          >
            X
          </motion.span>
        )}
        {value === 'O' && (
          <motion.span
            key="O"
            initial={{ scale: 0, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="neon-magenta"
          >
            O
          </motion.span>
        )}
      </AnimatePresence>
      
      {/* Hover indicator */}
      {!value && !disabled && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-2 h-2 rounded-full bg-white/20 blur-[2px]" />
        </motion.div>
      )}
    </motion.button>
  );
}
