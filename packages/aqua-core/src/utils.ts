import { isHighlightToken } from "./model/highlightCoordinates";
import { Board, Coordinates, GameState } from "./types";

export function deepClone<T = any>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

export const columnLabel = (columnNumber: number): string => {
  const mod = Math.floor(columnNumber / 26);
  const rest = columnNumber % 26;
  let ret = "";
  if (mod > 0) {
    ret += columnNumberToString(mod - 1);
  }
  return ret + columnNumberToString(rest);
};

const ACharCode = 65;
const columnNumberToString = (i: number): string => {
  return String.fromCharCode(i + ACharCode);
};

export const isOutOfBoard = (board: Board, row: number, column: number) => {
  return row < 0 || column < 0 || row >= board.length || column >= board.length;
};

/**
 * Out of board will return true
 * @param gameState
 * @param row
 * @param column
 * @returns
 */
export const hasToken = (
  gameState: GameState,
  row: number,
  column: number,
): boolean => {
  if (isOutOfBoard(gameState.board, row, column)) {
    return true;
  }
  return (
    gameState.board[row][column] != null &&
    !isHighlightToken(gameState.board[row][column])
  );
};

export const tokenBlocked = (
  gameState: GameState,
  coordinates: Coordinates,
) => {
  return (
    hasToken(gameState, coordinates.row - 1, coordinates.column) &&
    hasToken(gameState, coordinates.row + 1, coordinates.column) &&
    hasToken(gameState, coordinates.row, coordinates.column - 1) &&
    hasToken(gameState, coordinates.row, coordinates.column + 1)
  );
};

export const isSamePosition = (
  position1: Coordinates,
  position2: Coordinates,
) => {
  return (
    position1.row === position2.row && position1.column === position2.column
  );
};

export const isInCluster = (cluster: Coordinates[], position: Coordinates) => {
  for (const coord of cluster) {
    if (isSamePosition(coord, position)) {
      return true;
    }
  }
  return false;
};
