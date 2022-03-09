import { Cell, GameState, Score, Token } from "@aqua/core";
import { handlebars } from "hbs";

import { renderBoardCell } from "./ui/renderBoardTokens";
import { renderRiverCell } from "./ui/renderRiverTokens";
import { renderScore } from "./ui/renderScore";

export function getCustomHandlebarsHelpers() {
  handlebars.registerHelper(
    "renderCell",
    function (cell: Cell, gameState: GameState, row: number, column: number) {
      return renderBoardCell(cell, gameState, row, column);
    },
  );
  handlebars.registerHelper(
    "renderRiver",
    function (token: Token, gameState: GameState, index: number) {
      return renderRiverCell(token, gameState, index);
    },
  );
  handlebars.registerHelper("renderScore", function (score: Score) {
    return renderScore(score);
  });
}
