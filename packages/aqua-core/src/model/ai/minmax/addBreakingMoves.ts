import {
  BooleanBoard,
  GameState,
  MinMaxGameStateTurn,
  Token,
} from "../../../types";
import { deepClone } from "../../../utils";
import { getPossibleMoves } from "../../highlightCoordinates";
import { checkHintCleaverMove } from "../sealedCluster";
import { minMaxGameStateAfterMove } from "./minmax";

export const addBreakingMoves = (
  breakingMoves: BooleanBoard,
  minMaxGameStatesTurn: MinMaxGameStateTurn[],
  gameState: GameState,
  opponent: keyof Token,
) => {
  breakingMoves.forEach((rowElement, row) => {
    rowElement.forEach((columnElement, column) => {
      if (columnElement) {
        getPossibleMoves(gameState.board, { row, column }).forEach(
          (targetCoordinates) => {
            const tmpGameState = deepClone(gameState);
            tmpGameState.selectedCoordinatesFromBoard = { row, column };
            if (
              checkHintCleaverMove(tmpGameState, targetCoordinates, opponent)
            ) {
              minMaxGameStatesTurn.push(
                minMaxGameStateAfterMove(
                  tmpGameState,
                  {
                    row,
                    column,
                  },
                  targetCoordinates,
                ),
              );
            }
          },
        );
      }
    });
  });
};
