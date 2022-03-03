import { getPossibleMoves } from "./highlightCoordinates";

describe("getPossibleMoves", () => {
  it("should return a table of possible cells when we choose a Token(A1)", () => {
    let gameState = {
      board: [
        [{ color: 1, symbol: 2 }, null, { color: 1, symbol: 1 }],
        [null, { color: 0, symbol: 2 }, { color: 2, symbol: 0 }],
        [{ color: 0, symbol: 1 }, null, { color: 2, symbol: 1 }],
      ],
      river: [
        { color: 0, symbol: 1 },
        { color: 1, symbol: 2 },
      ],
    };
    let possibleCells = getPossibleMoves(gameState.board, {
      column: 0,
      row: 0,
    });

    expect(possibleCells).toEqual([
      { row: 0, column: 1 },
      { row: 1, column: 0 },
    ]);
  });

  it("should return an empty array when there is no possible move(C2)", () => {
    let gameState = {
      board: [
        [{ color: 1, symbol: 2 }, null, { color: 1, symbol: 1 }],
        [null, { color: 0, symbol: 2 }, { color: 2, symbol: 0 }],
        [{ color: 0, symbol: 1 }, null, { color: 2, symbol: 1 }],
      ],
      river: [
        { color: 0, symbol: 1 },
        { color: 1, symbol: 2 },
      ],
    };
    let possibleCells = getPossibleMoves(gameState.board, {
      column: 2,
      row: 1,
    });

    expect(possibleCells).toEqual([]);
  });
});
