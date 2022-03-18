/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

/* eslint-disable @typescript-eslint/no-namespace */
import { GameState, Player, Score } from "@aqua/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  CreateAccount: undefined;
  HomePage: undefined;
  Game: { gameTemplate: GameTemplate };
  Authentication: { error: string } | undefined;
  OpenGames: undefined;
  HowToPlay: undefined;
  NotFound: undefined;
};
export type GameProps = NativeStackScreenProps<RootStackParamList, "Game">;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Authentication: { error: string } | undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type GameTemplate = {
  id: number;
  gameState: GameState;
  color: string;
  symbol: string;
  message?: string;
  score?: Score;
  isPlayerTurn?: boolean;
  team?: Player;
  isWitnessGame?: boolean;
  nbActions: number;
};
