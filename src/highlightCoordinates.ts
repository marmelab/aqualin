import { cleanTags } from "blessed";
import { allocateCell, cleanCell } from "./cellActions";
import { Colors } from "./Colors";
import { Direction } from "./Direction";
import { drawBoard } from "./drawGameState";
import { GameState } from "./GameStateTypes";

import { Coordinates } from "./types";
const highlightToken = { color: 100, symbol: 100 };

export async function highlightCoordinates(
  coordinates: Coordinates,
  gameState: GameState
): Promise<GameState> {
  const { column, row } = coordinates;
  cleanGameState(gameState);
  //Is there a token at this coordinates.?
  if (!gameState.board[row][column]) {
    throw new Error("Invalid source coordinates");
  }
  return parseToHighlightCoordinates(column, row, gameState);
}

function cleanGameState(gameState: GameState) {
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board.length; j++) {
      if (
        gameState.board[i][j] &&
        gameState.board[i][j].color === 100 &&
        gameState.board[i][j].symbol === 100
      ) {
        cleanCell({ row: i, column: j }, gameState);
      }
    }
  }
}

function parseToHighlightCoordinates(
  column: number,
  row: number,
  gameState: GameState
) {
  for (let i = column + 1; i < gameState.board.length; i++) {
    if (gameState.board[row][i]) {
      break;
    }
    allocateCell({ row, column: i }, gameState, highlightToken);
  }
  for (let i = column - 1; i >= 0; i--) {
    if (gameState.board[row][i]) {
      break;
    }
    allocateCell({ row, column: i }, gameState, highlightToken);
  }

  for (let i = row + 1; i < gameState.board.length; i++) {
    if (gameState.board[i][column]) {
      break;
    }
    allocateCell({ row: i, column }, gameState, highlightToken);
    gameState.board[i][column] = highlightToken;
  }

  for (let i = row - 1; i >= 0; i--) {
    if (gameState.board[i][column]) {
      break;
    }
    allocateCell({ row: i, column }, gameState, highlightToken);
  }
  return gameState;
}
