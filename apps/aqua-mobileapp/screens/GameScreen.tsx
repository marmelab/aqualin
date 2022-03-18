import { AQUALIN_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import EventSource, { MessageEvent, EventSourceListener } from "react-native-sse";

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

let i = 0;
export default function GameScreen({ route }: RootStackScreenProps<"Game">) {
  const gameTemplate = route.params?.gameTemplate;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  React.useEffect(
    React.useCallback(() => {
      const eventSource = new EventSource(
        `${AQUALIN_URL}/game/${gameTemplate.id}/sse`,
      );
      if (eventSource) {
        eventSource.addEventListener("message", ((message: MessageEvent) => {
          if (message.data !== "" && message.data !== `${gameTemplate.nbActions}`) {
            getGame(gameTemplate.id, navigation);
          }
        }) as EventSourceListener<"message">);
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
        {gameTemplate.score != null ? 
        <View style={styles.container}>
            <Text>And the winner is</Text>
            <Text style={styles.winner}>{getWinner(gameTemplate.score)}</Text>
            <Text style={styles.pointsTitle}>Points</Text>
            <Text >Color : {gameTemplate.score.color}</Text>
            <Text >Symbol : {gameTemplate.score.symbol}</Text>
        </View>
        : null }
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
  pointsTitle: {
      paddingTop: 10
  },
  points: {
      paddingTop: 5,
      paddingLeft: 10
  },
  winner: {
      padding: 30,
      color: "gold",
      fontSize: 32
  }
});



const getWinner = (score: Score) => {
    if (score.color === score.symbol) {
        return "draw";
    }
    if (score.color > score.symbol) {
        return "Color";
    } 
    return "Symbol";
}
