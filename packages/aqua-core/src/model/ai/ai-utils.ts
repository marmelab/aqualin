import { GameState, Token } from "../../types";
import { isSamePosition, isOutOfBoard } from "../../utils";

export const checkNeighborsCells = (
  game: GameState,
  token: Token,
  row: number,
  column: number,
  originalPosRow: number,
  originalPosCol: number,
  player: keyof Token,
): boolean => {
  return (
    checkCell(
      game,
      token,
      row - 1,
      column,
      originalPosRow,
      originalPosCol,
      player,
    ) ||
    checkCell(
      game,
      token,
      row + 1,
      column,
      originalPosRow,
      originalPosCol,
      player,
    ) ||
    checkCell(
      game,
      token,
      row,
      column - 1,
      originalPosRow,
      originalPosCol,
      player,
    ) ||
    checkCell(
      game,
      token,
      row,
      column + 1,
      originalPosRow,
      originalPosCol,
      player,
    )
  );
};

const checkCell = (
  game: GameState,
  token: Token,
  row: number,
  column: number,
  originalPosRow: number,
  originalPosCol: number,
  player: keyof Token,
): boolean => {
  if (
    isSamePosition(
      { row, column },
      { row: originalPosRow, column: originalPosCol },
    ) ||
    isOutOfBoard(game.board, row, column)
  ) {
    return false;
  }
  return (
    game.board[row][column] != null &&
    game.board[row][column][player] === token[player]
  );
};
