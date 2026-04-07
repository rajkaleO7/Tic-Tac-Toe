import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Home } from 'lucide-react';

interface GameOverModalProps {
  winner: string | null;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export default function GameOverModal({ winner, onPlayAgain, onMainMenu }: GameOverModalProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className="w-full max-w-sm glass p-8 rounded-3xl text-center relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[60px] ${winner ? (winner.includes('X') ? 'bg-cyan-500/30' : 'bg-magenta-500/30') : 'bg-white/10'}`} />
          
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-sm uppercase tracking-[0.3em] text-white/40 font-bold mb-2">Game Over</h2>
            <h3 className="text-4xl font-bold mb-8">
              {winner ? (
                <>
                  <span className={winner.includes('X') ? 'neon-cyan' : 'neon-magenta'}>{winner}</span>
                  <br />
                  <span className="text-2xl text-white/80">Wins!</span>
                </>
              ) : (
                <span className="text-white/80 italic">It's a Draw!</span>
              )}
            </h3>
          </motion.div>

          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPlayAgain}
              className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-white/10"
            >
              <RefreshCw size={18} />
              Play Again
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onMainMenu}
              className="w-full py-4 text-white/70 hover:text-white font-medium flex items-center justify-center gap-2 transition-all border border-white/5 bg-white/[0.02] rounded-xl"
            >
              <Home size={18} />
              Back to Menu
            </motion.button>
          </div>
          
          {/* Confetti-like particles (simplified) */}
          {winner && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: '50%', y: '50%', scale: 0 }}
                  animate={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className={`absolute w-1 h-1 rounded-full ${winner.includes('X') ? 'bg-cyan-400' : 'bg-magenta-400'}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
