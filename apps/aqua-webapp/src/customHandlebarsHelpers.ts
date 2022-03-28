import { Cell, Score, Token } from "@aqua/core";
import { handlebars } from "hbs";

import { GameTemplate } from "./types";
import { renderBoardCell } from "./ui/renderBoardTokens";
import { renderHint } from "./ui/renderHint";
import { renderRiverCell } from "./ui/renderRiverTokens";
import { renderScore } from "./ui/renderScore";

export function getCustomHandlebarsHelpers() {
  handlebars.registerHelper(
    "renderCell",
    function (cell: Cell, game: GameTemplate, row: number, column: number) {
      return renderBoardCell(cell, game, row, column);
    },
  );
  handlebars.registerHelper(
    "renderRiver",
    function (token: Token, game: GameTemplate, index: number) {
      return renderRiverCell(token, game, index);
    },
  );
  handlebars.registerHelper("renderScore", function (score: Score) {
    return renderScore(score);
  });
  handlebars.registerHelper("renderHint", function (game: GameTemplate) {
    return renderHint(game);
  });
}
