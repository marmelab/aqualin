import { isHighlightToken } from "./model/highlightCoordinates";
import { Coordinates, GameState } from "./types";

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

export const tokenBlocked = (
  gameState: GameState,
  coordinates: Coordinates,
) => {
  let blocked = true;
  if (coordinates.row !== 0) {
    blocked =
      blocked &&
      gameState.board[coordinates.row - 1][coordinates.column] != null &&
      !isHighlightToken(
        gameState.board[coordinates.row - 1][coordinates.column],
      );
  }
  if (coordinates.row !== gameState.board.length - 1) {
    blocked =
      blocked &&
      gameState.board[coordinates.row + 1][coordinates.column] != null &&
      !isHighlightToken(
        gameState.board[coordinates.row + 1][coordinates.column],
      );
  }
  if (coordinates.column !== 0) {
    blocked =
      blocked &&
      gameState.board[coordinates.row][coordinates.column - 1] != null &&
      !isHighlightToken(
        gameState.board[coordinates.row][coordinates.column - 1],
      );
  }
  if (coordinates.column !== gameState.board.length - 1) {
    blocked =
      blocked &&
      gameState.board[coordinates.row][coordinates.column + 1] != null &&
      !isHighlightToken(
        gameState.board[coordinates.row][coordinates.column + 1],
      );
  }
  return blocked;
};
