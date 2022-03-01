/*The game must check that the move is legal,
there must be a token in the source location,
there must not be a token in the target location
the source and target must be in the same row or column
there must be no token between the source and target location
If a player enters an illegal move, the game must show an error and ask for a new location*/

import { axis } from "./axis";
import { Board, GameState } from "./GameState";
import { Location, LocationInputs } from "./types";

const row = "row";
const column = "column";

export function parseColumns(
  sourceLocation: Location,
  targetLocation: Location,
  gameState: GameState
): boolean {
  if (sourceLocation.column - targetLocation.column < 0) {
    for (let i = sourceLocation.column + 1; i < targetLocation.column; i++) {
      if (gameState.board[sourceLocation.row][i]) {
        return true;
      }
    }
  } else {
    for (let i = targetLocation.column + 1; i < sourceLocation.column; i++) {
      if (gameState.board[sourceLocation.row][i]) {
        return true;
      }
    }
  }
  return false;
}

export function parseRows(
  sourceLocation: Location,
  targetLocation: Location,
  gameState: GameState
): boolean {
  console.log(sourceLocation.row - targetLocation.row);
  if (sourceLocation.row - targetLocation.row < 0) {
    for (let i = sourceLocation.row + 1; i < targetLocation.row; i++) {
      if (gameState.board[i][sourceLocation.column]) {
        return true;
      }
    }
  } else {
    for (let i = targetLocation.row; i < sourceLocation.row; i++) {
      if (gameState.board[i][sourceLocation.column]) {
        return true;
      }
    }
  }
  return false;
}

function isPathEmpty(
  sourceLocation: Location,
  targetLocation: Location,
  direction: string,
  gameState: GameState
): boolean {
  if (direction === row) {
    return parseColumns(sourceLocation, targetLocation, gameState);
  } else if (direction === column) {
    return parseRows(sourceLocation, targetLocation, gameState);
  }
}

function validateMove(
  sourceLocation: Location,
  targetLocation: Location,
  gameState: GameState
): boolean {
  //sourceLocation: is there a token?
  if (!gameState.board[sourceLocation.row][sourceLocation.column]) {
    console.log("source location KO");
    return true;
  }
  //targetLocation: is there a token?
  if (gameState.board[targetLocation.row][targetLocation.column] !== null) {
    console.log("target location KO");
    return true;
  }
  //sourceLocation && targetLocation: same row? same column?
  //cells between source and target empty?
  if (targetLocation.row === sourceLocation.row) {
    return isPathEmpty(sourceLocation, targetLocation, row, gameState);
  } else if (sourceLocation.column === targetLocation.column) {
    return isPathEmpty(sourceLocation, targetLocation, column, gameState);
  } else {
    console.log("bad move");
    return true;
  }
}

export async function moveToken(
  locationInputs: LocationInputs,
  gameState: GameState
): Promise<GameState> {
  let badMove = false;
  const { sourceLocation, targetLocation } = locationInputs;

  badMove = validateMove(sourceLocation, targetLocation, gameState);

  if (badMove) {
    return null;
  } else {
    //sourceLocation null,

    let token = gameState.board[sourceLocation.row][sourceLocation.column];

    gameState.board[sourceLocation.row][sourceLocation.column] = null;
    //trgetLocation with the token
    gameState.board[targetLocation.row][targetLocation.column] = token;
    return gameState;
  }
}
