import { GameState, Token } from "../../types";
import { isHighlightToken } from "../highlightCoordinates";
import { playTurn } from "../playTurn";

export const playAiTurn = (gameState: GameState, aiPlayer: keyof Token) => {
  let res = null;
  if (
    gameState.board[0][0] != null &&
    !isHighlightToken(gameState.board[0][0])
  ) {
    res = {
      move: { from: { row: 0, column: 0 }, to: { row: 0, column: 1 } },
      place: { index: 0, to: { row: 0, column: 0 } },
    };
  } else {
    res = {
      place: { index: 0, to: { row: 2, column: 0 } },
    };
  }
  if (res.move) {
    gameState = playTurn(gameState, res.move.from).gameState;
    gameState = playTurn(gameState, res.move.to).gameState;
  }
  gameState = playTurn(gameState, {
    row: null,
    column: res.place.index,
  }).gameState;
  gameState = playTurn(gameState, res.place.to).gameState;
  return gameState;
};
