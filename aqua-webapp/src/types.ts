import { Score } from "@aqua/core";

import { Game } from "./game/entities/Game";

export type GameTemplate = Game & {
  message?: string;
  score?: Score;
};
