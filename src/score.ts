import Graph from "graphology";
import { forEachConnectedComponentOrder } from "graphology-components";

import { GameState, Token } from "./GameStateTypes";

export const calculateScore = (gameState: GameState) => {
  const graph = constructBaseGraph(gameState);
  return {
    symbol: calculateScoreForPlayer(gameState, graph, "symbol"),
    color: calculateScoreForPlayer(gameState, graph, "color"),
  };
};

export const calculateScoreForPlayer = (
  gameState: GameState,
  baseGraph: Graph,
  player: keyof Token
): number => {
  const playerGraph = addEdges(gameState, baseGraph, player);
  let score = 0;
  forEachConnectedComponentOrder(playerGraph, (order) => {
    score += calculateScoreFromConnectedNodes(order);
  });
  return score;
};

const buildNodeId = (row: number, column: number): string => {
  return "" + columnLabel(row) + (column + 1);
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
  player: keyof Token
): Graph => {
  const newGraph = graph.copy();
  for (let row = 0; row < gameState.board.length; row++) {
    for (let column = 0; column < gameState.board.length; column++) {
      if (row != gameState.board.length - 1) {
        if (
          gameState.board[row][column][player] ==
          gameState.board[row + 1][column][player]
        ) {
          newGraph.addEdge(
            buildNodeId(row, column),
            buildNodeId(row + 1, column)
          );
        }
      }
      if (column != gameState.board.length - 1) {
        if (
          gameState.board[row][column][player] ==
          gameState.board[row][column + 1][player]
        ) {
          newGraph.addEdge(
            buildNodeId(row, column),
            buildNodeId(row, column + 1)
          );
        }
      }
    }
  }
  return newGraph;
};

export const columnLabel = (columnNumber: number): string => {
  let mod = Math.floor(columnNumber / 26);
  let rest = columnNumber % 26;
  let ret = "";
  if (mod > 0) {
    ret += columnNumberToString(mod - 1);
  }
  return ret + columnNumberToString(rest);
};

const ACharCode = 65;
const columnNumberToString = (i: number): string => {
  return String.fromCharCode(i + ACharCode);
};

const calculateScoreFromConnectedNodes = (connectedNb: number): number => {
  if (connectedNb < 2) {
    return 0;
  }
  let score = 1;
  for (let i = 2; i < connectedNb; i++) {
    score += i;
  }
  return score;
};
