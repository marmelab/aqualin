import expect from "expect";

import { parseColumns, parseRows } from "./moveToken";

const gameState = {
  board: [
    [{ color: 1, symbol: 1 }, null, null],
    [null, { color: 1, symbol: 3 }, null],
    [null, null, { color: 3, symbol: 2 }],
  ],
  river: [],
};

test("no token between A1 and C1", () => {
  expect(
    parseColumns({ row: 0, column: 0 }, { row: 0, column: 2 }, gameState)
  ).toBe(true);
});

test("no token between C3 and A3", () => {
  expect(
    parseColumns({ row: 2, column: 2 }, { row: 2, column: 0 }, gameState)
  ).toBe(true);
});
test("token between A2 and C2", () => {
  expect(
    parseColumns({ row: 1, column: 0 }, { row: 1, column: 2 }, gameState)
  ).toBe(false);
});
test("no token between A1 and A3", () => {
  expect(
    parseRows({ row: 0, column: 0 }, { row: 2, column: 0 }, gameState)
  ).toBe(true);
});

test("no token between C3 and C1", () => {
  expect(
    parseRows({ row: 2, column: 2 }, { row: 0, column: 2 }, gameState)
  ).toBe(true);
});

test("token between B3 and B1", () => {
  expect(
    parseRows({ row: 2, column: 1 }, { row: 0, column: 1 }, gameState)
  ).toBe(false);
});
