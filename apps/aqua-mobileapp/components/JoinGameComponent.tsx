import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Appearance, StyleSheet,
  TextInput,
  TouchableHighlight
} from "react-native";
import { joinGame } from "../http/joinGame";
import { RootStackParamList } from "../types";
import ErrorComponent from "./ErrorCompnent";
import { Text, View } from "./Themed";



export default function JoinGameComponent() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [id, onChangeId] = React.useState("");
  const [error, setError] = React.useState("");

  const joinGameFromApiAsync = async (id: string) => {
    try {
      return await joinGame(id,navigation);
    } catch (e) {
     setError("You can't join this game.");
    }
  };
  const colorScheme = Appearance.getColorScheme()
  return (
    <View>
      <TextInput
        style={[commonStyles.input, colorScheme === "dark" ? darkStyles.input : lightStyles.input]}
        onChangeText={(value) => onChangeId(value)}
        value={id}
        placeholder="Enter an Id of game."
        keyboardType="numeric"
      />
      <TouchableHighlight
        onPress={() => joinGameFromApiAsync(id)}
        accessibilityLabel="start a new game of Aqualin"
      >
        <View style={[commonStyles.button, colorScheme === "dark" ? darkStyles.button : lightStyles.button]}>
          <Text>Join this game</Text>
        </View>
      </TouchableHighlight>
      <ErrorComponent error={error}/>
    </View>
  );
}

const commonStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});


const darkStyles = StyleSheet.create({
  button: {
    backgroundColor: "#444444",
  },
  input: {
    backgroundColor: "grey"
  }
});

const lightStyles = StyleSheet.create({
  button: {
    backgroundColor: "#DDDDDD",
  },
  input: {
  }
});
