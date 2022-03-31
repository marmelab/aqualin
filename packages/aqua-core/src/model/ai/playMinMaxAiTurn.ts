import { AiTurn, GameState, Token } from "../../types";
import { isHighlightToken } from "../highlightCoordinates";
import { playAiTurn } from "./playAiTurn";

export const playMinMaxIaTurn = (
  gameState: GameState,
  iaPlayer: keyof Token,
) => {
  if (gameState.river.length === 0) {
    return gameState;
  }
  let res: AiTurn = null;
  if (
    gameState.board[0][0] != null &&
    !isHighlightToken(gameState.board[0][0])
  ) {
    res = {
      move: { source: { row: 0, column: 0 }, target: { row: 0, column: 1 } },
      place: { indexRiverToken: 0, coordinates: { row: 0, column: 0 } },
    };
  } else {
    res = {
      place: { indexRiverToken: 0, coordinates: { row: 2, column: 0 } },
    };
  }
  return playAiTurn(gameState, res);
};
