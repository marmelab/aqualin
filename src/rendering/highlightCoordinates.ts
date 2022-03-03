import { GameState, Board, Token } from "../engine/GameStateTypes";
import { cleanCell, allocateCell } from "../engine/cellActions";
import { Coordinates } from "../types";
import { deepClone } from "../utils";

const highlightToken = { color: 100, symbol: 100 };

export function highlightCoordinates(
  coordinates: Coordinates,
  highlightedGameState: GameState
): GameState {
  const { column, row } = coordinates;
  let gameState = deepClone(highlightedGameState);

  if (!gameState.board[row][column]) {
    throw new Error("Invalid source coordinates");
  }

  let possibleCells = getPossibleMoves(gameState.board, { row, column });
  highlightPossibleCells(possibleCells, gameState.board);
  return gameState;
}

export function cleanGameState(gameState: GameState) {
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board.length; j++) {
      if (gameState.board[i][j] && isHighlightToken(gameState.board[i][j])) {
        cleanCell({ row: i, column: j }, gameState);
      }
    }
  }
}

function isHighlightToken(token: Token) {
  if (token.color === highlightToken.color) {
    return true;
  }
  return false;
}

export function getPossibleMoves(
  board: Board,
  position: Coordinates
): Coordinates[] {
  let column = position.column;
  let row = position.row;
  let possibleCells: Coordinates[] = [];
  for (let i = column + 1; i < board.length; i++) {
    if (board[row][i]) {
      break;
    }
    possibleCells.push({ row, column: i });
  }
  for (let i = column - 1; i >= 0; i--) {
    if (board[row][i]) {
      break;
    }
    possibleCells.push({ row, column: i });
  }

  for (let i = row + 1; i < board.length; i++) {
    if (board[i][column]) {
      break;
    }
    possibleCells.push({ row: i, column });
  }

  for (let i = row - 1; i >= 0; i--) {
    if (board[i][column]) {
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
