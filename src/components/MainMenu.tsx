import { motion } from 'motion/react';
import { useState } from 'react';
import { GameMode } from '../types';
import { User, Users, Play } from 'lucide-react';

interface MainMenuProps {
  onStart: (mode: GameMode, p1: string, p2: string) => void;
  defaultP1: string;
  defaultP2: string;
}

export default function MainMenu({ onStart, defaultP1, defaultP2 }: MainMenuProps) {
  const [mode, setMode] = useState<GameMode>('1P');
  const [p1, setP1] = useState(defaultP1);
  const [p2, setP2] = useState(defaultP2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md p-8 glass rounded-3xl flex flex-col gap-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Game Setup</h2>
        <p className="text-white/60 text-sm">Choose your destiny</p>
      </div>

      <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
        <button
          onClick={() => setMode('1P')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
            mode === '1P' ? 'bg-white/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'text-white/40 hover:text-white/60'
          }`}
        >
          <User size={18} />
          <span className="font-medium">vs AI</span>
        </button>
        <button
          onClick={() => setMode('2P')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
            mode === '2P' ? 'bg-white/10 text-magenta-400 shadow-[0_0_15px_rgba(255,0,255,0.2)]' : 'text-white/40 hover:text-white/60'
          }`}
        >
          <Users size={18} />
          <span className="font-medium">Local</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Player 1 (X)</label>
          <input
            type="text"
            value={p1}
            onChange={(e) => setP1(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
            placeholder="Enter name"
          />
        </div>

        <div className={`space-y-2 transition-all duration-300 ${mode === '1P' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">
            {mode === '1P' ? 'AI Opponent (O)' : 'Player 2 (O)'}
          </label>
          <input
            type="text"
            value={mode === '1P' ? 'Cosmic AI' : p2}
            onChange={(e) => setP2(e.target.value)}
            disabled={mode === '1P'}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-magenta-400/50 focus:ring-1 focus:ring-magenta-400/50 transition-all"
            placeholder="Enter name"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onStart(mode, p1, mode === '1P' ? 'Cosmic AI' : p2)}
        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 hover:brightness-110 transition-all"
      >
        <Play size={20} fill="currentColor" />
        Start Game
      </motion.button>
    </motion.div>
  );
}
