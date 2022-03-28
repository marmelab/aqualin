import Graph from "graphology";
import { forEachConnectedComponent } from "graphology-components";

import { Board, GameState } from "../../types";
import { deepClone } from "../../utils";
import { addEdges, constructBaseGraph } from "../constructGraph";

export const getSealedTokens = (gameState: GameState, graph?: Graph) => {
  if (!graph) {
    graph = addEdges(
      gameState,
      constructBaseGraph(gameState),
      gameState.playerTurn === "Color" ? "color" : "symbol",
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
  const onGoingGameState = deepClone(gameState);
  onGoingGameState.sealedTokens = sealedTokens;
  return onGoingGameState;
};

export const getSealedCluster = (gameState: GameState, graph: Graph) => {
  const sealedClusters = [];
  forEachConnectedComponent(graph, (component) => {
    if (component.length > 1) {
      if (verifyComponentSeal(gameState.board, component)) {
        sealedClusters.push(component);
      }
    }
  });
  return sealedClusters;
};

const verifyComponentSeal = (board: Board, component: string[]): boolean => {
  for (const node of component) {
    if (!verifyTokenSeal(board, node)) {
      return false;
    }
  }
  return true;
};

const verifyTokenSeal = (board: Board, node: string): boolean => {
  const coord = node.split(":");
  const coordRow = parseInt(coord[0], 10);
  const coordColumn = parseInt(coord[1], 10);

  if (coordRow > 0) {
    const token = board[coordRow - 1][coordColumn];
    if (token == null) {
      return false;
    }
  }
  if (coordRow < board.length - 1) {
    const token = board[coordRow + 1][coordColumn];
    if (token == null) {
      return false;
    }
  }
  if (coordColumn > 0) {
    const token = board[coordRow][coordColumn - 1];
    if (token == null) {
      return false;
    }
  }
  if (coordColumn < board.length - 1) {
    const token = board[coordRow][coordColumn + 1];
    if (token == null) {
      return false;
    }
  }
  return true;
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
