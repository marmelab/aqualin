import { AQUALIN_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Appearance,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";

import Colors from "../constants/Colors";
import CommonStyle from "../constants/CommonStyle";
import { RootStackParamList } from "../types";
import ErrorComponent from "./ErrorCompnent";
import { Text, View } from "./Themed";

export default function CreateAccountComponent() {
  const colorScheme = Appearance.getColorScheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");

  const createAccount = async (username: string, password: string) => {
    try {
      return await fetch(AQUALIN_URL + "/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          }
          throw response.statusText;
        })
        .then(() => {
          navigation.navigate("Authentication");
        })
        .catch(() => setError("This username already exist."));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.center}>
      <Text
        style={
          colorScheme === "dark" ? Colors.textColorDark : Colors.textColorLight
        }
      >
        Username
      </Text>
      <TextInput
        style={[
          CommonStyle.input,
          colorScheme === "dark" ? Colors.inputDark : Colors.inputLight,
        ]}
        onChangeText={(value) => setUsername(value)}
        value={username}
        placeholder="Username"
      />
      <Text
        style={
          colorScheme === "dark" ? Colors.textColorDark : Colors.textColorLight
        }
      >
        Password
      </Text>
      <TextInput
        style={[
          CommonStyle.input,
          colorScheme === "dark" ? Colors.inputDark : Colors.inputLight,
        ]}
        onChangeText={(value) => setPassword(value)}
        value={password}
        placeholder="Password"
        textContentType="password"
        secureTextEntry
      />
      <TouchableHighlight
        onPress={() => createAccount(username, password)}
        accessibilityLabel="Log in"
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
            Create
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
});
