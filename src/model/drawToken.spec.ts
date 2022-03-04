import { GameState } from "../GameStateTypes";
import { drawToken } from "./drawToken";

describe("draw token", () => {
  it("should draw a token", () => {
    const gameState: GameState = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      river: [],
    };
    const token = drawToken(gameState);
    expect(token).toBeDefined();

    const token2 = drawToken(gameState);
    expect(token2).toBeDefined();
    expect(
      token2.color == token.color && token2.symbol == token.symbol
    ).toBeFalsy();
  });

  it("should return null while drawing an empty stock", () => {
    const gameState: GameState = {
      board: [
        [
          { symbol: 0, color: 0 },
          { symbol: 0, color: 1 },
          { symbol: 0, color: 2 },
        ],
        [
          { symbol: 1, color: 0 },
          { symbol: 1, color: 1 },
          { symbol: 1, color: 2 },
        ],
        [
          { symbol: 2, color: 0 },
          { symbol: 2, color: 1 },
          { symbol: 2, color: 2 },
        ],
      ],
      river: [],
    };
    expect(drawToken(gameState)).toBeNull();
  });
});
