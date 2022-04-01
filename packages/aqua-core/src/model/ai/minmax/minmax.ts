import {
  Coordinates,
  GameState,
  MinMaxGameStateTurn,
  Token,
} from "../../../types";
import { deepClone } from "../../../utils";
import { addEdges, constructBaseGraph } from "../../constructGraph";
import { fillRiver } from "../../fillRiver";
import { moveToken } from "../../moveToken";
import { placeToken } from "../../placeToken";
import { getSealedAndMovableTokens } from "../sealedCluster";
import { addBreakingMoves } from "./addBreakingMoves";
import { addMovesToBetterPosition } from "./addMovesBetterPosition";
import { addRiverPlacements } from "./addRiverPlacements";
import { findBestMinMaxGameStateGap } from "./findBestMinMaxGameStateGap";

export const bestTurn = (
  gameState: GameState,
  player: keyof Token,
  opponent: keyof Token,
) => {
  let minMaxGameStatesTurn: MinMaxGameStateTurn[] = [];

  const opponentGraph = addEdges(
    gameState,
    constructBaseGraph(gameState),
    opponent,
  );
  const graph = addEdges(gameState, constructBaseGraph(gameState), player);
  //la liste move qui casse des clusters

  if (!gameState.moveDone) {
    const sealedAndMovableTokens = getSealedAndMovableTokens(
      gameState,
      opponent,
      opponentGraph,
    );

    const breakingMoves = sealedAndMovableTokens.movableTokens;

    addBreakingMoves(breakingMoves, minMaxGameStatesTurn, gameState, opponent);

    addMovesToBetterPosition(minMaxGameStatesTurn, gameState, player);
  }

  minMaxGameStatesTurn = addRiverPlacements(
    minMaxGameStatesTurn,
    gameState,
    player,
    opponent,
    graph,
  );

  const bestMinMaxGameStateGap = findBestMinMaxGameStateGap(
    minMaxGameStatesTurn,
    gameState,
    player,
    opponent,
  );
  bestMinMaxGameStateGap.exploredPossibilities = minMaxGameStatesTurn.length;
  return bestMinMaxGameStateGap;
};

export const minMaxGameStateAfterMove = (
  gameState: GameState,
  source: Coordinates,
  target: Coordinates,
): MinMaxGameStateTurn => {
  const newMinMaxGameState = deepClone(gameState);
  newMinMaxGameState.selectedCoordinatesFromBoard = source;
  const move = { source, target };
  return {
    gameState: moveToken(move, newMinMaxGameState),
    move,
  };
};

export const minMaxGameStateAfterPlace = (
  minMaxGameStateTurn: MinMaxGameStateTurn,
  indexRiverToken: number,
  coordinates: Coordinates,
): MinMaxGameStateTurn => {
  const place = { indexRiverToken, coordinates };
  minMaxGameStateTurn = deepClone(minMaxGameStateTurn);
  minMaxGameStateTurn.gameState.selectedTokenFromRiver = indexRiverToken;
  minMaxGameStateTurn.gameState = placeToken(
    place,
    minMaxGameStateTurn.gameState,
  );
  minMaxGameStateTurn.gameState = fillRiver(minMaxGameStateTurn.gameState);
  minMaxGameStateTurn.place = place;
  return minMaxGameStateTurn;
};
