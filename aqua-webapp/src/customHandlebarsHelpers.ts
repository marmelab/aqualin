import { Cell, GameState, Token } from "@aqua/core";
import { handlebars } from "hbs";

import { renderBoardCell } from "./ui/renderBoardTokens";
import { renderRiverCell } from "./ui/renderRiverTokens";

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
}
