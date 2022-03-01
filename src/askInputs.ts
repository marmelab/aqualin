import readline from "readline";
import prompt from "prompt";
import { axis } from "./axis";
import { LocationInputs, TokenToPlace, Turn, Location } from "./types";
import { Token } from "./GameStateTypes";

function getRowIndex(row: string): number {
  return parseInt(row) - 1;
}

function getColumnIndex(column: string): number {
  return axis[column];
}
function rowOutOfRange(row: number, boardSize: number): boolean {
  if (0 <= row && row < boardSize) {
    return false;
  }
  return true;
}
function columnOutOfRange(
  column: string,

  boardSize: number
): boolean {
  if (0 <= parseInt(axis[column]) && parseInt(axis[column]) < boardSize) {
    return false;
  }
  return true;
}

function getMoveLocations(
  sourceLocation: string,
  targetLocation: string,
  boardSize: number
): LocationInputs {
  let locationInputs: LocationInputs;
  const [sourceColumn, sourceRow] = sourceLocation.split("");
  const [targetColumn, targetRow] = targetLocation.split("");
  if (
    !rowOutOfRange(getRowIndex(sourceRow), boardSize) &&
    !rowOutOfRange(getRowIndex(targetRow), boardSize) &&
    !columnOutOfRange(sourceColumn, boardSize) &&
    !columnOutOfRange(targetColumn, boardSize)
  ) {
    locationInputs = {
      sourceLocation: {
        column: getColumnIndex(sourceColumn),
        row: getRowIndex(sourceRow),
      },
      targetLocation: {
        column: getColumnIndex(targetColumn),
        row: getRowIndex(targetRow),
      },
    };
    return locationInputs;
  } else {
    console.log("Wrong inputs");
    return null;
  }
}
function tokenInRiver(token: string, riverSize: number): boolean {
  if (parseInt(token) <= riverSize) {
    return true;
  } else {
    console.log("wrong choosen token");
    return false;
  }
}
function validateChoosenLocation(
  location: string,
  boardSize: number
): Location {
  const [column, row] = location.split("");
  if (
    !rowOutOfRange(getRowIndex(row), boardSize) &&
    !columnOutOfRange(column, boardSize)
  ) {
    return {
      column: getColumnIndex(column),
      row: getRowIndex(row),
    };
  } else {
    console.log("Wrong location for the choosen token");
    return null;
  }
}
function getTokenToPlace(
  location: string,
  token: string,
  riverSize: number,
  boardSize: number
): TokenToPlace {
  let choosenToken: number;
  let choosenLocation: Location;

  if (!isNaN(parseInt(token))) {
    if (tokenInRiver(token, riverSize)) {
      choosenToken = parseInt(token);
      choosenLocation = validateChoosenLocation(location, boardSize);
    }
  } else {
    console.log("You need to type a number for the choosen token");
  }

  if (choosenLocation && choosenToken) {
    return { choosenToken: choosenToken, location: choosenLocation };
  } else {
    return null;
  }
}

export async function askInputs(
  boardSize: number,
  riverSize: number
): Promise<Turn> {
  let locationInputs: LocationInputs;
  let tokenToPlace: TokenToPlace;
  let turn: Turn;

  prompt.start();
  while (true) {
    let { typedInputs } = await prompt.get([
      {
        name: "typedInputs",
        description: "Enter your move (ex: A1 B1 3 B2 or 3 B2)",
        required: true,
      },
    ]);

    let inputs = typedInputs.split(" ");
    if (inputs.length === 4) {
      const [sourceLocation, targetLocation, token, location] = inputs;
      locationInputs = getMoveLocations(
        sourceLocation,
        targetLocation,
        boardSize
      );

      tokenToPlace = getTokenToPlace(location, token, riverSize, boardSize);
      if (locationInputs && tokenToPlace) {
        return { locationInputs: locationInputs, tokenToPlace: tokenToPlace };
      }
    } else if (inputs.length === 2) {
      const [token, location] = inputs;
      tokenToPlace = getTokenToPlace(location, token, riverSize, boardSize);

      if (tokenToPlace) {
        return { locationInputs: null, tokenToPlace: tokenToPlace };
      }
    }
  }
}
