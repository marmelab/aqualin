import React, { useEffect, useState } from "react";

import { AQUALIN_URL } from "@env";

import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { GameTemplate, RootStackScreenProps } from "../types";
import { Board } from "../components/Board";
import { River } from "../components/River";

export interface GameProps {
  gameTemplate: GameTemplate;
}

export default function GameScreen({ route }: RootStackScreenProps<"Game">) {
  const gameTemplate = route.params?.gameTemplate;
  return !gameTemplate ? (
    <View style={styles.container}>
      <Text>Game not found.</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Board</Text>
      <Text>Player Turn : {gameTemplate.gameState.playerTurn}</Text>
      <Text>Board</Text>
      <Board gameTemplate={gameTemplate} gameId={gameTemplate.id} />
      <Text>River</Text>
      <View style={styles.river}>
        <River gameTemplate={gameTemplate} gameId={gameTemplate.id} />
      </View>
    </View>
  );
}

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
