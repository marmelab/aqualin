import fs from "fs";

import { askInputs } from "./askInputs";
import { drawGameState } from "./drawGameState";
import { GameState } from "./GameStateTypes";
import { moveToken } from "./moveToken";
import { createStockManager } from "./stock";

export async function main(args: string[]) {
  const myArgs = args.slice(2);

  const myConfigFileName = myArgs[0].split("=")[1];

  const data = fs.readFileSync(myConfigFileName, "utf8");

  let gameState = JSON.parse(data) as GameState;

  const boardSize = gameState.board.length;

  const stockManager = createStockManager(gameState);

  drawGameState(gameState, stockManager);
  let newGameState: GameState;

  while (!newGameState) {
    const locationInputs = await askInputs(boardSize);
    newGameState = await moveToken(locationInputs, gameState);
  }
  drawGameState(newGameState, stockManager);
}
