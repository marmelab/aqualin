import { GameState } from "../types";
import { computeStock } from "./computeStock";

describe("stock handler", () => {
  it("should initiate", () => {
    const gameState: GameState = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      river: [],
      playerTurn: "Color",
      moveDone: false,
    };
    const stock = computeStock(gameState);
    expect(stock.stock.length).toBe(9);
    expect(stock.visualStock[0][0]).toBe(true);
    expect(stock.visualStock[0][1]).toBe(true);
    expect(stock.visualStock[1][0]).toBe(true);
  });

  it("should don't put in stock with token already in board", () => {
    const gameState: GameState = {
      board: [
        [{ symbol: 2, color: 1 }, null, null],
        [null, null, null],
        [null, null, null],
      ],
      river: [],
      playerTurn: "Color",
      moveDone: false,
    };
    const stock = computeStock(gameState);
    expect(stock.stock.length).toBe(8);
    expect(stock.visualStock[0][0]).toBe(true);
    expect(stock.visualStock[0][1]).toBe(true);
    expect(stock.visualStock[1][0]).toBe(true);
    expect(stock.visualStock[1][2]).toBe(false);
  });

  it("should don't put in stock with token already in second board row", () => {
    const gameState: GameState = {
      board: [
        [null, null, null],
        [null, { symbol: 2, color: 1 }, null],
        [null, null, null],
      ],
      river: [],
      playerTurn: "Color",
      moveDone: false,
    };
    const stock = computeStock(gameState);
    expect(stock.stock.length).toBe(8);
    expect(stock.visualStock[0][0]).toBe(true);
    expect(stock.visualStock[0][1]).toBe(true);
    expect(stock.visualStock[1][0]).toBe(true);
    expect(stock.visualStock[1][2]).toBe(false);
  });

  it("should don't put in stock with already in river", () => {
    const gameState: GameState = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      river: [{ symbol: 2, color: 1 }],
      playerTurn: "Color",
      moveDone: false,
    };
    const stock = computeStock(gameState);
    expect(stock.stock.length).toBe(8);
    expect(stock.visualStock[0][0]).toBe(true);
    expect(stock.visualStock[0][1]).toBe(true);
    expect(stock.visualStock[1][0]).toBe(true);
    expect(stock.visualStock[1][2]).toBe(false);
  });
});
