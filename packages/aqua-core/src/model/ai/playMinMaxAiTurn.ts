import { GameState, NotifyAction, Token } from "../../types";
import { bestTurn } from "./minmax/minmax";
import { playAiTurn } from "./playAiTurn";

export const playMinMaxIaTurn = (
  gameState: GameState,
  aiPlayer: keyof Token,
  opponent: keyof Token,
  notify: NotifyAction,
) => {
  if (gameState.river.length === 0) {
    return null;
  }
  const turn = bestTurn(gameState, aiPlayer, opponent);
  playAiTurn(
    gameState,
    turn.minMaxGameStateTurn,
    notify,
    turn.exploredPossibilities,
  );
};
