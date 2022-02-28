import { Colors, DataColors } from "./Colors";
import { GameState } from "./GameState";
import { Symbols } from "./Symbols";

const topLine = "┌───┬───┬───┐";
const rowLine = "├───┼───┼───┤";
const baseLine = "└───┴───┴───┘";

export function drawGameState(gameState: GameState) {
  console.log(topLine);
  for (let i = 0; i < gameState.length; i++) {
    let rowCharacters = "│";
    for (let j = 0; j < gameState[i].length; j++) {
      let cell = gameState[i][j];
      rowCharacters +=
        " " +
        (cell
          ? DataColors[cell.color] + Symbols[cell.symbol] + Colors.reset + " "
          : "  ") +
        "│";
    }
    console.log(rowCharacters);
    if (i !== gameState.length - 1) {
      console.log(rowLine);
    }
  }
  console.log(baseLine);
}
