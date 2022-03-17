import { AQUALIN_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Appearance,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from "react-native";

import { RootStackParamList } from "../types";
import ErrorComponent from "./ErrorCompnent";
import { Text, View } from "./Themed";

export default function CreateAccountComponent() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const [error, setError] = React.useState("");

  const createAccount = async (username: string, password:string) => {
    try {
      return await fetch(AQUALIN_URL + "/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
         username,password
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          navigation.navigate("Authentication");
        }). catch(error =>setError(error) );;
    } catch (error) {
      console.error(error);
    }
  };
  const colorScheme = Appearance.getColorScheme()

  return (
    <View>
      <Text>Username</Text>
      <TextInput
        style={[commonStyles.input, colorScheme === "dark" ? darkStyles.input : lightStyles.input]}
        onChangeText={(value) => setUsername(value)}
        value={username}
        placeholder="Username"
      />
      <Text>Password</Text>
       <TextInput
        style={[commonStyles.input, colorScheme === "dark" ? darkStyles.input : lightStyles.input]}
        onChangeText={(value) => setPassword(value)}
        value={password}
        placeholder="Password"
        textContentType="password"
        secureTextEntry
      />
      <TouchableHighlight
        onPress={() =>createAccount(username, password)}
        accessibilityLabel="Log in"
      >
        <View style={[commonStyles.button, colorScheme === "dark" ? darkStyles.button : lightStyles.button]}>
          <Text>Create</Text>
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
