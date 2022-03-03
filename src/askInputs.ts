import { axis } from "./axis";
import { Move, TokenToPlace, Turn, Coordinates } from "./types";
import prompt from "prompt";
import readline from "readline";
import { ImportsNotUsedAsValues } from "typescript";

export async function askInputs(
  boardSize: number,
  riverSize: number
): Promise<Turn> {
  prompt.start();
  while (true) {
    try {
      let { typedInputs } = await prompt.get([
        {
          name: "typedInputs",
          description: "Enter your move (ex: A1 B1 3 B2 or 3 B2)",
          required: true,
        },
      ]);
      const turn = parseInput(typedInputs, boardSize, riverSize);
      return turn;
    } catch (e) {
      console.log(e.message);
      // do nothing and iterate again in the while loop
    }
  }
}

export function parseInput(
  input: string,
  boardSize: number = 6,
  riverSize: number = 6
): Turn {
  let move: Move;
  let tokenToPlace: TokenToPlace;
  let turn: Turn;
  let inputs = input.split(" ");
  if (inputs.length !== 2 && inputs.length !== 4 && inputs.length !== 1) {
    throw new Error("Invalid input");
  }
  if (inputs.length === 4) {
    // input includes a move and a token to place
    const [sourcecoordinates, targetcoordinates, token, coordinates] = inputs;
    move = getMove(sourcecoordinates, targetcoordinates, boardSize);
    tokenToPlace = getTokenToPlace(coordinates, token, riverSize, boardSize);
    if (!move || !tokenToPlace) {
      throw new Error("Invalid move or token to place");
    }
    return { move, tokenToPlace, coordinates: null };
  }
  if (inputs.length === 2) {
    // input does not include a move, just a a token to place
    const [token, coordinates] = inputs;
    tokenToPlace = getTokenToPlace(coordinates, token, riverSize, boardSize);

    if (!tokenToPlace) {
      throw new Error("Invalid token to place");
    }
    return { move: null, tokenToPlace, coordinates: null };
  }
  if (inputs.length === 1) {
    //highlight possibilities
    let [coordinates] = inputs;
    const [column, row] = coordinates.split("");
    if (
      isRowOutOfRange(getRowIndex(row), boardSize) ||
      isColumnOutOfRange(column, boardSize)
    ) {
      throw new Error("Invalid coordinates");
    }

    return {
      move: null,
      tokenToPlace: null,
      coordinates: {
        column: getColumnIndex(column),
        row: getRowIndex(row),
      },
    };
  }
}

function getRiverIndex(token: string): number {
  return parseInt(token) - 1;
}

function getRowIndex(row: string): number {
  return parseInt(row) - 1;
}

function getColumnIndex(column: string): number {
  return axis[column];
}

function isRowOutOfRange(row: number, boardSize: number): boolean {
  if (0 <= row && row < boardSize) {
    return false;
  }
  return true;
}

function isColumnOutOfRange(column: string, boardSize: number): boolean {
  if (0 <= parseInt(axis[column]) && parseInt(axis[column]) < boardSize) {
    return false;
  }
  return true;
}

function getMove(
  sourcecoordinates: string,
  targetcoordinates: string,
  boardSize: number
): Move {
  const [sourceColumn, sourceRow] = sourcecoordinates.split("");
  const [targetColumn, targetRow] = targetcoordinates.split("");
  if (
    isRowOutOfRange(getRowIndex(sourceRow), boardSize) ||
    isRowOutOfRange(getRowIndex(targetRow), boardSize) ||
    isColumnOutOfRange(sourceColumn, boardSize) ||
    isColumnOutOfRange(targetColumn, boardSize)
  ) {
    throw new Error("Invalid move");
  }

  return {
    source: {
      column: getColumnIndex(sourceColumn),
      row: getRowIndex(sourceRow),
    },
    target: {
      column: getColumnIndex(targetColumn),
      row: getRowIndex(targetRow),
    },
  };
}

function isTokenInRiver(token: string, riverSize: number): boolean {
  if (parseInt(token) > riverSize) {
    throw new Error("Invalid token");
  }
  return true;
}

function validateChosenCoordinates(
  coordinates: string,
  boardSize: number
): Coordinates {
  const [column, row] = coordinates.split("");
  if (
    isRowOutOfRange(getRowIndex(row), boardSize) ||
    isColumnOutOfRange(column, boardSize)
  ) {
    throw new Error("Wrong coordinates for the choosen token");
  }
  return {
    column: getColumnIndex(column),
    row: getRowIndex(row),
  };
}

function getTokenToPlace(
  coordinates: string,
  token: string,
  riverSize: number,
  boardSize: number
): TokenToPlace {
  let riverToken: number;
  let chosenCoordinates: Coordinates;

  if (isNaN(parseInt(token))) {
    throw new Error("Invalid token");
  }
  if (!isTokenInRiver(token, riverSize)) {
    throw new Error("You need to type a number for the choosen token");
  }
  riverToken = getRiverIndex(token);

  chosenCoordinates = validateChosenCoordinates(coordinates, boardSize);

  if (!chosenCoordinates || riverToken == null) {
    throw new Error("Invalid token to place");
  }

  return { riverToken: riverToken, coordinates: chosenCoordinates };
}
