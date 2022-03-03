import { placeToken } from "./placeToken";
import { createStockManager } from "./stock";

describe("paceToken()", () => {
  it("should place a token from the river on the board target coordinates", () => {
    const gameState = {
      board: [
        [{ color: 1, symbol: 1 }, null, null],
        [null, { color: 1, symbol: 3 }, null],
        [null, null, { color: 3, symbol: 2 }],
      ],
      river: [
        { color: 0, symbol: 1 },
        { color: 1, symbol: 2 },
      ],
    };
    const tokenToPlace = {
      riverToken: 1,
      coordinates: { row: 0, column: 1 },
    };
    const stockManager = createStockManager(gameState);
    placeToken(tokenToPlace, gameState, stockManager);
    expect(gameState.board).toEqual([
      [{ color: 1, symbol: 1 }, { color: 1, symbol: 2 }, null],
      [null, { color: 1, symbol: 3 }, null],
      [null, null, { color: 3, symbol: 2 }],
    ]);
  });

  it("should throw an error if the river slot is empty", () => {
    expect(() => {
      const gameState = {
        board: [
          [{ color: 1, symbol: 1 }, null, null],
          [null, { color: 1, symbol: 3 }, null],
          [null, null, { color: 3, symbol: 2 }],
        ],
        river: [
          { color: 0, symbol: 1 },
          { color: 1, symbol: 2 },
        ],
      };
      const tokenToPlace = {
        riverToken: 2,
        coordinates: { row: 0, column: 1 },
      };
      const stockManager = createStockManager(gameState);
      placeToken(tokenToPlace, gameState, stockManager);
    }).toThrowError("The river token slot is empty");
  });

  it("should throw an error if the target is occupied", () => {
    expect(() => {
      const gameState = {
        board: [
          [{ color: 1, symbol: 1 }, null, null],
          [null, { color: 1, symbol: 3 }, null],
          [null, null, { color: 3, symbol: 2 }],
        ],
        river: [
          { color: 0, symbol: 1 },
          { color: 1, symbol: 2 },
        ],
      };
      const tokenToPlace = {
        riverToken: 1,
        coordinates: { row: 0, column: 0 },
      };
      const stockManager = createStockManager(gameState);
      placeToken(tokenToPlace, gameState, stockManager);
    }).toThrowError("The river token target coordinates are occupied");
  });
});
