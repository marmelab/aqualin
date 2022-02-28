import expect from "expect";
import { drawGameState } from "./drawGameState";
import { Colors } from "./Colors";

describe("draw gameState", () => {
  it("should draw the gamestate", () => {
    let originalLogger = console.log;
    let output: string[] = [];
    console.log = (str: string) => {
      output.push(str);
    };
    let gameState = [
      [{ color: 1, symbol: 1 }, null, { color: 2, symbol: 2 }],
      [null, { color: 1, symbol: 3 }, { color: 3, symbol: 3 }],
      [{ color: 1, symbol: 2 }, null, { color: 3, symbol: 2 }],
    ];
    drawGameState(gameState);
    expect(output.length).toBe(7);
    expect(output[0]).toBe("┌───┬───┬───┐");
    expect(output[1]).toBe(
      "│ " +
        Colors.red +
        "❋" +
        Colors.reset +
        " │   │ " +
        Colors.green +
        "♕" +
        Colors.reset +
        " │"
    );
    expect(output[2]).toBe("├───┼───┼───┤");
    expect(output[3]).toBe(
      "│   │ " +
        Colors.red +
        "◈" +
        Colors.reset +
        " │ " +
        Colors.yellow +
        "◈" +
        Colors.reset +
        " │"
    );
    expect(output[4]).toBe("├───┼───┼───┤");
    expect(output[5]).toBe(
      "│ " +
        Colors.red +
        "♕" +
        Colors.reset +
        " │   │ " +
        Colors.yellow +
        "♕" +
        Colors.reset +
        " │"
    );
    expect(output[6]).toBe("└───┴───┴───┘");
    console.log = originalLogger;
  });
});
