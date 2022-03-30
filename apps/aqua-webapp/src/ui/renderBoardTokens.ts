import { Cell, isHighlightToken, PlayerColor, Token } from "@aqua/core";
import { tokenBlocked } from "@aqua/core/utils";
import { checkHintCleaverMove, hintCurrentPlayer } from "src/engine/hints";

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
  const player = game.playerTeam === PlayerColor ? "color" : "symbol";
  const tokenHighlight = isHighlightToken(token);
  let notCleaverMoveClass = "";
  if (tokenHighlight && hintCurrentPlayer(game) === "opponentClusters") {
    if (!checkHintCleaverMove(game, { row, column })) {
      notCleaverMoveClass = "notCleaverMove";
    }
  }

  const filter = tokenHighlight ? "dot" : Colors[token.color];

  const rendedToken = tokenHighlight ? "" : renderImg(token);
  const coordFromBoard = game.gameState.selectedCoordinatesFromBoard;

  let sealedTokenClass = "";
  let movableTokenClass = "";
  let noRemainingTokenTypeClass = "";
  if (game.sealedTokens && game.sealedTokens[row][column]) {
    sealedTokenClass = "sealedClusterToken";
  }

  if (game.movableTokens && game.movableTokens[row][column]) {
    movableTokenClass = "movableClusterToken";
  }

  if (
    game.noRemainingTokenTypes &&
    game.noRemainingTokenTypes.indexOf(
      game.gameState.board[row][column][player],
    ) !== -1
  ) {
    noRemainingTokenTypeClass = "noRemainingTokenType";
  }
  if (!game.isPlayerTurn || game.gameState.moveDone) {
    return `<div class="cell ${filter} ${sealedTokenClass} ${movableTokenClass} ${noRemainingTokenTypeClass}" >${rendedToken}</div>`;
  } else if (
    coordFromBoard &&
    coordFromBoard.row === row &&
    coordFromBoard.column === column
  ) {
    return `<div class="cell ${filter} selected ${sealedTokenClass} ${movableTokenClass} ${noRemainingTokenTypeClass}" >${rendedToken}</div>`;
  }

  if (!tokenHighlight && tokenBlocked(game.gameState, { row, column })) {
    return `<div class="cell ${filter} ${sealedTokenClass} ${noRemainingTokenTypeClass}" >${rendedToken}</div>`;
  }
  return `<a href="/game/${game.id}/board/${row}/${column}" class="cell ${filter} selectable ${notCleaverMoveClass} ${sealedTokenClass} ${movableTokenClass} ${noRemainingTokenTypeClass}" >${rendedToken}</a>`;
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
