import Graph from "graphology";
import { connectedComponents } from "graphology-components";

import {
  Coordinates,
  GameState,
  PlacementsFromRiver,
  Token,
} from "../../types";
import { cellIsEmptyAt } from "../../utils";
import { addEdges, constructBaseGraph } from "../constructGraph";
import { nodeIdToCoordinates } from "./ai-utils";

export const getPlacementsFromRiver = (
  gameState: GameState,
  player: keyof Token,
  graph?: Graph,
) => {
  if (!graph) {
    graph = addEdges(gameState, constructBaseGraph(gameState), player);
  }
  const placementsFromRiver: PlacementsFromRiver = [];
  for (let i = 0; i < gameState.river.length; i++) {
    const places = searchPlaceForRiverToken(
      gameState,
      gameState.river[i],
      graph,
      player,
    );
    if (places.length > 0) {
      placementsFromRiver[i] = places;
    }
  }
  return placementsFromRiver;
};

const searchPlaceForRiverToken = (
  gameState: GameState,
  token: Token,
  graph: Graph,
  player: keyof Token,
) => {
  const components = connectedComponents(graph);
  const places: Coordinates[] = [];
  for (const cluster of components) {
    checkCluster(gameState, cluster, places, token, player);
  }
  return places;
};

const checkCluster = (
  gameState: GameState,
  cluster: string[],
  places: Coordinates[],
  token: Token,
  player: keyof Token,
) => {
  for (const id of cluster) {
    const coord = nodeIdToCoordinates(id);
    if (
      !gameState.board[coord.row][coord.column] ||
      gameState.board[coord.row][coord.column][player] !== token[player]
    ) {
      break;
    }

    checkAndAdd(
      gameState,
      { row: coord.row - 1, column: coord.column },
      places,
    );
    checkAndAdd(
      gameState,
      { row: coord.row + 1, column: coord.column },
      places,
    );
    checkAndAdd(
      gameState,
      { row: coord.row, column: coord.column - 1 },
      places,
    );
    checkAndAdd(
      gameState,
      { row: coord.row, column: coord.column + 1 },
      places,
    );
  }
};

const checkAndAdd = (
  gameState: GameState,
  coordinates: Coordinates,
  places: Coordinates[],
) => {
  if (cellIsEmptyAt(gameState, coordinates)) {
    places.push(coordinates);
  }
};
