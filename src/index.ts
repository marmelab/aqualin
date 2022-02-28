import { GameState } from "./GameState";
import fs from "fs";
import { RED, COLOR_RESET, GREEN, YELLOW } from "./Colors";

const symbols = { 1: "❋", 2: "♕", 3: "◈" };

const colors = { 1: RED, 2: GREEN, 3: YELLOW };
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
          ? colors[cell.color] + symbols[cell.symbol] + COLOR_RESET + " "
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

export function main(args: string[]) {
  const myArgs = args.slice(2);

  const myConfigFileName = myArgs[0].split("=")[1];

  const data = fs.readFileSync(myConfigFileName, "utf8");

  let gameState = JSON.parse(data) as GameState;
  drawGameState(gameState);
}

if (process.env.JEST_WORKER_ID === undefined) {
  main(process.argv);
}
