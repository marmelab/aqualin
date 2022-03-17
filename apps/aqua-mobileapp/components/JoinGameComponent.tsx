import { AQUALIN_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { RootStackParamList } from "../types";
import { Text, View } from "./Themed";

export default function JoinGameComponent() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [id, onChangeId] = React.useState("");

  const joinGameFromApiAsync = async (id: string) => {
    try {
      return await fetch(AQUALIN_URL + "/api/games/" + id, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          playerAction: "join",
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          navigation.navigate("Game", { gameTemplate: json });
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(value) => onChangeId(value)}
        value={id}
        placeholder="Enter an Id of game."
        keyboardType="numeric"
      />
      <TouchableHighlight
        onPress={() => joinGameFromApiAsync(id)}
        accessibilityLabel="start a new game of Aqualin"
      >
        <View style={styles.button}>
          <Text>Join this game</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
