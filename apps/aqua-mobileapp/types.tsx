/* eslint-disable @typescript-eslint/no-namespace */
import { GameState, Score } from "@aqua/core";

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
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
  Game: { id: number } | undefined;
  Modal: undefined;
  NotFound: undefined;
};
export type GameProps = NativeStackScreenProps<RootStackParamList, "Game">;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  HomePage: undefined;
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
  team?: string;
  isWitnessGame?: boolean;
};