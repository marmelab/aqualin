import Graph from "graphology";

import { GameState, Token } from "../types";
import { highlightToken } from "./highlightCoordinates";

const buildNodeId = (row: number, column: number): string => {
  return `${row}:${column}`;
};

export const constructBaseGraph = (gameState: GameState): Graph => {
  const graph = new Graph();
  for (let row = 0; row < gameState.board.length; row++) {
    for (let column = 0; column < gameState.board.length; column++) {
      graph.addNode(buildNodeId(row, column));
    }
  }
  return graph;
};

export const addEdges = (
  gameState: GameState,
  graph: Graph,
  player: keyof Token,
): Graph => {
  const newGraph = graph.copy();
  for (let row = 0; row < gameState.board.length; row++) {
    for (let column = 0; column < gameState.board.length; column++) {
      // Verify that we are not of the last row to not compare it with out of bound cell board
      if (row !== gameState.board.length - 1) {
        if (
          gameState.board[row][column] != null &&
          gameState.board[row + 1][column] &&
          gameState.board[row][column][player] !== highlightToken[player] &&
          gameState.board[row][column][player] ===
            gameState.board[row + 1][column][player]
        ) {
          newGraph.addEdge(
            buildNodeId(row, column),
            buildNodeId(row + 1, column),
          );
        }
      }
      // Verify that we are not of the last column to not compare it with out of bound cell board
      if (column !== gameState.board.length - 1) {
        if (
          gameState.board[row][column] != null &&
          gameState.board[row][column + 1] &&
          gameState.board[row][column][player] !== highlightToken[player] &&
          gameState.board[row][column][player] ===
            gameState.board[row][column + 1][player]
        ) {
          newGraph.addEdge(
            buildNodeId(row, column),
            buildNodeId(row, column + 1),
          );
        }
      }
    }
  }
  return newGraph;
};
