import Graph from "graphology";
import { forEachConnectedComponent } from "graphology-components";

import { PlayerColor } from "../../Players";
import { GameState, SealedTokens } from "../../types";
import { tokenBlocked } from "../../utils";
import { addEdges, constructBaseGraph } from "../constructGraph";

export const getSealedAndMovableTokens = (
  gameState: GameState,
  graph?: Graph,
) => {
  if (!graph) {
    graph = addEdges(
      gameState,
      constructBaseGraph(gameState),
      gameState.playerTurn === PlayerColor ? "symbol" : "color",
    );
  }
  const sealedAndMovableTokens = {
    sealedTokens: initEmptyTokensWithFalse(gameState.board.length),
    movableTokens: initEmptyTokensWithFalse(gameState.board.length),
  };
  const clusters = getSealedAndUnsealedCluster(gameState, graph);

  for (const cluster of clusters.sealedClusters) {
    for (const token of cluster) {
      const coord = token.split(":");
      const coordRow = parseInt(coord[0], 10);
      const coordColumn = parseInt(coord[1], 10);
      sealedAndMovableTokens.sealedTokens[coordRow][coordColumn] = true;
    }
  }

  for (const cluster of clusters.unsealedClusters) {
    for (const token of cluster) {
      const coord = token.split(":");
      const coordRow = parseInt(coord[0], 10);
      const coordColumn = parseInt(coord[1], 10);

      //TODO with PR 65, change !tokenBlocked by checkMoveDontBreakCluster
      sealedAndMovableTokens.movableTokens[coordRow][coordColumn] =
        !tokenBlocked(gameState, { row: coordRow, column: coordColumn });
    }
  }

  return sealedAndMovableTokens;
};

export const getSealedAndUnsealedCluster = (
  gameState: GameState,
  graph: Graph,
) => {
  const clusters: {
    sealedClusters: string[][];
    unsealedClusters: string[][];
  } = { sealedClusters: [], unsealedClusters: [] };

  forEachConnectedComponent(graph, (component) => {
    if (component.length > 1) {
      if (verifyComponentSeal(gameState, component)) {
        clusters.sealedClusters.push(component);
      } else {
        clusters.unsealedClusters.push(component);
      }
    }
  });

  return clusters;
};

const verifyComponentSeal = (game: GameState, component: string[]): boolean => {
  for (const node of component) {
    if (!verifyTokenSeal(game, node)) {
      return false;
    }
  }
  return true;
};

const verifyTokenSeal = (game: GameState, node: string): boolean => {
  const coord = node.split(":");
  const row = parseInt(coord[0], 10);
  const column = parseInt(coord[1], 10);

  return tokenBlocked(game, { row, column });
};

const initEmptyTokensWithFalse = (size: number): SealedTokens => {
  const sealedTokens: SealedTokens = [];
  for (let row = 0; row < size; row++) {
    sealedTokens[row] = new Array(size).fill(false);
  }
  return sealedTokens;
};
