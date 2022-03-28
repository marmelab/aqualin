import { GameState } from "../types";
import { fillRiver } from "./fillRiver";

it("should fill river", () => {
  let gameState: GameState = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    river: [],
    playerTurn: Color,
    moveDone: false,
  };
  gameState = fillRiver(gameState);
  expect(gameState.river.length).toEqual(3);
});

it("should fill river with partial river", () => {
  let gameState: GameState = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    river: [{ color: 0, symbol: 1 }],
    playerTurn: Color,
    moveDone: false,
  };
  gameState = fillRiver(gameState);
  expect(gameState.river.length).toEqual(3);
  expect(gameState.river).toEqual(
    expect.arrayContaining([expect.objectContaining({ color: 0, symbol: 1 })]),
  );
});
it("should not fill river with full river", () => {
  let gameState: GameState = {
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
    playerTurn: Color,
    moveDone: false,
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
  let gameState: GameState = {
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
    playerTurn: Color,
    moveDone: false,
  };
  gameState = fillRiver(gameState);
  expect(gameState.river).toEqual([
    { color: 0, symbol: 1 },
    { color: 0, symbol: 2 },
  ]);
});
