import { GameState } from "./GameStateTypes";
import fs from "fs";
import { drawGameState } from "./drawGameState";
import { askInputs } from "./askInputs";
import { moveToken } from "./moveToken";
import { initStock } from "./stock";

export async function main(args: string[]) {
  const myArgs = args.slice(2);

  const myConfigFileName = myArgs[0].split("=")[1];

  const data = fs.readFileSync(myConfigFileName, "utf8");

  let gameState = JSON.parse(data) as GameState;

  const boardSize = gameState.board.length;

  initStock(gameState);

  drawGameState(gameState);
  let newGameState: GameState;

  while (!newGameState) {
    const locationInputs = await askInputs(boardSize);
    newGameState = await moveToken(locationInputs, gameState);
  }
  drawGameState(newGameState);
}
