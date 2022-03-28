import { Score } from "@aqua/core";
import { Request } from "express";

import { Game } from "./game/entities/Game";
import { User } from "./user/entities/user.entity";

export type SealedTokens = boolean[][];

export type GameTemplate = Game & {
  message?: string;
  score?: Score;
  isPlayerTurn?: boolean;
  team?: string;
  isWitnessGame?: boolean;
  nbActions: number;
  sealedTokens?: SealedTokens;
};

export type WebappRequest = Request & {
  userCookie?: User;
};
