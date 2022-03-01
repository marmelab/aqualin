import expect from "expect";
import { parseColumns, parseRows } from "./moveToken";

const gameState = [
  [{ color: 1, symbol: 1 }, null, null],
  [null, { color: 1, symbol: 3 }, null],
  [null, null, { color: 3, symbol: 2 }],
];

test("no token betwwen A1 and C1", () => {
  expect(
    parseColumns({ row: 0, column: 0 }, { row: 0, column: 2 }, gameState)
  ).toBe(false);
});

test("no token betwwen C3 and A3", () => {
  expect(
    parseColumns({ row: 2, column: 2 }, { row: 2, column: 0 }, gameState)
  ).toBe(false);
});
test("token betwwen A2 and C2", () => {
  expect(
    parseColumns({ row: 1, column: 0 }, { row: 1, column: 2 }, gameState)
  ).toBe(true);
});
test("no token betwwen A1 and A3", () => {
  expect(
    parseRows({ row: 0, column: 0 }, { row: 2, column: 0 }, gameState)
  ).toBe(false);
});

test("no token betwwen C3 and C1", () => {
  expect(
    parseRows({ row: 2, column: 2 }, { row: 0, column: 2 }, gameState)
  ).toBe(false);
});

test("token betwwen B3 and B1", () => {
  expect(
    parseRows({ row: 2, column: 1 }, { row: 0, column: 1 }, gameState)
  ).toBe(true);
});
