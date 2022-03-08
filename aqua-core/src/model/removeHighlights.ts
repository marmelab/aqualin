import { GameState } from "aqua-core/src";

import { deepClone } from "../utils";
import { highlightToken } from "./highlightCoordinates";

export const removeHighlights = (gameState: GameState): GameState => {
  const newGameState = deepClone(gameState);
  for (let row = 0; row < gameState.board.length; row++) {
    for (let column = 0; column < gameState.board.length; column++) {
      if (
        newGameState.board[row][column] &&
        newGameState.board[row][column].symbol == highlightToken.symbol
      ) {
        newGameState.board[row][column] = null;
      }
    }
  }
  return newGameState;
};
