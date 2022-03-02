import fs from "fs";

import { askInputs } from "./askInputs";
import { drawGameState } from "./drawGameState";
import { GameState } from "./GameStateTypes";
import { highlightCoordinates } from "./highlightCoordinates";
import { moveToken } from "./moveToken";
import { placeToken } from "./placeToken";
import { createStockManager, StockManager } from "./stock";
import { deepClone } from "./utils";

export async function main(args: string[]) {
  const gameState = initGameState(args);

  const stockManager = createStockManager(gameState);
  fillRiver(gameState, stockManager);

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

const initGameState = (args: string[]) => {
  if (args && args.length > 2) {
    return initGameStateFromFile(args);
  }
  return initNewGameState();
};

const initGameStateFromFile = (args: string[]) => {
  const gameArgs = args.slice(2);
  const fileName = gameArgs[0].split("=")[1];
  const data = fs.readFileSync(fileName, "utf8");
  return JSON.parse(data) as GameState;
};

/**
 * Return a emty game state with empty river
 * @param size size of the board
 * @returns a new game state
 */
const initNewGameState = (size = 3) => {
  const board = [];
  for (let row = 0; row < size; row++) {
    let rowContent = [];
    for (let column = 0; column < size; column++) {
      rowContent.push(null);
    }
    board.push(rowContent);
  }
  const river = [];
  return { board: board, river: [] };
};

export const fillRiver = (gameState: GameState, stockManager: StockManager) => {
  const boardSize = gameState.board.length;
  const missingTokenInRiver = boardSize - gameState.river.length;
  let newGameState = deepClone(gameState);
  for (let i = 0; i < missingTokenInRiver; i++) {
    newGameState.river.push(stockManager.drawToken());
  }
  return newGameState;
};
