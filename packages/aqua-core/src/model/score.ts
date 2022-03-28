import Graph from "graphology";
import { forEachConnectedComponentOrder } from "graphology-components";

import { GameState, Token } from "../types";
import { addEdges, constructBaseGraph } from "./constructGraph";

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
  player: keyof Token,
): number => {
  const playerGraph = addEdges(gameState, baseGraph, player);
  let score = 0;
  forEachConnectedComponentOrder(playerGraph, (order) => {
    score += calculateScoreFromConnectedNodes(order);
  });
  return score;
};

export const calculateScoreFromConnectedNodes = (
  connectedNb: number,
): number => {
  if (connectedNb < 2) {
    return 0;
  }
  let score = 1;
  for (let i = 2; i < connectedNb; i++) {
    score += i;
  }
  return score;
};
