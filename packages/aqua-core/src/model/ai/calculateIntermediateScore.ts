import {
  BooleanBoard,
  GameState,
  MovesToBiggerCluster,
  Score,
  Token,
} from "../../types";
import { getPlayer, getOpponent } from "../../utils";
import { addEdges, constructBaseGraph } from "../constructGraph";
import { calculateScore, calculateScoreFromConnectedNodes } from "../score";
import { noRemainingTokenTypesFromStockOrRiver } from "./noRemainigTokens";
import {
  getSealedAndMovableTokens,
  getSealedAndUnsealedCluster,
} from "./sealedCluster";
import { getMovableTokensToBiggerClusters } from "./upgradableCluster";

const WEIGHTED_UNBREAKABLE_CLUSTER = 2;
const WEIGHTED_MOVES_BETTER_POSITION = 1;
const WEIGHTED_NO_REMAINING_TOKEN_TYPES = -1;
// TODO ADD placement from RIVER
export const calculateIntermediateScore = (
  gameState: GameState,
  player: keyof Token,
  opponent: keyof Token,
) => {
  const graph = addEdges(gameState, constructBaseGraph(gameState), player);
  const opponentGraph = addEdges(
    gameState,
    constructBaseGraph(gameState),
    opponent,
  );

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

  const noRemainingTokenTypes = noRemainingTokenTypesFromStockOrRiver(
    gameState,
    player,
  );

  let myScore = calculateClustersScoreByPlayer(sealedAndUnsealedClusters);

  movesBetterPosition.forEach((row) => {
    row.forEach((cell) => {
      myScore += cell == null ? 0 : WEIGHTED_MOVES_BETTER_POSITION;
    });
  });

  noRemainingTokenTypes.forEach((type) => {
    myScore += WEIGHTED_NO_REMAINING_TOKEN_TYPES;
  });

  const opponentSealedAndUnsealedClusters = getSealedAndUnsealedCluster(
    gameState,
    opponentGraph,
    opponent,
  );

  const opponentNoRemainingTokenTypes = noRemainingTokenTypesFromStockOrRiver(
    gameState,
    opponent,
  );

  const opponentMovesBetterPosition = getMovableTokensToBiggerClusters(
    gameState,
    opponent,
    opponentGraph,
  );
  let opponentScore = calculateClustersScoreByPlayer(
    opponentSealedAndUnsealedClusters,
  );

  opponentMovesBetterPosition.forEach((row) => {
    row.forEach((cell) => {
      opponentScore += cell === null ? 0 : WEIGHTED_MOVES_BETTER_POSITION;
    });
  });

  opponentNoRemainingTokenTypes.forEach((type) => {
    opponentScore += WEIGHTED_NO_REMAINING_TOKEN_TYPES;
  });

  const intermediateScores = { myScore, opponentScore };

  return intermediateScores;
};
function calculateClustersScoreByPlayer(sealedAndUnsealedClusters: {
  sealedClusters: string[][];
  unsealedClusters: string[][];
}) {
  let clusterScore = 0;
  sealedAndUnsealedClusters.sealedClusters.forEach((cluster) => {
    clusterScore +=
      calculateScoreFromConnectedNodes(cluster.length) +
      WEIGHTED_UNBREAKABLE_CLUSTER;
  });
  sealedAndUnsealedClusters.unsealedClusters.forEach((cluster) => {
    clusterScore += calculateScoreFromConnectedNodes(cluster.length);
  });

  return clusterScore;
}
