import { Board, Coordinates, GameState, Token } from "../types";
import { deepClone } from "../utils";
import { allocateCell } from "./cellActions";

export const highlightToken = { color: 100, symbol: 100 };

export function highlightCoordinates(
  coordinates: Coordinates,
  highlightedGameState: GameState,
): GameState {
  const { column, row } = coordinates;
  const gameState = deepClone(highlightedGameState);

  if (!gameState.board[row][column]) {
    throw new Error("Invalid source coordinates");
  }

  const possibleCells = getPossibleMoves(gameState.board, { row, column });
  highlightPossibleCells(possibleCells, gameState.board);
  return gameState;
}

export function isHighlightToken(token: Token) {
  if (token.color === highlightToken.color) {
    return true;
  }
  return false;
}

export function getPossibleMoves(
  board: Board,
  position: Coordinates,
): Coordinates[] {
  const column = position.column;
  const row = position.row;
  const possibleCells: Coordinates[] = [];
  for (let i = column + 1; i < board.length; i++) {
    if (board[row][i] && !isHighlightToken(board[row][i])) {
      break;
    }
    possibleCells.push({ row, column: i });
  }
  for (let i = column - 1; i >= 0; i--) {
    if (board[row][i] && !isHighlightToken(board[row][i])) {
      break;
    }
    possibleCells.push({ row, column: i });
  }

  for (let i = row + 1; i < board.length; i++) {
    if (board[i][column] && !isHighlightToken(board[i][column])) {
      break;
    }
    possibleCells.push({ row: i, column });
  }

  for (let i = row - 1; i >= 0; i--) {
    if (board[i][column] && !isHighlightToken(board[i][column])) {
      break;
    }
    possibleCells.push({ row: i, column });
  }
  return possibleCells;
}

function highlightPossibleCells(possibleCells: Coordinates[], board: Board) {
  for (let i = 0; i < possibleCells.length; i++) {
    allocateCell(possibleCells[i], board, highlightToken);
  }
}
