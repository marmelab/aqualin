import {
  calculateIntermediateScore,
  checkNeighborsCells,
  Coordinates,
  getMovableTokensToBiggerClusters,
  getPlacementsFromRiver,
  getSealedAndMovableTokens,
  noRemainingTokenTypesFromStockOrRiver,
  PlayerColor,
  Token,
} from "@aqua/core";
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

export const checkHintCleaverMove = (
  game: GameTemplate,
  coordinates: Coordinates,
) => {
  const board = game.gameState.board;
  const selectedCoordinatesFromBoard =
    game.gameState.selectedCoordinatesFromBoard;
  const selectedTokenFromBoard =
    board[selectedCoordinatesFromBoard.row][
      selectedCoordinatesFromBoard.column
    ];
  return !checkNeighborsCells(
    game.gameState,
    selectedTokenFromBoard,
    {
      row: coordinates.row,
      column: coordinates.column,
    },
    {
      row: selectedCoordinatesFromBoard.row,
      column: selectedCoordinatesFromBoard.column,
    },
    getOpponent(game),
  );
};
