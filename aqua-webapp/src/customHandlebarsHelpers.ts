import { handlebars } from "hbs";

import { renderCell } from "./ui/drawTokens";

export function getCustomHandlebarsHelpers() {
  handlebars.registerHelper("renderCell", function (cell) {
    return renderCell(cell);
  });
  handlebars.registerHelper("loud", function (aString) {
    return "HELLO";
  });
}
