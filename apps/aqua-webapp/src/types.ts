import { MovesToBiggerCluster, Player, Score, SealedTokens } from "@aqua/core";
import { Request } from "express";

import { Game } from "./game/entities/Game";
import { User } from "./user/entities/user.entity";

export type GameTemplate = Game & {
  message?: string;
  score?: Score;
  isPlayerTurn?: boolean;
  playerTeam?: Player;
  isWitnessGame?: boolean;
  nbActions: number;
  sealedTokens?: SealedTokens;
  movesBetterPosition?: MovesToBiggerCluster;
};

export type WebappRequest = Request & {
  userCookie?: User;
};
