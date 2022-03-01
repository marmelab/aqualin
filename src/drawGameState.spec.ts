import expect from "expect";
import { drawBoard } from "./drawGameState";
import { Colors } from "./Colors";

describe("draw gameState", () => {
  it("should draw the board", () => {
    let originalLogger = console.log;
    let output: string[] = [];
    console.log = (str: string) => {
      output.push(str);
    };
    let gameState = {
      board: [
        [{ color: 1, symbol: 1 }, null, { color: 2, symbol: 2 }],
        [null, { color: 1, symbol: 3 }, { color: 3, symbol: 3 }],
        [{ color: 1, symbol: 2 }, null, { color: 3, symbol: 2 }],
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
});
