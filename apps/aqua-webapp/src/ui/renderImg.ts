import { Token } from "@aqua/core";

import { Symbols } from "./Symbols";

export const renderImg = (token: Token): string => {
  return `<img  style="max-width:60px;max-height:60px;filter:invert(100%)" src="/svg/${
    Symbols[token.symbol]
  }.svg"></img>`;
};
