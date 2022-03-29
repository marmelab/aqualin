import { PlayerColor } from "@aqua/core";
import { GameTemplate } from "src/types";
import { Hint } from "src/utils/hint";

export function renderHint(game: GameTemplate): string {
  const hint =
    game.playerTeam === PlayerColor ? game.colorHint : game.symbolHint;
  let hintString = "";
  for (const [key, value] of Object.entries(Hint)) {
    hintString += `
    <div class="radioElement">
      <input type="radio" id="${key}"
      name="hint" value="${key}" ${key !== hint ? "" : "checked"}>
      <label for="${key}">${value}</label>
    </div>`;
  }

  return hintString;
}
