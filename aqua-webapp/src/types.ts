import { Score } from "@aqua/core";

import { Game } from "./entities/GameEntity";

export type GameTemplate = Game & {
  message?: string;
  score?: Score;
  isPlayerTurn?: boolean;
};
