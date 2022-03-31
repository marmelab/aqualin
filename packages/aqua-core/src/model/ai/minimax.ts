import {
  BestMinMaxGameStateGap,
  Coordinates,
  GameState,
  MinMaxGameStateTurn,
  Token,
} from "../../types";
import { deepClone } from "../../utils";
import { addEdges, constructBaseGraph } from "../constructGraph";
import { fillRiver } from "../fillRiver";
import { getPossibleMoves, isHighlightToken } from "../highlightCoordinates";
import { moveToken } from "../moveToken";
import { placeToken } from "../placeToken";
import { calculateIntermediateScore } from "./calculateIntermediateScore";
import { getPlacementsFromRiver } from "./clusterUpgradeFromRiver";
import {
  checkHintCleaverMove,
  getSealedAndMovableTokens,
} from "./sealedCluster";
import { getMovableTokensToBiggerClusters } from "./upgradableCluster";

export const bestTurn = (
  gameState: GameState,
  player: keyof Token,
  opponent: keyof Token,
) => {
  const minMaxGameStatesTurn: MinMaxGameStateTurn[] = [];

  const opponentGraph = addEdges(
    gameState,
    constructBaseGraph(gameState),
    opponent,
  );
  const graph = addEdges(gameState, constructBaseGraph(gameState), player);
  //la liste move qui casse des clusters

  const sealedAndMovableTokens = getSealedAndMovableTokens(
    gameState,
    opponent,
    opponentGraph,
  );

  const breakingMoves = sealedAndMovableTokens.movableTokens;

  breakingMoves.forEach((rowElement, row) => {
    rowElement.forEach((columnElement, column) => {
      if (columnElement) {
        getPossibleMoves(gameState.board, { row, column }).forEach(
          (targetCoordinates) => {
            gameState.selectedCoordinatesFromBoard = { row, column };
            if (checkHintCleaverMove(gameState, targetCoordinates, opponent)) {
              minMaxGameStatesTurn.push(
                minMaxGameStateAfterMove(
                  gameState,
                  {
                    row,
                    column,
                  },
                  targetCoordinates,
                ),
              );
            }
          },
        );
      }
    });
  });

  const movesBetterPosition = getMovableTokensToBiggerClusters(
    gameState,
    player,
  );

  movesBetterPosition.forEach((rowElement, row) => {
    rowElement.forEach((columnElement, column) => {
      if (columnElement != null) {
        columnElement.forEach((targetCoordinates) => {
          minMaxGameStatesTurn.push(
            minMaxGameStateAfterMove(
              gameState,
              { row, column },
              targetCoordinates,
            ),
          );
        });
      }
    });
  });

  if (minMaxGameStatesTurn.length > 0) {
    minMaxGameStatesTurn.forEach((minMaxGameStateAfterMove) => {
      //à prtir des gameState,  list best place from river
      const placementsFromRiver = getPlacementsFromRiver(
        minMaxGameStateAfterMove.gameState,
        player,
        graph,
      );
      if (placementsFromRiver.length === 0) {
        minMaxGameStatesTurn.push(
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
          minMaxGameStatesTurn.push(
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
      minMaxGameStatesTurn.push(
        minMaxGameStateAfterPlace(
          { gameState },
          0,
          getFirstPlacementFromRiver(gameState),
        ),
      );
    }

    placementsFromRiver.forEach((targetList, index) => {
      targetList.forEach((target) => {
        //gameState after place token form river

        minMaxGameStatesTurn.push(
          minMaxGameStateAfterPlace({ gameState }, index, target),
        );
      });
    });
  }

  const bestMinMaxGameStateGap: BestMinMaxGameStateGap = {
    gap: -1000,
    minMaxGameStateTurn: {
      place: {
        indexRiverToken: 0,
        coordinates: getFirstPlacementFromRiver(gameState),
      },
    },
  };

  minMaxGameStatesTurn.forEach((minMaxGameStateTurn) => {
    const newGap = calculateGap(
      minMaxGameStateTurn.gameState,
      player,
      opponent,
    );

    if (!bestMinMaxGameStateGap.gap || newGap > bestMinMaxGameStateGap.gap) {
      bestMinMaxGameStateGap.gap = newGap;
      bestMinMaxGameStateGap.minMaxGameStateTurn = minMaxGameStateTurn;
    }
  });

  bestMinMaxGameStateGap.exploredPossibilities = minMaxGameStatesTurn.length;
  return bestMinMaxGameStateGap;
};

const getFirstPlacementFromRiver = (gameState: GameState): Coordinates => {
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

const minMaxGameStateAfterMove = (
  gameState: GameState,
  source: Coordinates,
  target: Coordinates,
): MinMaxGameStateTurn => {
  const newMinMaxGameState = deepClone(gameState);
  newMinMaxGameState.selectedCoordinatesFromBoard = source;
  const move = { source, target };
  return {
    gameState: moveToken(move, newMinMaxGameState),
    move,
  };
};

const minMaxGameStateAfterPlace = (
  minMaxGameStateTurn: MinMaxGameStateTurn,
  indexRiverToken: number,
  coordinates: Coordinates,
): MinMaxGameStateTurn => {
  const place = { indexRiverToken, coordinates };
  minMaxGameStateTurn = deepClone(minMaxGameStateTurn);
  minMaxGameStateTurn.gameState.selectedTokenFromRiver = indexRiverToken;
  minMaxGameStateTurn.gameState = placeToken(
    place,
    minMaxGameStateTurn.gameState,
  );
  minMaxGameStateTurn.gameState = fillRiver(minMaxGameStateTurn.gameState);
  minMaxGameStateTurn.place = place;
  return minMaxGameStateTurn;
};

const calculateGap = (
  gameState: GameState,
  player: keyof Token,
  opponent: keyof Token,
) => {
  const intermediateScore = calculateIntermediateScore(
    gameState,
    player,
    opponent,
  );

  return intermediateScore.myScore - intermediateScore.opponentScore;
};
