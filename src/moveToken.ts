/*The game must check that the move is legal,
there must be a token in the source location,
there must not be a token in the target location
the source and target must be in the same row or column
there must be no token between the source and target location
If a player enters an illegal move, the game must show an error and ask for a new location*/

import { LocationInputs, Location, askInputs } from "./askInputs";
import { axis } from "./axis";
import { GameState } from "./GameState";

function isPathEmpty(
  sourceLocation: Location,
  targetLocation: Location,
  direction: string,
  gameState: GameState
): boolean {
  if (direction === "row") {
    //parse Columns
    if (axis[sourceLocation.column] - axis[targetLocation.column] < 0) {
      for (
        let i = axis[sourceLocation.column] + 1;
        i < axis[targetLocation.column];
        i++
      ) {
        if (gameState[parseInt(sourceLocation.row)][i]) {
          return true;
        }
      }
    } else {
      for (
        let i = axis[targetLocation.column] + 1;
        i < axis[sourceLocation.column];
        i++
      ) {
        if (gameState[parseInt(sourceLocation.row)][i]) {
          return true;
        }
      }
    }
  } else if (direction === "column") {
    //parse rows
    if (parseInt(sourceLocation.row) - parseInt(targetLocation.row) < 0) {
      for (
        let i = parseInt(sourceLocation.row) + 1;
        i < parseInt(targetLocation.row);
        i++
      ) {
        if (gameState[i][axis[sourceLocation.column]]) {
          return true;
        }
      }
    } else {
      for (
        let i = axis[targetLocation.column] + 1;
        i < axis[sourceLocation.column];
        i++
      ) {
        if (gameState[i][axis[sourceLocation.column]]) {
          return true;
        }
      }
    }
  }
  return false;
}

function validateMove(
  sourceLocation: Location,
  targetLocation: Location,
  gameState: GameState
): boolean {
  //sourceLocation: is there a token?
  if (
    !gameState[parseInt(sourceLocation.row) - 1][axis[sourceLocation.column]]
  ) {
    console.log("source location KO");
    return true;
  }
  //targetLocation: is there a token?
  if (
    gameState[parseInt(targetLocation.row) - 1][axis[targetLocation.column]] !==
    null
  ) {
    console.log("target location KO");
    return true;
  }
  //sourceLocation && targetLocation: same row? same column?
  //cells between source and target empty?
  if (parseInt(targetLocation.row) === parseInt(sourceLocation.row)) {
    return isPathEmpty(sourceLocation, targetLocation, "row", gameState);
  } else if (sourceLocation.column === targetLocation.column) {
    return isPathEmpty(sourceLocation, targetLocation, "column", gameState);
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
      gameState[parseInt(sourceLocation.row) - 1][axis[sourceLocation.column]];

    gameState[parseInt(sourceLocation.row) - 1][axis[sourceLocation.column]] =
      null;
    //trgetLocation with the token
    gameState[parseInt(targetLocation.row) - 1][axis[targetLocation.column]] =
      token;
    return gameState;
  }
}
