import { motion } from 'motion/react';

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-32 h-32 border-4 border-white/20 rounded-2xl flex items-center justify-center relative overflow-hidden glass">
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-4 border-cyan-400 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          />
          <span className="text-6xl font-bold neon-cyan">X</span>
          <span className="text-6xl font-bold neon-magenta absolute translate-x-4 translate-y-4 opacity-50">O</span>
        </div>
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8 text-4xl font-bold tracking-widest text-white uppercase"
      >
        Cosmic <span className="neon-cyan">Tic</span>-<span className="neon-magenta">Tac</span>-Toe
      </motion.h1>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-4 text-sm text-white/50 tracking-[0.3em] uppercase"
      >
        Loading Universe...
      </motion.div>
    </motion.div>
  );
}
