import { Token } from "@aqua/core";
import { isPlayerTurn } from "src/engine/engine.service";
import { GameTemplate } from "src/types";

import { DataColors } from "./Colors";
import { Symbols } from "./Symbols";

export function renderRiverCell(
  token: Token,
  game: GameTemplate,
  index: number,
): string {
  const color = DataColors[token.color];
  const symbol = Symbols[token.symbol];
  if (!game.isPlayerTurn) {
    return `<div class="cell" style="color:${color};">${symbol}</div>`;
  }
  const css =
    game.gameState.selectedTokenFromRiver === index ? "selected" : "selectable";
  return `<a href="/game/${game.id}/river/${index}" class="cell ${css}" style="color:${color};">${symbol}</a>`;
}
