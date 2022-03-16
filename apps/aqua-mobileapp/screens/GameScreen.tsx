import { AQUALIN_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Board } from "../components/Board";
import { River } from "../components/River";
import { Text, View } from "../components/Themed";
import { getGame } from "../http/getGame";
import {
  GameTemplate,
  RootStackParamList,
  RootStackScreenProps,
} from "../types";
import EventSource from "react-native-sse";

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
  React.useEffect(
    React.useCallback(() => {
      const eventSource = new EventSource(
        `${AQUALIN_URL}/game/${gameTemplate.id}/sse`,
      );
      if (eventSource) {
        eventSource.addEventListener("message", () => {
          getGame(gameTemplate.id, navigation);
        });
      }
      return () => {
        eventSource.close();
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text>Game Id : {gameTemplate.id}</Text>
      <Text>You are in team : {gameTemplate.team} </Text>
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
