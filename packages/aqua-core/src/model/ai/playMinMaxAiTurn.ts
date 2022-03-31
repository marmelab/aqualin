import { GameState, Token } from "../../types";
import { bestTurn } from "./minimax";
import { playAiTurn } from "./playAiTurn";

export const playMinMaxIaTurn = (
  gameState: GameState,
  aiPlayer: keyof Token,
  opponent: keyof Token,
) => {
  if (gameState.river.length === 0) {
    return gameState;
  }
  const turn = bestTurn(gameState, aiPlayer, opponent);
  console.log(turn);
  return playAiTurn(gameState, turn.minMaxGameStateTurn);
};
