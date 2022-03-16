import React, { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import {
  GameTemplate,
  RootStackParamList,
  RootStackScreenProps,
} from "../types";
import { Board } from "../components/Board";
import { River } from "../components/River";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import { getGame } from "../http/getGame";

export interface GameProps {
  gameTemplate: GameTemplate;
}

export default function GameScreen({ route }: RootStackScreenProps<"Game">) {
  const gameTemplate = route.params?.gameTemplate;
  if (!gameTemplate) {
    return (
      <View style={styles.container}>
        <Text>Game not found.</Text>
      </View>
    );
  }
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useFocusEffect(
    React.useCallback(() => {
      const timeoutId = setTimeout(
        () => getGame(gameTemplate.id, navigation),
        5000,
      );
      return () => {
        clearTimeout(timeoutId);
      };
    }, []),
  );

  const myTeam = gameTemplate.isPlayerTurn
    ? gameTemplate.gameState.playerTurn
    : gameTemplate.gameState.playerTurn === "Color"
    ? "Symbol"
    : "Color";

  return (
    <View style={styles.container}>
      <Text>Game Id : {gameTemplate.id}</Text>
      <Text>You are in team : {myTeam} </Text>
      <Text>Player Turn : {gameTemplate.gameState.playerTurn}</Text>
      <Text>Board</Text>
      <Board gameTemplate={gameTemplate} gameId={gameTemplate.id} />
      <Text>River</Text>
      <View style={styles.river}>
        <River gameTemplate={gameTemplate} gameId={gameTemplate.id} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  river: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
