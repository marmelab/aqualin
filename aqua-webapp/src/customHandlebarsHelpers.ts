import { Cell, GameState } from "@aqua/core";
import { handlebars } from "hbs";

import { renderCell } from "./ui/drawTokens";

export function getCustomHandlebarsHelpers() {
  handlebars.registerHelper(
    "renderCell",
    function (cell: Cell, gameState: GameState, row: number, column: number) {
      return renderCell(cell, gameState, row, column);
    },
  );
}
