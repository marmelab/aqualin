import { PlayerColor } from "@aqua/core";
import { getSealedAndMovableTokens } from "@aqua/core/model/ai/sealedCluster";
import { GameTemplate } from "src/types";

export const addHints = (game: GameTemplate) => {
  const hint =
    game.playerTeam === PlayerColor ? game.colorHint : game.symbolHint;
  if (hint === "opponentClusters") {
    const sealedAndUnsealedTokens = getSealedAndMovableTokens(
      game.gameState,
      game.playerTeam === PlayerColor ? "symbol" : "color",
    );
    game.sealedTokens = sealedAndUnsealedTokens.sealedTokens;
    game.movableTokens = sealedAndUnsealedTokens.movableTokens;
  }
  if (hint === "playerClusters") {
    const sealedAndUnsealedTokens = getSealedAndMovableTokens(
      game.gameState,
      game.playerTeam === PlayerColor ? "color" : "symbol",
    );
    game.sealedTokens = sealedAndUnsealedTokens.sealedTokens;
    game.movableTokens = sealedAndUnsealedTokens.movableTokens;
  }
};
