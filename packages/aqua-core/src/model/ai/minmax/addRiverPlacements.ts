import Graph from "graphology";

import {
  MinMaxGameStateTurn,
  GameState,
  Token,
  Coordinates,
  PlacementsFromRiver,
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
  const minMaxGameStatesTurnWithPlacement: MinMaxGameStateTurn[] = [];
  if (minMaxGameStatesTurn.length > 0) {
    minMaxGameStatesTurn.forEach((minMaxGameStateAfterMove) => {
      addTurnRiverOption(
        minMaxGameStatesTurnWithPlacement,
        minMaxGameStateAfterMove,
        graph,
        player,
      );
    });
  } else {
    addTurnRiverOption(
      minMaxGameStatesTurnWithPlacement,
      { gameState },
      graph,
      player,
    );
  }
  return minMaxGameStatesTurnWithPlacement;
};

const addDefaultRiverPosition = (
  minMaxGameStatesTurnWithPlacement: MinMaxGameStateTurn[],
  minMaxGameStateTurn: MinMaxGameStateTurn,
) => {
  minMaxGameStatesTurnWithPlacement.push(
    minMaxGameStateAfterPlace(
      minMaxGameStateTurn,
      0,
      getFirstPlacementFromRiver(minMaxGameStateTurn.gameState),
    ),
  );
};

const addTurnRiverOption = (
  minMaxGameStatesTurnWithPlacement: MinMaxGameStateTurn[],
  minMaxGameStateTurn: MinMaxGameStateTurn,
  graph: Graph,
  player: keyof Token,
) => {
  const placementsFromRiver = getPlacementsFromRiver(
    minMaxGameStateTurn.gameState,
    player,
    graph,
  );
  if (placementsFromRiver.length === 0) {
    addDefaultRiverPosition(
      minMaxGameStatesTurnWithPlacement,
      minMaxGameStateTurn,
    );
  }
  placementsFromRiver.forEach((targetList, index) => {
    targetList.forEach((target) => {
      minMaxGameStatesTurnWithPlacement.push(
        minMaxGameStateAfterPlace(minMaxGameStateTurn, index, target),
      );
    });
  });
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
