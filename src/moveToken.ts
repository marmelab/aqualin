/*The game must check that the move is legal,
there must be a token in the source Coordinates,
there must not be a token in the target Coordinates
the source and target must be in the same row or column
there must be no token between the source and target Coordinates
If a player enters an illegal move, the game must show an error and ask for a new Coordinates*/

import { GameState, Token } from "./GameStateTypes";
import { Coordinates, Move, Direction } from "./types";

import { allocateCell, cleanCell } from "./cellActions";

export function moveToken(Move: Move, gameState: GameState): GameState {
  let badMove = false;
  const { source, target } = Move;

  validateMove(source, target, gameState);

  let token = gameState.board[source.row][source.column];
  cleanCell(source, gameState);
  allocateCell(target, gameState.board, token);

  return gameState;
}

export function parseColumns(
  source: Coordinates,
  target: Coordinates,
  gameState: GameState
): boolean {
  if (source.column - target.column < 0) {
    for (let i = source.column + 1; i < target.column; i++) {
      if (gameState.board[source.row][i]) {
        return false;
      }
    }
  } else {
    for (let i = target.column + 1; i < source.column; i++) {
      if (gameState.board[source.row][i]) {
        return false;
      }
    }
  }
  return true;
}

export function parseRows(
  source: Coordinates,
  target: Coordinates,
  gameState: GameState
): boolean {
  if (source.row - target.row < 0) {
    for (let i = source.row + 1; i < target.row; i++) {
      if (gameState.board[i][source.column]) {
        return false;
      }
    }
  } else {
    for (let i = target.row; i < source.row; i++) {
      if (gameState.board[i][source.column]) {
        return false;
      }
    }
  }
  return true;
}

function isPathEmpty(
  source: Coordinates,
  target: Coordinates,
  direction: Direction,
  gameState: GameState
): boolean {
  if (direction === "row") {
    return parseColumns(source, target, gameState);
  } else if (direction === "column") {
    return parseRows(source, target, gameState);
  }
}

export function validateMove(
  source: Coordinates,
  target: Coordinates,
  gameState: GameState
) {
  if (!gameState.board[source.row][source.column]) {
    throw new Error("Invalid source coordinates");
  }

  if (gameState.board[target.row][target.column] !== null) {
    throw new Error("Invalid target coordinates");
  }

  if (target.row !== source.row && source.column !== target.column) {
    throw new Error("Invalid move");
  }
  if (target.row === source.row) {
    if (!isPathEmpty(source, target, "row", gameState)) {
      throw new Error("Invalid move, the path is not empty");
    }
  } else {
    if (!isPathEmpty(source, target, "column", gameState)) {
      throw new Error("Invalid move, the path is not empty");
    }
  }
}
