import { GameState, Score, Token } from "@aqua/core";

import { DataColors } from "./Colors";
import { Symbols } from "./Symbols";

export function renderScore(score: Score): string {
  let scoreString =
    `<div>Colors : ${score.color}</div>` +
    `<div> Symbols: ${score.symbol}</div>` +
    `<div>And the winner is :</div>` +
    `<div class="winner">`;

  if (score.color == score.symbol) {
    scoreString + "draw";
  } else {
    scoreString += score.color > score.symbol ? "Color" : "Symbol";
  }
  return (scoreString += "</div>");
}
