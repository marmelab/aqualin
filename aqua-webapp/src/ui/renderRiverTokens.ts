import { Token } from "@aqua/core";
import { GameTemplate } from "src/types";

import { DataColors } from "./Colors";
import { renderImg } from "./renderImg";
import { Symbols } from "./Symbols";

export function renderRiverCell(
  token: Token,
  game: GameTemplate,
  index: number,
): string {
  const color = DataColors[token.color];
  const symbol = Symbols[token.symbol];
  const css =
    game.gameState.selectedTokenFromRiver === index ? "selected" : "selectable";
  return `<a href="/game/${
    game.id
  }/river/${index}" class="cell ${css}" >${renderImg(token)}</a>`;
}
