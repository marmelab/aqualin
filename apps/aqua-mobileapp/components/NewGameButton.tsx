import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AQUALIN_URL } from "@env";
import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { GameProps } from "../screens/GameScreen";
import { RootStackParamList } from "../types";
import { Text, View } from "./Themed";

export default function NewGameButton() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const startNewGameFromApiAsync = async () => {
    try {
      return await fetch(AQUALIN_URL + "/api/games", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          navigation.navigate("Game", { id: json?.id });
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableHighlight
      onPress={startNewGameFromApiAsync}
      accessibilityLabel="start a new game of Aqualin"
    >
      <View style={styles.button}>
        <Text>New game</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
