import { GameState } from "../GameStateTypes";
import { fillRiver } from "./fillRiver";
import { initGameState } from "./initGameState";

describe("initialization", () => {
  it("should init new empty game state", () => {
    const gameState = initGameState([]);
    expect(gameState.board).toEqual([
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ]);
    expect(gameState.river.length).toEqual(6);
  });
  it("should init game state from file", () => {
    const gameState = initGameState([
      "node",
      "myscript",
      "-f=fixture/saved-game-state-example.json",
    ]);
    expect(gameState.board).toEqual([
      [{ color: 0, symbol: 0 }, null, { color: 1, symbol: 1 }],
      [null, { color: 0, symbol: 2 }, { color: 2, symbol: 2 }],
      [{ color: 2, symbol: 1 }, null, null],
    ]);
    expect(gameState.river[0]).toEqual({ color: 0, symbol: 1 });
    expect(gameState.river[1]).toEqual({ color: 1, symbol: 2 });
    expect(gameState.river.length).toBe(3);
  });
});
