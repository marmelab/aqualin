/*The game must check that the move is legal,
there must be a token in the source location,
there must not be a token in the target location
the source and target must be in the same row or column
there must be no token between the source and target location
If a player enters an illegal move, the game must show an error and ask for a new location*/

import { axis } from "./axis";
import { GameState } from "./GameState";
import { Location, LocationInputs } from "./types";

const row = "row";
const column = "column";

function getRowIndex(location: Location): number {
  return parseInt(location.row) - 1;
}

function getColumnIndex(location: Location): number {
  return axis[location.column];
}

export function parseColumns(
  sourceLocation: Location,
  targetLocation: Location,
  gameState: GameState
): boolean {
  if (getColumnIndex(sourceLocation) - getColumnIndex(targetLocation) < 0) {
    for (
      let i = getColumnIndex(sourceLocation) + 1;
      i < getColumnIndex(targetLocation);
      i++
    ) {
      if (gameState[getRowIndex(sourceLocation)][i]) {
        return true;
      }
    }
  } else {
    for (
      let i = getColumnIndex(targetLocation) + 1;
      i < getColumnIndex(sourceLocation);
      i++
    ) {
      if (gameState[getRowIndex(sourceLocation)][i]) {
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
  console.log(getRowIndex(sourceLocation) - getRowIndex(targetLocation));
  if (getRowIndex(sourceLocation) - getRowIndex(targetLocation) < 0) {
    for (
      let i = getRowIndex(sourceLocation) + 1;
      i < getRowIndex(targetLocation);
      i++
    ) {
      if (gameState[i][getColumnIndex(sourceLocation)]) {
        return true;
      }
    }
  } else {
    for (
      let i = getRowIndex(targetLocation);
      i < getRowIndex(sourceLocation);
      i++
    ) {
      console.log(i);
      console.log(sourceLocation);
      console.log(getColumnIndex(sourceLocation));
      console.log(gameState);
      console.log(gameState[i][getColumnIndex(sourceLocation)]);
      console.log(gameState[i]);
      if (gameState[i][getColumnIndex(sourceLocation)]) {
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
  if (!gameState[getRowIndex(sourceLocation)][getColumnIndex(sourceLocation)]) {
    console.log("source location KO");
    return true;
  }
  //targetLocation: is there a token?
  if (
    gameState[getRowIndex(targetLocation)][getColumnIndex(targetLocation)] !==
    null
  ) {
    console.log("target location KO");
    return true;
  }
  //sourceLocation && targetLocation: same row? same column?
  //cells between source and target empty?
  if (getRowIndex(targetLocation) === getRowIndex(sourceLocation)) {
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

    let token =
      gameState[getRowIndex(sourceLocation)][getColumnIndex(sourceLocation)];

    gameState[getRowIndex(sourceLocation)][getColumnIndex(sourceLocation)] =
      null;
    //trgetLocation with the token
    gameState[getRowIndex(targetLocation)][getColumnIndex(targetLocation)] =
      token;
    return gameState;
  }
}
