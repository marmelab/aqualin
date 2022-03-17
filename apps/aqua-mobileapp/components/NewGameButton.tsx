import { AQUALIN_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Appearance, StyleSheet, TouchableHighlight } from "react-native";

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
          navigation.navigate("Game", { gameTemplate: json });
        });
    } catch (error) {
      console.error(error);
    }
  };
  const colorScheme = Appearance.getColorScheme()
  return (
    <TouchableHighlight
      onPress={startNewGameFromApiAsync}
      accessibilityLabel="start a new game of Aqualin"
    >
      <View style={[commonStyles.button, colorScheme === "dark" ? darkStyles.button : lightStyles.button]}>
        <Text>New game</Text>
      </View>
    </TouchableHighlight>
  );
}

const commonStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
  },
});


const darkStyles = StyleSheet.create({
  button: {
    backgroundColor: "#444444",
  }
});

const lightStyles = StyleSheet.create({
  button: {
    backgroundColor: "#DDDDDD",
  }
});
