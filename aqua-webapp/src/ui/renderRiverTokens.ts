import { Token } from "@aqua/core";
import { GameTemplate } from "src/types";

import { renderImg } from "./renderImg";

export function renderRiverCell(
  token: Token,
  game: GameTemplate,
  index: number,
): string {
  const css =
    game.gameState.selectedTokenFromRiver === index ? "selected" : "selectable";
  return `<a href="/game/${
    game.id
  }/river/${index}" class="cell ${css}" >${renderImg(token)}</a>`;
}
