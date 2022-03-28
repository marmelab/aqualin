import { PlayerColor, PlayerSymbol, Score } from "@aqua/core";

export function renderScore(score: Score): string {
  let scoreString =
    `<div>Colors : ${score.color}</div>` +
    `<div> Symbols: ${score.symbol}</div>`;
  if (score.color === score.symbol) {
    scoreString += "<div>draw</div>";
  } else {
    scoreString +=
      `<div>And the winner is :</div>` +
      `<div class="winner">` +
      (score.color > score.symbol ? PlayerColor : PlayerSymbol) +
      "</div>";
  }
  return scoreString;
}
