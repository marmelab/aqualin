import {
  BooleanBoard,
  IntermediateScore,
  MovesToBiggerCluster,
  Player,
  Score,
} from "@aqua/core";
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
  sealedTokens?: BooleanBoard;
  movableTokens?: BooleanBoard;
  noRemainingTokenTypes?: number[];
  movesBetterPosition?: MovesToBiggerCluster;
  intermediateScores?: IntermediateScore;
};

export type WebappRequest = Request & {
  userCookie?: User;
};
