import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Appearance,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";

import Colors from "../constants/Colors";
import CommonStyle from "../constants/CommonStyle";
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
      return await joinGame(id, navigation);
    } catch (e) {
      setError("You can't join this game.");
    }
  };
  const colorScheme = Appearance.getColorScheme();
  return (
    <View style={[styles.center, styles.margin]}>
      <TextInput
        style={[
          CommonStyle.input,
          colorScheme === "dark" ? Colors.inputDark : Colors.inputLight,
        ]}
        onChangeText={(value) => onChangeId(value)}
        value={id}
        placeholder="Enter an Id of game."
        keyboardType="numeric"
      />
      <TouchableHighlight
        onPress={() => joinGameFromApiAsync(id)}
        accessibilityLabel="start a new game of Aqualin"
      >
        <View
          style={[
            CommonStyle.button,
            colorScheme === "dark" ? Colors.buttonDark : Colors.buttonLight,
            styles.center,
          ]}
        >
          <Text
            style={
              colorScheme === "dark"
                ? Colors.buttonTextColorDark
                : Colors.buttonTextColorLight
            }
          >
            Join this game
          </Text>
        </View>
      </TouchableHighlight>
      <ErrorComponent error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  margin: {
    margin: 20,
  },
});
