import { BooleanBoard, Player, Score } from "@aqua/core";
import { Request } from "express";
import { Colors } from "./ui/Colors";
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
};

export type WebappRequest = Request & {
  userCookie?: User;
};
