import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { GameTemplate, RootStackScreenProps } from "../types";
import { Board } from "../components/Board";
import { River } from "../components/River";

export interface GameProps {
  gameTemplate: GameTemplate;
}

export default function GameScreen({
  navigation,
  route,
}: RootStackScreenProps<"Game">) {
  const [gameTemplate, setGameTemplate] = useState<GameTemplate>();
  const id = route.params?.id;

  const getGame = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/games/" + id, {
        method: "GET",
      });
      const json = await response.json();
      setGameTemplate(json);
    } catch (error) {
      console.error(error);
    } finally {
      //setLoading(false);
    }
  };
  useEffect(() => {
    getGame();
  }, []);

  return !gameTemplate ? (
    <View style={styles.container}>
      <Text>Game not found.</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Board</Text>
      <Text>Player Turn : {gameTemplate.gameState.playerTurn}</Text>
      <Text>Board</Text>
      <Board
        gameState={gameTemplate.gameState}
        gameId={gameTemplate.id}
      ></Board>
      <Text>River</Text>
      <View style={styles.river}>
        <River
          gameState={gameTemplate.gameState}
          gameId={gameTemplate.id}
        ></River>
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