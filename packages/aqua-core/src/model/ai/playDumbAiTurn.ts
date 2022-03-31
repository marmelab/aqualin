import { Coordinates, GameState, Token } from "../../types";
import { isHighlightToken } from "../highlightCoordinates";
import { playAiTurn } from "./playAiTurn";

export const playDumbAiTurn = (gameState: GameState, aiPlayer: keyof Token) => {
  if (gameState.river.length === 0) {
    return gameState;
  }
  let coordinates: Coordinates = null;
  for (let row = 0; row < gameState.board.length; row++) {
    for (let column = 0; column < gameState.board.length; column++) {
      if (
        gameState.board[row][column] == null ||
        isHighlightToken(gameState.board[row][column])
      ) {
        coordinates = { row, column };
        break;
      }
    }
  }
  return playAiTurn(gameState, {
    place: { indexRiverToken: 0, coordinates },
  });
};
