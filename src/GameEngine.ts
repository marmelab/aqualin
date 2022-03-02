import { GameState } from "./GameStateTypes";
import fs from "fs";
import { drawGameState } from "./drawGameState";
import { askInputs } from "./askInputs";
import { moveToken } from "./moveToken";
import { placeToken } from "./placeToken";
import { createStockManager } from "./stock";

export async function main(args: string[]) {
  const myArgs = args.slice(2);

  const myConfigFileName = myArgs[0].split("=")[1];

  const data = fs.readFileSync(myConfigFileName, "utf8");

  let gameState = JSON.parse(data) as GameState;
  const stockManager = createStockManager(gameState);

  drawGameState(gameState, stockManager);
  const boardSize = gameState.board.length;
  const riverSize = gameState.river.length;
  let turnIsFinished = false;
  let newGameState: GameState;

  while (!turnIsFinished) {
    const turn = await askInputs(boardSize, riverSize);
    if (turn.move) {
      newGameState = await moveToken(turn.move, gameState);
    }
    newGameState = await placeToken(
      turn.tokenToPlace,
      newGameState ? newGameState : gameState
    );
    if (newGameState) {
      turnIsFinished = true;
    }
  }

  drawGameState(newGameState, stockManager);
}
