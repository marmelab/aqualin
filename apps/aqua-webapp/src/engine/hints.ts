import { Coordinates, PlayerColor } from "@aqua/core";
import { noRemainingTokenTypesFromStockOrRiver } from "@aqua/core/model/ai/noRemainigTokens";
import {
  checkNeighborsCells,
  getSealedAndMovableTokens,
} from "@aqua/core/model/ai/sealedCluster";
import { GameTemplate } from "src/types";

export const addHints = (game: GameTemplate) => {
  const hint =
    game.playerTeam === PlayerColor ? game.colorHint : game.symbolHint;
  switch (hint) {
    case "opponentClusters": {
      const sealedAndUnsealedTokens = getSealedAndMovableTokens(
        game.gameState,
        game.playerTeam === PlayerColor ? "symbol" : "color",
      );
      game.sealedTokens = sealedAndUnsealedTokens.sealedTokens;
      game.movableTokens = sealedAndUnsealedTokens.movableTokens;
      break;
    }
    case "playerClusters": {
      const sealedAndUnsealedTokens = getSealedAndMovableTokens(
        game.gameState,
        game.playerTeam === PlayerColor ? "color" : "symbol",
      );
      game.sealedTokens = sealedAndUnsealedTokens.sealedTokens;
      game.movableTokens = sealedAndUnsealedTokens.movableTokens;
      break;
    }
    case "noRemainingTokenTypes": {
      game.noRemainingTokenTypes = noRemainingTokenTypesFromStockOrRiver(
        game.gameState,
        game.playerTeam,
      );
      break;
    }
  }
};

export const hintCurrentPlayer = (game: GameTemplate) => {
  return game.playerTeam === PlayerColor ? game.colorHint : game.symbolHint;
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
    coordinates.row,
    coordinates.column,
    selectedCoordinatesFromBoard.row,
    selectedCoordinatesFromBoard.column,
    game.playerTeam === PlayerColor ? "symbol" : "color",
  );
};
