import { GameState } from "../../../cli/src/GameStateTypes";
import { Coordinates } from "../types";
import {
  hasSelectedCoordinatesFromBoard,
  hasSelectedIndexRiverToken,
  isCellOccupied,
} from "./cellActions";
import { fillRiver } from "./fillRiver";
import { highlightCoordinates } from "./highlightCoordinates";
import { moveToken } from "./moveToken";
import { placeToken } from "./placeToken";
import { removeHighlights } from "./removeHighlights";

export const playTurn = (
  gameState: GameState,
  coordinates: Coordinates,
): { gameState: GameState; transcientGamestate: boolean } => {
  let onGoingGameState = removeHighlights(gameState);
  let transcientGamestate = true;
  try {
    if (coordinates.row === null) {
      onGoingGameState.selectedTokenFromRiver = coordinates.column;
    } else if (
      !onGoingGameState.moveDone &&
      hasSelectedCoordinatesFromBoard(onGoingGameState)
    ) {
      const source: Coordinates = onGoingGameState.selectedCoordinatesFromBoard;
      const target = coordinates;
      onGoingGameState = moveToken({ source, target }, onGoingGameState);
    } else if (!hasSelectedIndexRiverToken(onGoingGameState)) {
      if (!isCellOccupied(coordinates, onGoingGameState.board)) {
        throw new Error(
          "Please select a token from the board to move or a token from the river.",
        );
      }
      if (onGoingGameState.moveDone) {
        throw new Error(
          "You already have move a token from the board, please select a token from the river.",
        );
      }
      onGoingGameState = highlightCoordinates(coordinates, onGoingGameState);
      onGoingGameState.selectedCoordinatesFromBoard = coordinates;
    } else {
      const tokenToPlace = {
        indexRiverToken: onGoingGameState.selectedTokenFromRiver,
        coordinates,
      };
      onGoingGameState = placeToken(tokenToPlace, onGoingGameState);
      onGoingGameState = nextPlayer(onGoingGameState);
      transcientGamestate = false;
    }
  } catch (e) {
    onGoingGameState.selectedTokenFromRiver = null;
    throw e;
  }
  return {
    gameState: onGoingGameState,
    transcientGamestate,
  };
};

const nextPlayer = (gameState: GameState): GameState => {
  gameState.selectedTokenFromRiver = null;
  gameState.moveDone = false;
  gameState = fillRiver(gameState);
  if (gameState.playerTurn == "Symbol") {
    gameState.playerTurn = "Color";
  } else {
    gameState.playerTurn = "Symbol";
  }
  return gameState;
};
