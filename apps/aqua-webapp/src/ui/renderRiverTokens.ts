import { Token } from "@aqua/core";

import { GameTemplate } from "../types";
import { Colors } from "./Colors";
import { renderImg } from "./renderImg";

export function renderRiverCell(
  token: Token,
  game: GameTemplate,
  index: number,
): string {
  if (!game.isPlayerTurn) {
    let css = game.gameState.selectedTokenFromRiver === index ? "selected" : "";
    return `<div class="cell ${Colors[token.color]} ${css} " >${renderImg(
      token,
    )}</div>`;
  }

  let css =
    game.gameState.selectedTokenFromRiver === index ? "selected" : "selectable";

  if (game.bestTurn && game.isPlayerTurn) {
    const move = game.bestTurn.minMaxGameStateTurn.move;
    const place = game.bestTurn.minMaxGameStateTurn.place;

    if ((game.gameState.moveDone || !move) && index === place.indexRiverToken) {
      css += " moveBetterPosition";
    }
  } else if (game.placementsFromRiver && game.placementsFromRiver[index]) {
    css += " moveBetterPosition";
  }
  return `<a href="/game/${game.id}/river/${index}" class="cell ${
    Colors[token.color]
  } ${css}" >${renderImg(token)}</a>`;
}
