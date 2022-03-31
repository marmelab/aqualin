import {
  BestMinMaxGameStateGap,
  Coordinates,
  GameState,
  MinMaxGameStateTurn,
  Token,
} from "../../types";
import { deepClone } from "../../utils";
import { addEdges, constructBaseGraph } from "../constructGraph";
import { getPossibleMoves } from "../highlightCoordinates";
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
  const graph = addEdges(gameState, constructBaseGraph(gameState), opponent);
  //la liste move qui casse des clusters

  const sealedAndMovableTokens = getSealedAndMovableTokens(
    gameState,
    opponent,
    opponentGraph,
  );
  const breakenMoves = sealedAndMovableTokens.movableTokens;

  breakenMoves.forEach((rowElement, row) => {
    rowElement.forEach((columnElement, column) => {
      getPossibleMoves(gameState.board, { row, column }).forEach(
        (sourceCoordinates) => {
          if (checkHintCleaverMove(gameState, { row, column }, opponent)) {
            minMaxGameStatesTurn.push(
              minMaxGameStateAfterMove(gameState, sourceCoordinates, {
                row,
                column,
              }),
            );
          }
        },
      );
    });
  });
  const movesBetterPosition = getMovableTokensToBiggerClusters(
    gameState,
    player,
  );

  movesBetterPosition.forEach((rowElement, row) => {
    rowElement.forEach((columnElement, column) => {
      columnElement.forEach((targetCoordinates) => {
        minMaxGameStatesTurn.push(
          minMaxGameStateAfterMove(
            gameState,
            { row, column },
            targetCoordinates,
          ),
        );
      });
    });
  });

  minMaxGameStatesTurn.forEach((minMaxGameStateAfterMove) => {
    //à prtir des gameState,  list best place from river
    const placementsFromRiver = getPlacementsFromRiver(
      minMaxGameStateAfterMove.gameState,
      player,
      graph,
    );

    placementsFromRiver.forEach((targetList, index) => {
      targetList.forEach((target) => {
        //gameState after place token form river
        if (minMaxGameStateAfterMove.place) {
          minMaxGameStatesTurn.push(
            minMaxGameStateAfterPlace(
              deepClone(minMaxGameStateAfterMove),
              index,
              target,
            ),
          );
        } else {
          minMaxGameStateAfterPlace(minMaxGameStateAfterMove, index, target);
        }
      });
    });
  });
  const bestMinMaxGameStateGap: BestMinMaxGameStateGap = {};
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
};

const minMaxGameStateAfterMove = (
  gameState: GameState,
  source: Coordinates,
  target: Coordinates,
): MinMaxGameStateTurn => {
  const newMinMaxGameState = deepClone(gameState);
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
  minMaxGameStateTurn.gameState = placeToken(
    place,
    minMaxGameStateTurn.gameState,
  );
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
