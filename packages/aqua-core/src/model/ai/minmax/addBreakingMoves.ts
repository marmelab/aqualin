import {
  BooleanBoard,
  GameState,
  MinMaxGameStateTurn,
  Token,
} from "../../../types";
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
            gameState.selectedCoordinatesFromBoard = { row, column };
            if (checkHintCleaverMove(gameState, targetCoordinates, opponent)) {
              minMaxGameStatesTurn.push(
                minMaxGameStateAfterMove(
                  gameState,
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
