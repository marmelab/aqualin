import { PlayerColor, Token } from "@aqua/core";
import { getSealedTokens } from "@aqua/core/model/ai/sealedCluster";
import { getMovableTokensToBiggerClusters } from "@aqua/core/model/ai/upgradableCluster";
import { GameTemplate } from "src/types";

export const addHints = (game: GameTemplate) => {
  const hint =
    game.playerTeam === PlayerColor ? game.colorHint : game.symbolHint;
  if (hint === "opponentSealedClusters") {
    game.sealedTokens = getSealedTokens(game.gameState, getOpponent(game));
  } else if (hint === "playerSealedClusters") {
    game.sealedTokens = getSealedTokens(game.gameState, getPlayer(game));
  } else if (hint === "moveBiggerCluster") {
    game.movesBetterPosition = getMovableTokensToBiggerClusters(
      game.gameState,
      getPlayer(game),
    );
  }
};

const getPlayer = (game: GameTemplate): keyof Token => {
  return game.playerTeam === PlayerColor ? "color" : "symbol";
};

const getOpponent = (game: GameTemplate): keyof Token => {
  return game.playerTeam === PlayerColor ? "symbol" : "color";
};
