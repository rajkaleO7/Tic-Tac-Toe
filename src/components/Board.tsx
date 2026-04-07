import { motion } from 'motion/react';
import Square from './Square';
import { Player } from '../types';

interface BoardProps {
  squares: Player[];
  onSquareClick: (i: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
}

export default function Board({ squares, onSquareClick, winningLine, disabled }: BoardProps) {
  return (
    <div className="relative w-full aspect-square max-w-[400px] glass rounded-3xl overflow-hidden p-4 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Grid Lines - Laser Beams */}
      <div className="absolute inset-0 pointer-events-none p-4">
        <div className="relative w-full h-full">
          {/* Vertical lines */}
          <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          {/* Horizontal lines */}
          <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>

      <div className="grid grid-cols-3 w-full h-full relative z-10 gap-2">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => onSquareClick(i)}
            isWinningSquare={winningLine?.includes(i) || false}
            disabled={disabled}
          />
        ))}
      </div>

      {/* Winning Line Overlay */}
      {winningLine && (
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          className="absolute inset-0 pointer-events-none z-20"
        >
          <svg className="w-full h-full p-4">
            <WinningLineSVG line={winningLine} />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

function WinningLineSVG({ line }: { line: number[] }) {
  const coords = [
    { x: '16.6%', y: '16.6%' }, { x: '50%', y: '16.6%' }, { x: '83.3%', y: '16.6%' },
    { x: '16.6%', y: '50%' },   { x: '50%', y: '50%' },   { x: '83.3%', y: '50%' },
    { x: '16.6%', y: '83.3%' }, { x: '50%', y: '83.3%' }, { x: '83.3%', y: '83.3%' }
  ];

  const start = coords[line[0]];
  const end = coords[line[2]];

  return (
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
    />
  );
}
