import { GameState } from "./GameStateTypes";
import fs from "fs";
import { drawGameState } from "./drawGameState";
import { askInputs } from "./askInputs";
import { moveToken } from "./moveToken";
import { placeToken } from "./placeToken";

import { highlightCoordinates } from "./highlightCoordinates";
import { deepClone } from "./utils";
import { createStockManager } from "./stock";

export async function main(args: string[]) {
  const myArgs = args.slice(2);
  const myConfigFileName = myArgs[0].split("=")[1];
  const data = fs.readFileSync(myConfigFileName, "utf8");

  let gameState = JSON.parse(data) as GameState;

  const stockManager = createStockManager(gameState);

  const boardSize = gameState.board.length;
  const riverSize = gameState.river.length;
  let onGoingGameState: GameState;
  let highlightedGameState = deepClone(gameState) as GameState;
  let turnIsFinished = false;
  let newGameState: GameState;

  drawGameState(gameState, stockManager);

  while (!turnIsFinished) {
    onGoingGameState = deepClone(gameState) as GameState;
    const turn = await askInputs(boardSize, riverSize);
    try {
      if (turn.coordinates) {
        //highlight possibilities
        highlightedGameState = highlightCoordinates(
          turn.coordinates,
          highlightedGameState
        );

        drawGameState(highlightedGameState, stockManager);
      }
      if (turn.move) {
        onGoingGameState = moveToken(turn.move, onGoingGameState);
      }
      if (turn.tokenToPlace) {
        onGoingGameState = placeToken(turn.tokenToPlace, onGoingGameState);
        turnIsFinished = true;
      }
    } catch (e) {
      console.log(e.message);
      // do nothing and iterate again in the while loop
    }
  }

  drawGameState(newGameState, stockManager);
}
