import { Cell, GameState, highlightToken, Token } from "@aqua/core";

import { DataColors } from "./Colors";
import { Symbols } from "./Symbols";

export function renderBoardCell(
  cell: Cell,
  gameState: GameState,
  row: number,
  column: number,
): string {
  if (cell) {
    return renderToken(cell, gameState, row, column);
  }
  return renderEmptyToken(gameState, row, column);
}

export function renderToken(
  token: Token,
  gameState: GameState,
  row: number,
  column: number,
): string {
  const color = DataColors[token.color];
  const symbol = Symbols[token.symbol];

  let prefix: string, suffix: string;
  let cssClass = "cell";

  if (gameState.moveDone) {
    prefix = "<div";
    suffix = "</div>";
  } else if (
    gameState.selectedCoordinatesFromBoard &&
    gameState.selectedCoordinatesFromBoard.row == row &&
    gameState.selectedCoordinatesFromBoard.column == column
  ) {
    prefix = "<div";
    suffix = "</div>";
    cssClass += " selected";
  } else {
    prefix = `<a href="/board/${row}/${column}" `;
    suffix = "</a>";
    cssClass += " selectable";
  }

  return `${prefix} class="${cssClass}" style="color:${color};">${symbol}${suffix}`;
}

export function renderEmptyToken(
  gameState: GameState,
  row: number,
  column: number,
): string {
  let prefix: string, suffix: string;

  let cssClass = "emptyCell";
  if (gameState.selectedTokenFromRiver != null) {
    prefix = `<a href="/board/${row}/${column}" `;
    suffix = "</a>";
    cssClass += " selectable";
  } else {
    prefix = "<div";
    suffix = "</div>";
  }
  return `${prefix} class="${cssClass}">${suffix}`;
}
