import { AQUALIN_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import EventSource from "react-native-sse";

import { Board } from "../components/Board";
import { River } from "../components/River";
import { Text, View } from "../components/Themed";
import { getGame } from "../http/getGame";
import {
  GameTemplate,
  RootStackParamList,
  RootStackScreenProps,
} from "../types";

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
    <ScrollView>
      <View style={styles.container}>
        <Text>Game Id : {gameTemplate.id}</Text>
        <Text />
        <Text>You are in the {gameTemplate.team} team.</Text>
        <Text>
          {gameTemplate.isPlayerTurn
            ? "It's your turn"
            : "It's your opponent turn"}
          .
        </Text>
        <Text />
        <Text />
        <Text>Board</Text>
        <Board gameTemplate={gameTemplate} />
        <Text />
        <Text>River</Text>
        <View style={styles.river}>
          <River gameTemplate={gameTemplate} gameId={gameTemplate.id} />
        </View>
      </View>
    </ScrollView>
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
