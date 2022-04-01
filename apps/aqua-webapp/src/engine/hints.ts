import {
  calculateIntermediateScore,
  getMovableTokensToBiggerClusters,
  getPlacementsFromRiver,
  getSealedAndMovableTokens,
  noRemainingTokenTypesFromStockOrRiver,
  PlayerColor,
  Token,
  bestTurn,
  initGameState,
  deepClone,
  removeHighlights,
} from "@aqua/core";
import { RiverController } from "src/river/river.contoller";
import { GameTemplate } from "src/types";

export const addHints = (game: GameTemplate) => {
  const hint =
    game.playerTeam === PlayerColor ? game.colorHint : game.symbolHint;
  switch (hint) {
    case "opponentClusters": {
      const sealedAndUnsealedTokens = getSealedAndMovableTokens(
        game.gameState,
        getOpponent(game),
      );
      game.sealedTokens = sealedAndUnsealedTokens.sealedTokens;
      game.movableTokens = sealedAndUnsealedTokens.movableTokens;
      break;
    }
    case "playerClusters": {
      const sealedAndUnsealedTokens = getSealedAndMovableTokens(
        game.gameState,
        getPlayer(game),
      );
      game.sealedTokens = sealedAndUnsealedTokens.sealedTokens;
      game.movableTokens = sealedAndUnsealedTokens.movableTokens;
      break;
    }
    case "noRemainingTokenTypes": {
      game.noRemainingTokenTypes = noRemainingTokenTypesFromStockOrRiver(
        game.gameState,
        getPlayer(game),
      );
      break;
    }
    case "moveBiggerCluster": {
      game.movesBetterPosition = getMovableTokensToBiggerClusters(
        game.gameState,
        getPlayer(game),
      );
      game.placementsFromRiver = getPlacementsFromRiver(
        game.gameState,
        getPlayer(game),
      );
      break;
    }
    case "calculateIntermediateScore": {
      game.intermediateScores = calculateIntermediateScore(
        game.gameState,
        getPlayer(game),
        getOpponent(game),
      );
      break;
    }
    case "bestTurn": {
      if (game.gameState.river.length > 0) {
        const tmpGameState = removeHighlights(deepClone(game.gameState));
        tmpGameState.selectedCoordinatesFromBoard = null;
        game.bestTurn = bestTurn(
          tmpGameState,
          getPlayer(game),
          getOpponent(game),
        );
      }
      break;
    }
  }
};

export const hintCurrentPlayer = (game: GameTemplate) => {
  return game.playerTeam === PlayerColor ? game.colorHint : game.symbolHint;
};

export const getPlayer = (game: GameTemplate): keyof Token => {
  return game.playerTeam === PlayerColor ? "color" : "symbol";
};

export const getOpponent = (game: GameTemplate): keyof Token => {
  return game.playerTeam === PlayerColor ? "symbol" : "color";
};
