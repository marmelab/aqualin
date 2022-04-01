import Graph from "graphology";

import {
  MinMaxGameStateTurn,
  GameState,
  Token,
  Coordinates,
} from "../../../types";
import { isHighlightToken } from "../../highlightCoordinates";
import { getPlacementsFromRiver } from "../clusterUpgradeFromRiver";
import { minMaxGameStateAfterPlace } from "./minmax";

export const addRiverPlacements = (
  minMaxGameStatesTurn: MinMaxGameStateTurn[],
  gameState: GameState,
  player: keyof Token,
  opponent: keyof Token,
  graph: Graph,
) => {
  const minMaxGameStatesTurnWithPlacement = [];
  if (minMaxGameStatesTurn.length > 0) {
    minMaxGameStatesTurn.forEach((minMaxGameStateAfterMove) => {
      //à prtir des gameState,  list best place from river
      const placementsFromRiver = getPlacementsFromRiver(
        minMaxGameStateAfterMove.gameState,
        player,
        graph,
      );
      if (placementsFromRiver.length === 0) {
        minMaxGameStatesTurnWithPlacement.push(
          minMaxGameStateAfterPlace(
            minMaxGameStateAfterMove,
            0,
            getFirstPlacementFromRiver(minMaxGameStateAfterMove.gameState),
          ),
        );
        return;
      }

      placementsFromRiver.forEach((targetList, index) => {
        targetList.forEach((target) => {
          minMaxGameStatesTurnWithPlacement.push(
            minMaxGameStateAfterPlace(minMaxGameStateAfterMove, index, target),
          );
        });
      });
    });
  } else {
    const placementsFromRiver = getPlacementsFromRiver(
      gameState,
      player,
      graph,
    );

    if (placementsFromRiver.length === 0) {
      minMaxGameStatesTurnWithPlacement.push(
        minMaxGameStateAfterPlace(
          { gameState },
          0,
          getFirstPlacementFromRiver(gameState),
        ),
      );
    }

    placementsFromRiver.forEach((targetList, index) => {
      targetList.forEach((target) => {
        minMaxGameStatesTurnWithPlacement.push(
          minMaxGameStateAfterPlace({ gameState }, index, target),
        );
      });
    });
  }
  return minMaxGameStatesTurnWithPlacement;
};

export const getFirstPlacementFromRiver = (
  gameState: GameState,
): Coordinates => {
  for (let row = 0; row < gameState.board.length; row++) {
    for (let column = 0; column < gameState.board.length; column++) {
      if (
        gameState.board[row][column] == null ||
        isHighlightToken(gameState.board[row][column])
      ) {
        return { row, column };
      }
    }
  }
};
