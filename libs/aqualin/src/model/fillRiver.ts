import { GameState } from '../GameStateTypes';
import { deepClone } from '../utils';
import { drawToken } from './drawToken';

export const fillRiver = (gameState: GameState): GameState => {
  const boardSize = gameState.board.length;
  const missingTokenInRiver = boardSize - gameState.river.length;

  if (missingTokenInRiver === 0) return gameState;

  const newGameState = deepClone(gameState);
  for (let i = 0; i < missingTokenInRiver; i++) {
    const token = drawToken(newGameState);
    if (!token) {
      break;
    }
    newGameState.river.push(token);
  }
  return newGameState;
};
