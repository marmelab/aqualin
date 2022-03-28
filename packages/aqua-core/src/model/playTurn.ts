import { InvalidTargetError } from "../errors/invalidTargetError";
import { GameState, Coordinates } from "../types";
import { getSealedCluster, getSealedTokens } from "./ai/sealedCluster";
import {
  hasSelectedCoordinatesFromBoard,
  hasSelectedIndexRiverToken,
  isCellOccupied,
} from "./cellActions";
import { addEdges, constructBaseGraph } from "./constructGraph";
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
      onGoingGameState.selectedCoordinatesFromBoard = null;
      onGoingGameState.selectedTokenFromRiver = coordinates.column;
    } else if (
      !onGoingGameState.moveDone &&
      hasSelectedCoordinatesFromBoard(onGoingGameState)
    ) {
      const source: Coordinates = onGoingGameState.selectedCoordinatesFromBoard;
      const target = coordinates;
      try {
        onGoingGameState = moveToken({ source, target }, onGoingGameState);
        transcientGamestate = false;
      } catch (e) {
        if (e instanceof InvalidTargetError) {
          // player choose another action
          onGoingGameState = highlight(onGoingGameState, coordinates);
        } else {
          throw e;
        }
      }
    } else if (!hasSelectedIndexRiverToken(onGoingGameState)) {
      if (!isCellOccupied(coordinates, onGoingGameState.board)) {
        throw new Error(
          "Please select a token from the board to move or a token from the river.",
        );
      }
      onGoingGameState = highlight(onGoingGameState, coordinates);
    } else {
      const tokenToPlace = {
        indexRiverToken: onGoingGameState.selectedTokenFromRiver,
        coordinates,
      };
      try {
        onGoingGameState = placeToken(tokenToPlace, onGoingGameState);
        onGoingGameState = nextPlayer(onGoingGameState);
        transcientGamestate = false;
      } catch (e) {
        if (e instanceof InvalidTargetError) {
          // player choose another action
          onGoingGameState = highlight(onGoingGameState, coordinates);
        } else {
          throw e;
        }
      }
    }
  } catch (e) {
    onGoingGameState.selectedTokenFromRiver = null;
    throw e;
  }
  onGoingGameState = getSealedTokens(onGoingGameState);
  return {
    gameState: onGoingGameState,
    transcientGamestate,
  };
};

const nextPlayer = (gameState: GameState): GameState => {
  gameState.selectedTokenFromRiver = null;
  gameState.selectedCoordinatesFromBoard = null;
  gameState.moveDone = false;
  gameState = fillRiver(gameState);
  if (gameState.playerTurn === "Symbol") {
    gameState.playerTurn = "Color";
  } else {
    gameState.playerTurn = "Symbol";
  }
  return gameState;
};

const highlight = (gameState: GameState, coordinates: Coordinates) => {
  if (gameState.moveDone) {
    throw new Error(
      "You already have move a token from the board, please select a token from the river.",
    );
  }
  const onGoingGameState = highlightCoordinates(coordinates, gameState);
  onGoingGameState.selectedTokenFromRiver = null;
  onGoingGameState.selectedCoordinatesFromBoard = coordinates;
  return onGoingGameState;
};
