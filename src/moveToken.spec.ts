import expect from "expect";
import { parseColumns, parseRows } from "./moveToken";

const gameState = [
  [{ color: 1, symbol: 1 }, null, null],
  [null, { color: 1, symbol: 3 }, null],
  [null, null, { color: 3, symbol: 2 }],
];

test("no token betwwen A1 and C1", () => {
  expect(
    parseColumns(
      { row: "1", column: "A" },
      { row: "1", column: "C" },
      gameState
    )
  ).toBe(false);
});

test("no token betwwen C3 and A3", () => {
  expect(
    parseColumns(
      { row: "3", column: "C" },
      { row: "3", column: "A" },
      gameState
    )
  ).toBe(false);
});
test("token betwwen A2 and C2", () => {
  expect(
    parseColumns(
      { row: "2", column: "A" },
      { row: "2", column: "C" },
      gameState
    )
  ).toBe(true);
});
test("no token betwwen A1 and A3", () => {
  expect(
    parseRows({ row: "1", column: "A" }, { row: "3", column: "A" }, gameState)
  ).toBe(false);
});

test("no token betwwen C3 and C1", () => {
  expect(
    parseRows({ row: "3", column: "C" }, { row: "1", column: "C" }, gameState)
  ).toBe(false);
});

test("token betwwen B3 and B1", () => {
  expect(
    parseRows({ row: "3", column: "B" }, { row: "1", column: "B" }, gameState)
  ).toBe(true);
});
