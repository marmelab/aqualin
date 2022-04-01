import { GameState, Token } from "../../types";
import { bestTurn } from "./minmax/minmax";
import { playAiTurn } from "./playAiTurn";

export const playMinMaxIaTurn = (
  gameState: GameState,
  aiPlayer: keyof Token,
  opponent: keyof Token,
) => {
  if (gameState.river.length === 0) {
    return null;
  }
  const turn = bestTurn(gameState, aiPlayer, opponent);
  return {
    gameState: playAiTurn(gameState, turn.minMaxGameStateTurn),
    exploredPossibilities: turn.exploredPossibilities,
  };
};
