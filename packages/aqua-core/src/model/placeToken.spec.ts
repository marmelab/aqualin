import { PlayerColor } from "../Players";
import { GameState } from "../types";
import { placeToken } from "./placeToken";

describe("paceToken()", () => {
  it("should place a token from the river on the board target coordinates", () => {
    const gameState: GameState = {
      board: [
        [{ color: 1, symbol: 1 }, null, null],
        [null, { color: 1, symbol: 3 }, null],
        [null, null, { color: 3, symbol: 2 }],
      ],
      river: [
        { color: 0, symbol: 1 },
        { color: 1, symbol: 2 },
      ],
      playerTurn: PlayerColor,
      moveDone: false,
    };
    const tokenToPlace = {
      indexRiverToken: 1,
      coordinates: { row: 0, column: 1 },
    };
    placeToken(tokenToPlace, gameState);
    expect(gameState.board).toEqual([
      [{ color: 1, symbol: 1 }, { color: 1, symbol: 2 }, null],
      [null, { color: 1, symbol: 3 }, null],
      [null, null, { color: 3, symbol: 2 }],
    ]);
  });

  it("should throw an error if the river slot is empty", () => {
    expect(() => {
      const gameState: GameState = {
        board: [
          [{ color: 1, symbol: 1 }, null, null],
          [null, { color: 1, symbol: 3 }, null],
          [null, null, { color: 3, symbol: 2 }],
        ],
        river: [
          { color: 0, symbol: 1 },
          { color: 1, symbol: 2 },
        ],
        playerTurn: PlayerColor,
        moveDone: false,
      };
      const tokenToPlace = {
        indexRiverToken: 2,
        coordinates: { row: 0, column: 1 },
      };
      placeToken(tokenToPlace, gameState);
    }).toThrowError("The river token slot is empty");
  });

  it("should throw an error if the target is occupied", () => {
    expect(() => {
      const gameState: GameState = {
        board: [
          [{ color: 1, symbol: 1 }, null, null],
          [null, { color: 1, symbol: 3 }, null],
          [null, null, { color: 3, symbol: 2 }],
        ],
        river: [
          { color: 0, symbol: 1 },
          { color: 1, symbol: 2 },
        ],
        playerTurn: PlayerColor,
        moveDone: false,
      };
      const tokenToPlace = {
        indexRiverToken: 1,
        coordinates: { row: 0, column: 0 },
      };
      placeToken(tokenToPlace, gameState);
    }).toThrowError("Invalid target coordinates");
  });
});
