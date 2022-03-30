import { BooleanBoard, GameState, MovesToBiggerCluster } from "../../types";
import { getPlayer } from "../../utils";
import { addEdges, constructBaseGraph } from "../constructGraph";
import { noRemainingTokenTypesFromStockOrRiver } from "./noRemainigTokens";
import { getSealedAndMovableTokens } from "./sealedCluster";
import { getMovableTokensToBiggerClusters } from "./upgradableCluster";

// TODO ADD placement from RIVER
export const calculateIntermediateScore = (
  gameState: GameState,
  sealedTokens?: BooleanBoard,
  movableTokens?: BooleanBoard,
  noRemainingTokenTypes?: number[],
  movesBetterPosition?: MovesToBiggerCluster,
) => {
  const player = getPlayer(gameState);
  const graph = addEdges(gameState, constructBaseGraph(gameState), player);

  if (!sealedTokens || !movableTokens) {
    const sealedAndUnsealedTokens = getSealedAndMovableTokens(
      gameState,
      getPlayer(gameState),
      graph,
    );
    sealedTokens = sealedAndUnsealedTokens.sealedTokens;
    movableTokens = sealedAndUnsealedTokens.movableTokens;
  }

  if (!noRemainingTokenTypes) {
    noRemainingTokenTypes = noRemainingTokenTypesFromStockOrRiver(
      gameState,
      getPlayer(gameState),
    );
  }

  if (!movesBetterPosition) {
    movesBetterPosition = getMovableTokensToBiggerClusters(
      gameState,
      getPlayer(gameState),
      graph,
    );
  }
};
