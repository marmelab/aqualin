import { GameState } from "./GameStateTypes";
import { askInputs } from "./askInputs";
import { drawGameState } from "./drawGameState";
import { highlightCoordinates } from "./highlightCoordinates";
import { moveToken } from "./moveToken";
import { placeToken } from "./placeToken";
import { createStockManager } from "./stock";
import { deepClone } from "./utils";
import fs from "fs";

export async function main(args: string[]) {
  const myArgs = args.slice(2);
  const myConfigFileName = myArgs[0].split("=")[1];
  const data = fs.readFileSync(myConfigFileName, "utf8");

  let gameState = JSON.parse(data) as GameState;

  const stockManager = createStockManager(gameState);

  const boardSize = gameState.board.length;
  const riverSize = gameState.river.length;
  let onGoingGameState: GameState;

  let turnIsFinished = false;
  let newGameState: GameState;

  drawGameState(gameState, stockManager);

  while (!turnIsFinished) {
    onGoingGameState = deepClone(gameState);
    const turn = await askInputs(boardSize, riverSize);
    try {
      if (turn.coordinates) {
        //highlight possibilities
        let highlightedGameState = highlightCoordinates(
          turn.coordinates,
          gameState
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
