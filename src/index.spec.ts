import expect from "expect";
import { drawGameState } from ".";
import { RED, COLOR_RESET, GREEN, YELLOW } from "./Colors";

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
        RED +
        "❋" +
        COLOR_RESET +
        " │   │ " +
        GREEN +
        "♕" +
        COLOR_RESET +
        " │"
    );
    expect(output[2]).toBe("├───┼───┼───┤");
    expect(output[3]).toBe(
      "│   │ " +
        RED +
        "◈" +
        COLOR_RESET +
        " │ " +
        YELLOW +
        "◈" +
        COLOR_RESET +
        " │"
    );
    expect(output[4]).toBe("├───┼───┼───┤");
    expect(output[5]).toBe(
      "│ " +
        RED +
        "♕" +
        COLOR_RESET +
        " │   │ " +
        YELLOW +
        "♕" +
        COLOR_RESET +
        " │"
    );
    expect(output[6]).toBe("└───┴───┴───┘");
    console.log = originalLogger;
  });
});
