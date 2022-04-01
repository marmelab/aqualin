import { MinMaxGameStateTurn, GameState, Token } from "../../../types";
import { getMovableTokensToBiggerClusters } from "../upgradableCluster";
import { minMaxGameStateAfterMove } from "./minmax";

export const addMovesToBetterPosition = (
  minMaxGameStatesTurn: MinMaxGameStateTurn[],
  gameState: GameState,
  player: keyof Token,
) => {
  const movesBetterPosition = getMovableTokensToBiggerClusters(
    gameState,
    player,
  );

  movesBetterPosition.forEach((rowElement, row) => {
    rowElement.forEach((columnElement, column) => {
      if (columnElement != null) {
        columnElement.forEach((targetCoordinates) => {
          minMaxGameStatesTurn.push(
            minMaxGameStateAfterMove(
              gameState,
              { row, column },
              targetCoordinates,
            ),
          );
        });
      }
    });
  });
};
