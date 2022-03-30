import Graph from "graphology";
import { connectedComponents } from "graphology-components";

import {
  Coordinates,
  DetailMovesToBiggerCluster,
  GameState,
  MovesToBiggerCluster,
  Token,
} from "../../types";
import { isInCluster, isSamePosition } from "../../utils";
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

  const goodMoves: DetailMovesToBiggerCluster[] = [];
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
        const detail = verifyMoveUpgradeAnotherBiggerCluster(
          gameState,
          components,
          comp,
          tokenPos,
          player,
        );
        if (detail) {
          goodMoves.push(detail);
        }
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
        isInBiggerCluster(gameState, clusters, selectedCluster, {
          row: move.row - 1,
          column: move.column,
        }) ||
        isInBiggerCluster(gameState, clusters, selectedCluster, {
          row: move.row + 1,
          column: move.column,
        }) ||
        isInBiggerCluster(gameState, clusters, selectedCluster, {
          row: move.row,
          column: move.column - 1,
        }) ||
        isInBiggerCluster(gameState, clusters, selectedCluster, {
          row: move.row,
          column: move.column + 1,
        })
      ) {
        goodMoves.push(move);
      }
    }
  }
  if (goodMoves.length === 0) {
    return null;
  }
  return { source: tokenPos, moves: goodMoves };
};

const isInBiggerCluster = (
  gameState: GameState,
  clusters: Coordinates[][],
  selectedCluster: Coordinates[],
  position: Coordinates,
) => {
  if (isInCluster(selectedCluster, position)) {
    return false;
  }
  for (const cluster of clusters) {
    if (
      cluster.length >= selectedCluster.length &&
      isInCluster(cluster, position)
    ) {
      return true;
    }
  }
  return false;
};

const structureGoodMoves = (
  size: number,
  goodMoves: DetailMovesToBiggerCluster[],
): MovesToBiggerCluster => {
  const movesToBiggerCluster: MovesToBiggerCluster = [];
  for (let row = 0; row < size; row++) {
    movesToBiggerCluster[row] = new Array(size).fill(null);
  }
  for (const detail of goodMoves) {
    movesToBiggerCluster[detail.source.row][detail.source.column] =
      detail.moves;
  }
  return movesToBiggerCluster;
};
