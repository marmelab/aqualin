import { PlayerColor } from "@aqua/core";
import { getSealedTokens } from "@aqua/core/model/ai/sealedCluster";
import { GameTemplate } from "src/types";

export const addHints = (game: GameTemplate) => {
  const hint = game.team === PlayerColor ? game.colorHint : game.symbolHint;
  if (hint === "opponentSealedClusters") {
    game.sealedTokens = getSealedTokens(
      game.gameState,
      game.team === PlayerColor ? "symbol" : "color",
    );
  }
};
