import { Token } from "@aqua/core";

import { Colors } from "./Colors";
import { Symbols } from "./Symbols";

export const renderImg = (token: Token): string => {
  return `<img class="${
    Colors[token.color]
  }" style="max-with:60px;max-height:60px;" src="/svg/${
    Symbols[token.symbol]
  }.svg"></img>`;
};
