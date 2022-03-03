import { askInputs, askRulesRead } from "../askInputs";
import { drawGameState } from "../rendering/drawGameState";
import { howToplay, renderHelp } from "../rendering/helper";
import { highlightCoordinates } from "../rendering/highlightCoordinates";
import { deepClone } from "../utils";
import { GameState } from "./GameStateTypes";
import { moveToken } from "./moveToken";
import { placeToken } from "./placeToken";
import { createStockManager, StockManager } from "./stock";
import fs from "fs";

export async function main(args: string[]) {
  let gameState = initGameState(args);

  const stockManager = createStockManager(gameState);
  gameState = fillRiver(gameState, stockManager);

  const boardSize = gameState.board.length;
  const riverSize = gameState.river.length;
  let onGoingGameState: GameState;

  howToplay(renderHelp);
  await askRulesRead();

  drawGameState(gameState, stockManager);
  while (gameState.river.length !== 0) {
    let turnIsFinished = false;
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
          onGoingGameState = placeToken(
            turn.tokenToPlace,
            onGoingGameState,
            stockManager
          );
          turnIsFinished = true;
        }
        gameState = onGoingGameState;
      } catch (e) {
        console.log(e.message);
        // do nothing and iterate again in the while loop
      }
    }

    drawGameState(gameState, stockManager);
  }
}

export const initGameState = (args: string[]) => {
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
    let token = stockManager.drawToken();
    if (!token) {
      break;
    }
    newGameState.river.push(token);
  }
  return newGameState;
};
