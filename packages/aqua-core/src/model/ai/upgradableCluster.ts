import Graph from "graphology";
import { connectedComponents } from "graphology-components";

import {
  Coordinates,
  GameState,
  MovesToBiggerCluster,
  Token,
} from "../../types";
import { isSamePosition } from "../../utils";
import { addEdges, constructBaseGraph } from "../constructGraph";
import { getPossibleMoves, isHighlightToken } from "../highlightCoordinates";
import { checkNeighborsCells } from "./ai-utils";

export const getMovableTokensToBiggerClusters = (
  gameState: GameState,
  player: keyof Token,
  graph?: Graph,
) => {
  if (!graph) {
    graph = addEdges(gameState, constructBaseGraph(gameState), player);
  }

  const goodMoves: Coordinates[] = [];
  const components = connectedComponents(graph)
    .map((comp) =>
      comp.map((token) => {
        const coord = token.split(":");
        const row = parseInt(coord[0], 10);
        const column = parseInt(coord[1], 10);
        return { row, column };
      }),
    )
    .sort((c1, c2) => c1.length - c2.length);
  for (const comp of components) {
    for (const tokenPos of comp) {
      if (
        gameState.board[tokenPos.row][tokenPos.column] &&
        !isHighlightToken(gameState.board[tokenPos.row][tokenPos.column])
      ) {
        goodMoves.push(
          ...verifyMoveUpgradeAnotherBiggerCluster(
            gameState,
            components,
            comp,
            tokenPos,
            player,
          ),
        );
      }
    }
  }
  return structureGoodMoves(gameState.board.length, goodMoves);
};

const verifyMoveUpgradeAnotherBiggerCluster = (
  gameState: GameState,
  clusters: Coordinates[][],
  selectedCluster: Coordinates[],
  tokenPos: Coordinates,
  player: keyof Token,
) => {
  const possibleMoves = getPossibleMoves(gameState.board, {
    row: tokenPos.row,
    column: tokenPos.column,
  });
  const goodMoves: Coordinates[] = [];
  for (const move of possibleMoves) {
    if (
      checkNeighborsCells(
        gameState,
        gameState.board[tokenPos.row][tokenPos.column],
        move.row,
        move.column,
        tokenPos.row,
        tokenPos.column,
        player,
      )
    ) {
      if (
        isInBiggerCluster(gameState, clusters, selectedCluster.length, {
          row: move.row - 1,
          column: move.column,
        }) ||
        isInBiggerCluster(gameState, clusters, selectedCluster.length, {
          row: move.row + 1,
          column: move.column,
        }) ||
        isInBiggerCluster(gameState, clusters, selectedCluster.length, {
          row: move.row,
          column: move.column - 1,
        }) ||
        isInBiggerCluster(gameState, clusters, selectedCluster.length, {
          row: move.row,
          column: move.column + 1,
        })
      ) {
        goodMoves.push(move);
      }
    }
  }
  return goodMoves;
};

const isInBiggerCluster = (
  gameState: GameState,
  clusters: Coordinates[][],
  fromClusterLength: number,
  position: Coordinates,
) => {
  for (const cluster of clusters) {
    if (cluster.length > fromClusterLength && isInCluster(cluster, position)) {
      return true;
    }
  }
  return false;
};

const isInCluster = (cluster: Coordinates[], position: Coordinates) => {
  for (const coord of cluster) {
    if (isSamePosition(coord, position)) {
      return true;
    }
  }
  return false;
};

const structureGoodMoves = (
  // Pas bon for utiliser le token source comme position et mettre la ligne des goods pour ce token
  size: number,
  goodMoves: Coordinates[],
): MovesToBiggerCluster => {
  const movesToBiggerCluster: MovesToBiggerCluster = [];
  for (let row = 0; row < size; row++) {
    movesToBiggerCluster[row] = new Array(size).fill(false);
  }
  for (const move of goodMoves) {
    movesToBiggerCluster[move.row][move.column] = true;
  }
  return movesToBiggerCluster;
};
