export type Player = 'X' | 'O' | null;
export type GameMode = '1P' | '2P';

export interface GameState {
  board: Player[];
  isXNext: boolean;
  winner: Player;
  winningLine: number[] | null;
  scores: { X: number; O: number; draws: number };
  playerNames: { X: string; O: string };
  gameMode: GameMode;
  status: 'playing' | 'won' | 'draw';
}
