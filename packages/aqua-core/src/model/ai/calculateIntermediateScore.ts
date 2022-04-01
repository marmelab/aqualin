import Graph from "graphology";

import { GameState, Token } from "../../types";
import { addEdges, constructBaseGraph } from "../constructGraph";
import { calculateScoreFromConnectedNodes } from "../score";
import { getPlacementsFromRiver } from "./clusterUpgradeFromRiver";
import { noRemainingTokenTypesFromStockOrRiver } from "./noRemainingTokens";
import { getSealedAndUnsealedCluster } from "./sealedCluster";
import { getMovableTokensToBiggerClusters } from "./upgradableCluster";

const WEIGHTED_UNBREAKABLE_CLUSTER = 4;
const WEIGHTED_BREAKABLE_CLUSTER = 3;
const WEIGHTED_MOVES_BETTER_POSITION = 2;
const WEIGHTED_RIVER = 1;
const WEIGHTED_NO_REMAINING_TOKEN_TYPES = -1;
// TODO ADD placement from RIVER
export const calculateIntermediateScore = (
  gameState: GameState,
  myPlayer: keyof Token,
  opponent: keyof Token,
) => {
  const baseGraph = constructBaseGraph(gameState);

  const intermediateScores = {
    myScore: calculateIntermediateScoreForPlayer(
      gameState,
      myPlayer,
      baseGraph,
    ),
    opponentScore: calculateIntermediateScoreForPlayer(
      gameState,
      opponent,
      baseGraph,
    ),
  };

  return intermediateScores;
};

export const calculateIntermediateScoreForPlayer = (
  gameState: GameState,
  player: keyof Token,
  baseGraph: Graph,
) => {
  const graph = addEdges(gameState, baseGraph, player);

  const sealedAndUnsealedClusters = getSealedAndUnsealedCluster(
    gameState,
    graph,
    player,
  );

  const movesBetterPosition = getMovableTokensToBiggerClusters(
    gameState,
    player,
    graph,
  );

  const placementsFromRiver = getPlacementsFromRiver(gameState, player, graph);

  const noRemainingTokenTypes = noRemainingTokenTypesFromStockOrRiver(
    gameState,
    player,
  );

  let score = calculateClustersScoreByPlayer(sealedAndUnsealedClusters);

  movesBetterPosition.forEach((row) => {
    row.forEach((cell) => {
      score += cell == null ? 0 : WEIGHTED_MOVES_BETTER_POSITION;
    });
  });

  noRemainingTokenTypes.forEach((type) => {
    score += WEIGHTED_NO_REMAINING_TOKEN_TYPES;
  });

  placementsFromRiver.forEach((placement) => {
    score += WEIGHTED_RIVER;
  });

  return score;
};

function calculateClustersScoreByPlayer(sealedAndUnsealedClusters: {
  sealedClusters: string[][];
  unsealedClusters: string[][];
}) {
  let clusterScore = 0;
  sealedAndUnsealedClusters.sealedClusters.forEach((cluster) => {
    clusterScore +=
      calculateScoreFromConnectedNodes(cluster.length) *
      WEIGHTED_UNBREAKABLE_CLUSTER;
  });

  sealedAndUnsealedClusters.unsealedClusters.forEach((cluster) => {
    clusterScore +=
      calculateScoreFromConnectedNodes(cluster.length) *
      WEIGHTED_BREAKABLE_CLUSTER;
  });

  return clusterScore;
}

export const calculateGap = (
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
