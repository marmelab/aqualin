import { Cell, isHighlightToken, Token } from "@aqua/core";
import { tokenBlocked } from "@aqua/core/utils";

import { GameTemplate } from "../types";
import { Colors } from "./Colors";
import { renderImg } from "./renderImg";

export function renderBoardCell(
  cell: Cell,
  game: GameTemplate,
  row: number,
  column: number,
): string {
  if (cell) {
    return renderToken(cell, game, row, column);
  }
  return renderEmptyToken(game, row, column);
}

export function renderToken(
  token: Token,
  game: GameTemplate,
  row: number,
  column: number,
): string {
  const tokenHighlight = isHighlightToken(token);
  const filter = tokenHighlight ? "dot" : Colors[token.color];

  const rendedToken = tokenHighlight ? "" : renderImg(token);
  const coordFromBoard = game.gameState.selectedCoordinatesFromBoard;

  let sealedToken = "";
  if (game.sealedTokens && game.sealedTokens[row][column]) {
    sealedToken = "sealedClusterToken";
  }

  if (!game.isPlayerTurn || game.gameState.moveDone) {
    return `<div class="cell ${filter} ${sealedToken}" >${rendedToken}</div>`;
  } else if (
    coordFromBoard &&
    coordFromBoard.row === row &&
    coordFromBoard.column === column
  ) {
    return `<div class="cell ${filter} selected ${sealedToken}" >${rendedToken}</div>`;
  }

  if (!tokenHighlight && tokenBlocked(game.gameState, { row, column })) {
    return `<div class="cell ${filter} ${sealedToken}" >${rendedToken}</div>`;
  }
  let moveBetterPosition = "";
  if (game.movesBetterPosition && game.movesBetterPosition[row][column]) {
    moveBetterPosition = "moveBetterPosition";
  }
  return `<a href="/game/${game.id}/board/${row}/${column}" class="cell ${filter} selectable ${sealedToken} ${moveBetterPosition}" >${rendedToken}</a>`;
}

export function renderEmptyToken(
  game: GameTemplate,
  row: number,
  column: number,
): string {
  if (game.gameState.selectedTokenFromRiver != null && game.isPlayerTurn) {
    return `<a href="/game/${game.id}/board/${row}/${column}" class="emptyCell selectable"></a>`;
  }
  return `<div class="emptyCell"></div>`;
}
