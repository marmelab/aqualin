import Graph from "graphology";
import { forEachConnectedComponent } from "graphology-components";

import { Color, GameState } from "../../types";
import { tokenBlocked } from "../../utils";
import { addEdges, constructBaseGraph } from "../constructGraph";

export const getSealedTokens = (gameState: GameState, graph?: Graph) => {
  if (!graph) {
    graph = addEdges(
      gameState,
      constructBaseGraph(gameState),
      gameState.playerTurn === Color ? "symbol" : "color",
    );
  }
  const sealedClusters = getSealedCluster(gameState, graph);
  const sealedTokens = initEmptySealedTokens(gameState.board.length);
  for (const cluster of sealedClusters) {
    for (const token of cluster) {
      const coord = token.split(":");
      const coordRow = parseInt(coord[0], 10);
      const coordColumn = parseInt(coord[1], 10);
      sealedTokens[coordRow][coordColumn] = true;
    }
  }
  return sealedTokens;
};

export const getSealedCluster = (gameState: GameState, graph: Graph) => {
  const sealedClusters = [];
  forEachConnectedComponent(graph, (component) => {
    if (component.length > 1) {
      if (verifyComponentSeal(gameState, component)) {
        sealedClusters.push(component);
      }
    }
  });
  return sealedClusters;
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

const initEmptySealedTokens = (size: number) => {
  const sealedTokens: boolean[][] = [];
  for (let row = 0; row < size; row++) {
    sealedTokens[row] = [];
    for (let column = 0; column < size; column++) {
      sealedTokens[row][column] = false;
    }
  }
  return sealedTokens;
};
