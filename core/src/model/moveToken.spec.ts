import expect from "expect";

import { GameState } from "../../../cli/src/GameStateTypes";
import { moveToken, parseColumns, parseRows } from "./moveToken";

const gameState: GameState = {
  board: [
    [{ color: 1, symbol: 1 }, null, null],
    [null, { color: 1, symbol: 3 }, null],
    [null, null, { color: 3, symbol: 2 }],
  ],
  river: [],
  playerTurn: "Color",
  moveDone: false,
};
describe("parseColumn()", () => {
  test("no token between A1 and C1", () => {
    expect(
      parseColumns({ row: 0, column: 0 }, { row: 0, column: 2 }, gameState),
    ).toBe(true);
  });

  test("no token between C3 and A3", () => {
    expect(
      parseColumns({ row: 2, column: 2 }, { row: 2, column: 0 }, gameState),
    ).toBe(true);
  });
  test("token between A2 and C2", () => {
    expect(
      parseColumns({ row: 1, column: 0 }, { row: 1, column: 2 }, gameState),
    ).toBe(false);
  });
});
describe("parseRows()", () => {
  test("no token between A1 and A3", () => {
    expect(
      parseRows({ row: 0, column: 0 }, { row: 2, column: 0 }, gameState),
    ).toBe(true);
  });

  test("no token between C3 and C1", () => {
    expect(
      parseRows({ row: 2, column: 2 }, { row: 0, column: 2 }, gameState),
    ).toBe(true);
  });

  test("token between B3 and B1", () => {
    expect(
      parseRows({ row: 2, column: 1 }, { row: 0, column: 1 }, gameState),
    ).toBe(false);
  });
});

describe("moveToken()", () => {
  it("should return the gameState after the move ", () => {
    const gameState: GameState = {
      board: [
        [{ color: 1, symbol: 1 }, null, null],
        [null, { color: 1, symbol: 3 }, null],
        [null, null, { color: 3, symbol: 2 }],
      ],
      river: [],
      playerTurn: "Color",
      moveDone: false,
    };
    const move = {
      source: { row: 0, column: 0 },
      target: { row: 0, column: 2 },
    };
    moveToken(move, gameState);
    expect(gameState).toEqual({
      board: [
        [null, null, { color: 1, symbol: 1 }],
        [null, { color: 1, symbol: 3 }, null],
        [null, null, { color: 3, symbol: 2 }],
      ],
      river: [],
      playerTurn: "Color",
      moveDone: true,
      selectedCoordinatesFromBoard: null,
    });
  });

  it("should throw an error if the  coordinates of the source token are empty", () => {
    expect(() => {
      const gameState: GameState = {
        board: [
          [{ color: 1, symbol: 1 }, null, null],
          [null, { color: 1, symbol: 3 }, null],
          [null, null, { color: 3, symbol: 2 }],
        ],
        river: [],
        playerTurn: "Color",
        moveDone: false,
      };
      const move = {
        source: { row: 0, column: 1 },
        target: { row: 0, column: 2 },
      };
      moveToken(move, gameState);
    }).toThrowError("Invalid source coordinates");
  });

  it("should throw an error if the  coordinates of the target token are occupied", () => {
    expect(() => {
      const gameState: GameState = {
        board: [
          [{ color: 1, symbol: 1 }, null, null],
          [null, { color: 1, symbol: 3 }, null],
          [null, null, { color: 3, symbol: 2 }],
        ],
        river: [],
        playerTurn: "Color",
        moveDone: false,
      };
      const move = {
        source: { row: 0, column: 0 },
        target: { row: 1, column: 1 },
      };
      moveToken(move, gameState);
    }).toThrowError("Invalid target coordinates");
  });

  it("should throw an error if the source and the target are not in the same row or in the same column", () => {
    expect(() => {
      const gameState: GameState = {
        board: [
          [{ color: 1, symbol: 1 }, null, null],
          [null, { color: 1, symbol: 3 }, null],
          [null, null, { color: 3, symbol: 2 }],
        ],
        river: [],
        playerTurn: "Color",
        moveDone: false,
      };
      const move = {
        source: { row: 0, column: 0 },
        target: { row: 1, column: 2 },
      };
      moveToken(move, gameState);
    }).toThrowError("Invalid move");
  });
});
