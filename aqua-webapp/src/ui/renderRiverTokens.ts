import { GameState, Token } from "@aqua/core";

import { DataColors } from "./Colors";
import { renderImg } from "./renderImg";
import { Symbols } from "./Symbols";

export function renderRiverCell(
  token: Token,
  gameState: GameState,
  index: number,
): string {
  const color = DataColors[token.color];
  const symbol = Symbols[token.symbol];
  const css =
    gameState.selectedTokenFromRiver === index ? "selected" : "selectable";
  return `<a href="/river/${index}" class="cell ${css}" >${renderImg(
    token,
  )}</a>`;
}
