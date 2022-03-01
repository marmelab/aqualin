import { GameState } from "./GameState";
import fs from "fs";
import { drawGameState } from "./drawGameState";
import { askInputs } from "./askInputs";
import { moveToken } from "./moveToken";

export async function main(args: string[]) {
  const myArgs = args.slice(2);

  const myConfigFileName = myArgs[0].split("=")[1];

  const data = fs.readFileSync(myConfigFileName, "utf8");

  let gameState = JSON.parse(data) as GameState;
  drawGameState(gameState);

  let boardSize;

  boardSize = gameState.length;
  console.log(boardSize);

  const locationInputs = await askInputs(boardSize);
  moveToken(locationInputs, gameState);
}
