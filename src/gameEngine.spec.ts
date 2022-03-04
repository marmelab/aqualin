import expect from "expect";

import { initGameState } from "./GameEngine";
import { fillRiver } from "./model/fillRiver";

describe("initialization", () => {
  it("should init new empty game state", () => {
    const gameState = initGameState([]);
    expect(gameState).toEqual({
      board: [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ],
      river: [],
    });
  });
  it("should init game state from file", () => {
    const gameState = initGameState([
      "node",
      "myscript",
      "-f=fixture/saved-game-state-example.json",
    ]);
    expect(gameState).toEqual({
      board: [
        [{ color: 0, symbol: 0 }, null, { color: 1, symbol: 1 }],
        [null, { color: 0, symbol: 2 }, { color: 2, symbol: 2 }],
        [{ color: 2, symbol: 1 }, null, null],
      ],
      river: [
        { color: 0, symbol: 1 },
        { color: 1, symbol: 2 },
      ],
    });
  });
  it("should fill river", () => {
    let gameState = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      river: [],
    };
    gameState = fillRiver(gameState);
    expect(gameState.river.length).toEqual(3);
  });

  it("should fill river with partial river", () => {
    let gameState = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      river: [{ color: 0, symbol: 1 }],
    };
    gameState = fillRiver(gameState);
    expect(gameState.river.length).toEqual(3);
    expect(gameState.river).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 0, symbol: 1 })])
    );
  });
  it("should not fill river with full river", () => {
    let gameState = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      river: [
        { color: 0, symbol: 1 },
        { color: 0, symbol: 2 },
        { color: 0, symbol: 3 },
      ],
    };
    gameState = fillRiver(gameState);
    expect(gameState.river.length).toEqual(3);
    expect(gameState.river).toEqual([
      { color: 0, symbol: 1 },
      { color: 0, symbol: 2 },
      { color: 0, symbol: 3 },
    ]);
  });

  it("should not fill river with empty stock", () => {
    let gameState = {
      board: [
        [{ color: 0, symbol: 0 }, null, null],
        [
          { color: 1, symbol: 0 },
          { color: 1, symbol: 1 },
          { color: 1, symbol: 2 },
        ],
        [
          { color: 2, symbol: 0 },
          { color: 2, symbol: 1 },
          { color: 2, symbol: 2 },
        ],
      ],
      river: [
        { color: 0, symbol: 1 },
        { color: 0, symbol: 2 },
      ],
    };
    gameState = fillRiver(gameState);
    expect(gameState.river).toEqual([
      { color: 0, symbol: 1 },
      { color: 0, symbol: 2 },
    ]);
  });
});
