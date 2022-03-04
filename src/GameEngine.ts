import fs from "fs";
import {
  hasSelectedCoordinatesFromBoard,
  hasSelectedIndexRiverToken,
  isCellOccupied,
} from "./cellActions";
import { GameState } from "./GameStateTypes";
import { highlightCoordinates } from "./highlightCoordinates";
import { initScreen, renderBoard } from "./mouse";
import { moveToken } from "./moveToken";
import { placeToken } from "./placeToken";
import { createStockManager, StockManager } from "./stock";
import { Coordinates, Turn } from "./types";
import { deepClone } from "./utils";

export async function main(args: string[]) {
  const screen = initScreen();
  let gameState = initGameState(args);

  const stockManager = createStockManager(gameState);
  gameState = fillRiver(gameState, stockManager);

  const boardSize = gameState.board.length;
  const riverSize = gameState.river.length;
  let onGoingGameState: GameState;

  while (gameState.river.length !== 0) {
    let turnIsFinished = false;
    let moveIsNotDone = true;
    let highlightedGameState = null;
    while (!turnIsFinished) {
      onGoingGameState = deepClone(gameState);
      let usedGameState = highlightedGameState
        ? highlightedGameState
        : onGoingGameState;
      try {
        const coordinates = await renderBoard(
          usedGameState,
          screen,
          stockManager
        );

        if (coordinates.row === null) {
          gameState.selectedTokenFromRiver = coordinates.column;
        } else if (
          moveIsNotDone &&
          hasSelectedCoordinatesFromBoard(usedGameState)
        ) {
          const source: Coordinates =
            usedGameState.selectedCoordinatesFromBoard;
          const target = coordinates;
          highlightedGameState = null;
          onGoingGameState = moveToken({ source, target }, onGoingGameState);
          moveIsNotDone = false;
          gameState = onGoingGameState;
        } else if (!hasSelectedIndexRiverToken(usedGameState)) {
          if (!isCellOccupied(coordinates, gameState.board)) {
            throw new Error(
              "Please select a token from the board to move or a token from the river."
            );
          }
          if (!moveIsNotDone) {
            throw new Error(
              "You already have move a token from the board, please select a token from the river."
            );
          }
          highlightedGameState = highlightCoordinates(
            coordinates,
            onGoingGameState
          );
          highlightedGameState.selectedCoordinatesFromBoard = coordinates;
        } else {
          const tokenToPlace = {
            indexRiverToken: gameState.selectedTokenFromRiver,
            coordinates,
          };
          highlightedGameState = null;

          onGoingGameState = placeToken(
            tokenToPlace,
            onGoingGameState,
            stockManager
          );
          onGoingGameState.selectedTokenFromRiver = null;

          turnIsFinished = true;
          gameState = onGoingGameState;
        }
      } catch (e) {
        //TODO ne pas utiliser console.log
        console.log(e.message);
        // do nothing and iterate again in the while loop
        //unselect the RiverToken
        gameState.selectedTokenFromRiver = null;
      }
    }
    //const result = await renderBoard(gameState, screen, stockManager);
  }
}

export const initGameState = (args: string[]): GameState => {
  if (args && args.length > 2) {
    return initGameStateFromFile(args);
  }
  return initNewGameState();
};

const initGameStateFromFile = (args: string[]): GameState => {
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
const initNewGameState = (size = 3): GameState => {
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
