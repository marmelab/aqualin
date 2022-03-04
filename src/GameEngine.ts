import fs from "fs";

import { GameState } from "./GameStateTypes";
import {
  hasSelectedCoordinatesFromBoard,
  hasSelectedIndexRiverToken,
  isCellOccupied,
} from "./model/cellActions";
import { fillRiver } from "./model/fillRiver";
import { highlightCoordinates } from "./model/highlightCoordinates";
import { moveToken } from "./model/moveToken";
import { placeToken } from "./model/placeToken";
import { initScreen, renderBoard } from "./renderer";
import { calculateScore } from "./score";
import { Coordinates, Player } from "./types";
import { renderScore } from "./ui/renderScore";
import { deepClone } from "./utils";

export async function main(args: string[]) {
  const screen = initScreen();
  let gameState = initGameState(args);

  gameState = fillRiver(gameState);

  const boardSize = gameState.board.length;
  const riverSize = gameState.river.length;
  let onGoingGameState: GameState;
  let moveIsNotDone = true;
  let playerTurn: Player = Math.round(Math.random()) == 1 ? "Color" : "Symbol";
  while (gameState.river.length !== 0) {
    let message = "";
    let turnIsFinished = false;
    moveIsNotDone = true;
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
          moveIsNotDone,
          playerTurn,
          message
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

          onGoingGameState = placeToken(tokenToPlace, onGoingGameState);
          onGoingGameState.selectedTokenFromRiver = null;

          turnIsFinished = true;
          gameState = onGoingGameState;
        }
      } catch (e) {
        message = e.message;
        gameState.selectedTokenFromRiver = null;
      }
    }
    gameState = fillRiver(gameState);
    if (playerTurn == "Symbol") {
      playerTurn = "Color";
    } else {
      playerTurn = "Symbol";
    }
  }
  renderBoard(gameState, screen, moveIsNotDone);
  renderScore(calculateScore(gameState));
}

export const initGameState = (args: string[]): GameState => {
  if (args.length > 2 && args[2].indexOf("-f=") >= 0) {
    return initGameStateFromFile(args);
  }
  if (args.length > 2 && args[2].indexOf("-s=") >= 0) {
    const gameArgs = args.slice(2);
    const size = gameArgs[0].split("=")[1];
    return initNewGameState(parseInt(size));
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
const initNewGameState = (size = 6): GameState => {
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
