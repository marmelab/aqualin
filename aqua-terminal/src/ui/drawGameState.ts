import { computeStock } from "@aqua/core/model/computeStock";
import { isTokenInStock } from "@aqua/core/model/isTokenInStock";
import { Board, Cell, GameState, River, Token } from "@aqua/core/types";

import { Colors, DataColors } from "./Colors";
import { Symbols } from "./Symbols";

const axisLabels = "     A   B   C  ";
const topLine = "   ┌───┬───┬───┐";
const rowLine = "   ├───┼───┼───┤";
const baseLine = "   └───┴───┴───┘";

export function drawGameState(gameState: GameState) {
  console.clear();
  drawBoard(gameState.board);
  const { riverNumberRow, riverTokenRow } = renderRiver(gameState.river);
  console.log(riverNumberRow);
  console.log(riverTokenRow);
  console.log(renderStock(gameState));
}

export function drawBoard(board: Board) {
  console.log(axisLabels);
  console.log(topLine);
  for (let i = 0; i < board.length; i++) {
    let rowCharacters = " " + (i + 1) + " │";
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      rowCharacters += renderCell(cell) + "│";
    }
    console.log(rowCharacters);
    if (i !== board.length - 1) {
      console.log(rowLine);
    }
  }
  console.log(baseLine);
}

export function renderRiver(river: River) {
  let i = 1;
  let riverNumberRow = "RIVER ";
  let riverTokenRow = "      ";
  for (const token of river) {
    riverNumberRow += " " + i + " ";
    riverTokenRow += renderToken(token);
    i++;
  }
  return { riverNumberRow: riverNumberRow, riverTokenRow: riverTokenRow };
}

export function renderCell(cell: Cell): string {
  if (cell) {
    return renderToken(cell);
  }
  return renderEmptyToken();
}

export function renderToken(token: Token): string {
  return (
    " " + DataColors[token.color] + Symbols[token.symbol] + Colors.reset + " "
  );
}

export function renderEmptyToken(): string {
  return "   ";
}

export function renderStock(gameState: GameState): string {
  let lines = "STOCK\n";
  for (let row = 0; row < gameState.board.length; row++) {
    for (let column = 0; column < gameState.board.length; column++) {
      const token = { color: row, symbol: column };
      if (isTokenInStock(token, computeStock(gameState))) {
        lines += renderToken(token);
      } else {
        lines += renderEmptyToken();
      }
    }
    lines += "\n";
  }
  return lines;
}
