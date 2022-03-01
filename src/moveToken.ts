/*The game must check that the move is legal,
there must be a token in the source Coordinates,
there must not be a token in the target Coordinates
the source and target must be in the same row or column
there must be no token between the source and target Coordinates
If a player enters an illegal move, the game must show an error and ask for a new Coordinates*/

import { axis } from "./axis";
import { Board, GameState } from "./GameStateTypes";
import { Coordinates, Move } from "./types";

const row = "row";
const column = "column";

export async function moveToken(
  Move: Move,
  gameState: GameState
): Promise<GameState> {
  let badMove = false;
  const { source, target } = Move;

  badMove = validateMove(source, target, gameState);

  if (badMove) {
    return null;
  } else {
    //source null,

    let token = gameState.board[source.row][source.column];

    gameState.board[source.row][source.column] = null;
    //trgetCoordinates with the token
    gameState.board[target.row][target.column] = token;
    return gameState;
  }
}

export function parseColumns(
  source: Coordinates,
  target: Coordinates,
  gameState: GameState
): boolean {
  if (source.column - target.column < 0) {
    for (let i = source.column + 1; i < target.column; i++) {
      if (gameState.board[source.row][i]) {
        return true;
      }
    }
  } else {
    for (let i = target.column + 1; i < source.column; i++) {
      if (gameState.board[source.row][i]) {
        return true;
      }
    }
  }
  return false;
}

export function parseRows(
  source: Coordinates,
  target: Coordinates,
  gameState: GameState
): boolean {
  console.log(source.row - target.row);
  if (source.row - target.row < 0) {
    for (let i = source.row + 1; i < target.row; i++) {
      if (gameState.board[i][source.column]) {
        return true;
      }
    }
  } else {
    for (let i = target.row; i < source.row; i++) {
      if (gameState.board[i][source.column]) {
        return true;
      }
    }
  }
  return false;
}

function isPathEmpty(
  source: Coordinates,
  target: Coordinates,
  direction: string,
  gameState: GameState
): boolean {
  if (direction === row) {
    return parseColumns(source, target, gameState);
  } else if (direction === column) {
    return parseRows(source, target, gameState);
  }
}

function validateMove(
  source: Coordinates,
  target: Coordinates,
  gameState: GameState
): boolean {
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
    return isPathEmpty(source, target, row, gameState);
  } else {
    return isPathEmpty(source, target, column, gameState);
  }
}
