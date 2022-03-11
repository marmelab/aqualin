import { Token } from "@aqua/core";
import { isPlayerTurn } from "src/engine/engine.service";
import { GameTemplate } from "src/types";

import { renderImg } from "./renderImg";

export function renderRiverCell(
  token: Token,
  game: GameTemplate,
  index: number,
): string {
  if (!game.isPlayerTurn) {
    return `<div class="cell" >${renderImg(token)}</div>`;
  }
  const css =
    game.gameState.selectedTokenFromRiver === index ? "selected" : "selectable";
  return `<a href="/game/${
    game.id
  }/river/${index}" class="cell ${css}" >${renderImg(token)}</a>`;
}
