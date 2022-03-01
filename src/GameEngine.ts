import { GameState } from "./GameStateTypes";
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
  let newGameState: GameState;
  const boardSize = gameState.board.length;
  const riverSize = gameState.river.length;
  let turnIsFinished = false;
  while (!turnIsFinished) {
    const turn = await askInputs(boardSize, riverSize);
    if (turn.locationInputs) {
      newGameState = await moveToken(turn.locationInputs, gameState);
    } else {
      newGameState = gameState;
    }
    //TODO newGameState = await placeToken(turn.tokenToPlace, newGameState);
    if (newGameState) {
      turnIsFinished = true;
    }
  }
  drawGameState(newGameState);
}
