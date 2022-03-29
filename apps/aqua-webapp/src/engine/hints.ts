import { PlayerColor } from "@aqua/core";
import { getSealedTokens } from "@aqua/core/model/ai/sealedCluster";
import { GameTemplate } from "src/types";

export const addHints = (game: GameTemplate) => {
  const hint =
    game.playerTeam === PlayerColor ? game.colorHint : game.symbolHint;
  if (hint === "opponentSealedClusters") {
    game.sealedTokens = getSealedTokens(
      game.gameState,
      game.playerTeam === PlayerColor ? "symbol" : "color",
    );
  }
  if (hint === "playerSealedClusters") {
    game.sealedTokens = getSealedTokens(
      game.gameState,
      game.playerTeam === PlayerColor ? "color" : "symbol",
    );
  }
};
