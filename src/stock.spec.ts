import expect from "expect";
import { GameState } from "./GameStateTypes";
import { createStockManager } from "./stock";

describe("stock handler", () => {
  it("should initiate", () => {
    const gameState: GameState = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      river: [],
    };
    const manager = createStockManager(gameState);
    expect(manager.stock.length).toBe(9);
    expect(manager.visualStock[0][0]).toBe(true);
    expect(manager.visualStock[0][1]).toBe(true);
    expect(manager.visualStock[1][0]).toBe(true);
  });

  it("should don't put in stock, token already in board", () => {
    const gameState: GameState = {
      board: [
        [{ symbol: 2, color: 1 }, null, null],
        [null, null, null],
        [null, null, null],
      ],
      river: [],
    };
    const manager = createStockManager(gameState);
    expect(manager.stock).toBe(8);
    expect(manager.visualStock[0][0]).toBe(true);
    expect(manager.visualStock[0][1]).toBe(true);
    expect(manager.visualStock[1][0]).toBe(true);
    expect(manager.visualStock[1][2]).toBe(false);
  });

  it("should don't put in stock, token already in second board row", () => {
    const gameState: GameState = {
      board: [
        [null, null, null],
        [null, { symbol: 2, color: 1 }, null],
        [null, null, null],
      ],
      river: [],
    };
    const manager = createStockManager(gameState);
    expect(manager.stock.length).toBe(8);
    expect(manager.visualStock[0][0]).toBe(true);
    expect(manager.visualStock[0][1]).toBe(true);
    expect(manager.visualStock[1][0]).toBe(true);
    expect(manager.visualStock[1][2]).toBe(false);
  });

  it("should don't put in stock, already in river", () => {
    const gameState: GameState = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      river: [{ symbol: 2, color: 1 }],
    };
    const manager = createStockManager(gameState);
    expect(manager.stock.length).toBe(8);
    expect(manager.visualStock[0][0]).toBe(true);
    expect(manager.visualStock[0][1]).toBe(true);
    expect(manager.visualStock[1][0]).toBe(true);
    expect(manager.visualStock[1][2]).toBe(false);
  });

  it("should draw a token", () => {
    const gameState: GameState = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      river: [],
    };
    const manager = createStockManager(gameState);
    const token = manager.drawToken();
    expect("token").toBeDefined();
    expect(manager.stock.length).toBe(8);
    expect(manager.visualStock[token.color][token.symbol]).toBe(false);

    const token2 = manager.drawToken();
    expect("token").toBeDefined();
    expect(
      token2.color == token.color && token2.symbol == token.symbol
    ).toBeFalsy();
    expect(manager.stock.length).toBe(7);
    expect(manager.visualStock[token2.color][token2.symbol]).toBe(false);
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
    const manager = createStockManager(gameState);
    const token = manager.drawToken();
    expect(token).toBeNull();
  });
});
