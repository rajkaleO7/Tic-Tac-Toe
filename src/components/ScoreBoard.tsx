import { Player } from '../types';

interface ScoreBoardProps {
  scores: { X: number; O: number; draws: number };
  names: { X: string; O: string };
  currentTurn: Player;
}

export default function ScoreBoard({ scores, names, currentTurn }: ScoreBoardProps) {
  return (
    <div className="w-full max-w-md grid grid-cols-3 gap-4 mb-8">
      <div className={`glass p-4 rounded-2xl text-center transition-all duration-500 ${currentTurn === 'X' ? 'ring-2 ring-cyan-400/50 bg-cyan-400/10' : 'opacity-60'}`}>
        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">{names.X}</p>
        <p className="text-2xl font-bold neon-cyan">{scores.X}</p>
      </div>
      
      <div className="glass p-4 rounded-2xl text-center opacity-60">
        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Draws</p>
        <p className="text-2xl font-bold text-white/80">{scores.draws}</p>
      </div>
      
      <div className={`glass p-4 rounded-2xl text-center transition-all duration-500 ${currentTurn === 'O' ? 'ring-2 ring-magenta-400/50 bg-magenta-400/10' : 'opacity-60'}`}>
        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">{names.O}</p>
        <p className="text-2xl font-bold neon-magenta">{scores.O}</p>
      </div>
    </div>
  );
}
