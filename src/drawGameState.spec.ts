import expect from "expect";

import { Colors } from "./Colors";
import { drawBoard, renderRiver, renderStock } from "./drawGameState";
import { createStockManager } from "./stock";

describe("draw gameState", () => {
  it("should draw the board", () => {
    let originalLogger = console.log;
    let output: string[] = [];
    console.log = (str: string) => {
      output.push(str);
    };
    let gameState = {
      board: [
        [{ color: 0, symbol: 0 }, null, { color: 1, symbol: 1 }],
        [null, { color: 0, symbol: 2 }, { color: 2, symbol: 2 }],
        [{ color: 0, symbol: 1 }, null, { color: 2, symbol: 1 }],
      ],
    };
    drawBoard(gameState.board);
    expect(output.length).toBe(8);
    expect(output[0]).toBe("     A   B   C  ");
    expect(output[1]).toBe("   ┌───┬───┬───┐");
    expect(output[2]).toBe(
      " 1 │ " +
        Colors.red +
        "❋" +
        Colors.reset +
        " │   │ " +
        Colors.green +
        "♕" +
        Colors.reset +
        " │"
    );
    expect(output[3]).toBe("   ├───┼───┼───┤");
    expect(output[4]).toBe(
      " 2 │   │ " +
        Colors.red +
        "◈" +
        Colors.reset +
        " │ " +
        Colors.yellow +
        "◈" +
        Colors.reset +
        " │"
    );
    expect(output[5]).toBe("   ├───┼───┼───┤");
    expect(output[6]).toBe(
      " 3 │ " +
        Colors.red +
        "♕" +
        Colors.reset +
        " │   │ " +
        Colors.yellow +
        "♕" +
        Colors.reset +
        " │"
    );
    expect(output[7]).toBe("   └───┴───┴───┘");

    console.log = originalLogger;
  });

  it("should display empty river", () => {
    let { riverNumberRow, riverTokenRow } = renderRiver([]);
    expect(riverNumberRow).toBe("RIVER ");
    expect(riverTokenRow).toBe("      ");
  });

  it("should display river", () => {
    let { riverNumberRow, riverTokenRow } = renderRiver([
      { color: 0, symbol: 1 },
      { color: 1, symbol: 2 },
    ]);
    expect(riverNumberRow).toBe("RIVER  1  2 ");
    expect(riverTokenRow).toBe(
      "       " +
        Colors.red +
        "♕" +
        Colors.reset +
        "  " +
        Colors.green +
        "◈" +
        Colors.reset +
        " "
    );
  });

  it("should display stock", () => {
    const gameState = {
      board: [
        [{ color: 0, symbol: 0 }, null, { color: 1, symbol: 1 }],
        [null, { color: 0, symbol: 2 }, { color: 2, symbol: 2 }],
        [{ color: 0, symbol: 1 }, null, { color: 2, symbol: 1 }],
      ],
      river: [],
    };
    const stockManager = createStockManager(gameState);
    const lines = renderStock(gameState, stockManager);
    expect(lines).toContain("STOCK\n");
    expect(lines).toContain(
      " " +
        Colors.green +
        "❋" +
        Colors.reset +
        "     " +
        Colors.green +
        "◈" +
        Colors.reset +
        " "
    );
  });
});
