import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home } from 'lucide-react';
import Background from './components/Background';
import SplashScreen from './components/SplashScreen';
import MainMenu from './components/MainMenu';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import GameOverModal from './components/GameOverModal';
import { Player, GameMode, GameState } from './types';
import { calculateWinner, isBoardFull, getBestMove } from './lib/gameLogic';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState<'menu' | 'game'>('menu');
  
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    isXNext: true,
    winner: null,
    winningLine: null,
    scores: { X: 0, O: 0, draws: 0 },
    playerNames: { X: 'Player 1', O: 'Player 2' },
    gameMode: '2P',
    status: 'playing'
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleStartGame = (mode: GameMode, p1: string, p2: string) => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      isXNext: true,
      winner: null,
      winningLine: null,
      playerNames: { X: p1 || 'Player 1', O: p2 || (mode === '1P' ? 'Cosmic AI' : 'Player 2') },
      gameMode: mode,
      status: 'playing'
    }));
    setView('game');
  };

  const handleSquareClick = useCallback((i: number) => {
    if (gameState.board[i] || gameState.status !== 'playing') return;

    const newBoard = [...gameState.board];
    newBoard[i] = gameState.isXNext ? 'X' : 'O';
    
    const winInfo = calculateWinner(newBoard);
    const full = isBoardFull(newBoard);

    if (winInfo) {
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        winner: winInfo.winner,
        winningLine: winInfo.line,
        status: 'won',
        scores: {
          ...prev.scores,
          [winInfo.winner as 'X' | 'O']: prev.scores[winInfo.winner as 'X' | 'O'] + 1
        }
      }));
    } else if (full) {
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        status: 'draw',
        scores: { ...prev.scores, draws: prev.scores.draws + 1 }
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        isXNext: !prev.isXNext
      }));
    }
  }, [gameState]);

  // AI Move logic
  useEffect(() => {
    if (
      gameState.gameMode === '1P' && 
      !gameState.isXNext && 
      gameState.status === 'playing'
    ) {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(gameState.board);
        if (aiMove !== -1) {
          handleSquareClick(aiMove);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [gameState.isXNext, gameState.gameMode, gameState.status, gameState.board, handleSquareClick]);

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      isXNext: true,
      winner: null,
      winningLine: null,
      status: 'playing'
    }));
  };

  const goToMenu = () => {
    setView('menu');
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      status: 'playing',
      winner: null,
      winningLine: null,
      scores: { X: 0, O: 0, draws: 0 }
    }));
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      <Background />
      
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col items-center"
        >
          {view === 'menu' ? (
            <MainMenu 
              onStart={handleStartGame} 
              defaultP1={gameState.playerNames.X}
              defaultP2={gameState.playerNames.O}
            />
          ) : (
            <div className="w-full flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 text-center"
              >
                <h2 className="text-sm uppercase tracking-[0.4em] text-white/40 font-bold mb-2">Current Turn</h2>
                <div className="flex items-center justify-center gap-3">
                  <span className={`text-2xl font-bold transition-all duration-300 ${gameState.isXNext ? 'neon-cyan scale-110' : 'text-white/20'}`}>
                    {gameState.playerNames.X}
                  </span>
                  <span className="text-white/20">vs</span>
                  <span className={`text-2xl font-bold transition-all duration-300 ${!gameState.isXNext ? 'neon-magenta scale-110' : 'text-white/20'}`}>
                    {gameState.playerNames.O}
                  </span>
                </div>
              </motion.div>

              <ScoreBoard 
                scores={gameState.scores} 
                names={gameState.playerNames} 
                currentTurn={gameState.isXNext ? 'X' : 'O'} 
              />

              <Board 
                squares={gameState.board} 
                onSquareClick={handleSquareClick} 
                winningLine={gameState.winningLine}
                disabled={gameState.gameMode === '1P' && !gameState.isXNext}
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToMenu}
                className="mt-12 flex items-center gap-2 text-white/40 hover:text-white/80 text-sm uppercase tracking-widest font-bold transition-all"
              >
                <Home size={16} />
                Back to Menu
              </motion.button>
            </div>
          )}
        </motion.div>
      )}

      {gameState.status !== 'playing' && (
        <GameOverModal 
          winner={gameState.winner ? (gameState.winner === 'X' ? gameState.playerNames.X : gameState.playerNames.O) : null}
          onPlayAgain={resetGame}
          onMainMenu={goToMenu}
        />
      )}
    </div>
  );
}
