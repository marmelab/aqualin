import { AQUALIN_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Appearance,
  Button,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";

import Colors from "../constants/Colors";
import CommonStyle from "../constants/CommonStyle";
import { RootStackParamList } from "../types";
import { removeJwt, storeJwt } from "../utils/asyncStorage";
import ErrorComponent from "./ErrorCompnent";
import { Text, View } from "./Themed";

export default function LoginComponent(props: {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const colorScheme = Appearance.getColorScheme();
  const clearError = () => {
    setError("");
  };
  const logOut = () => {
    removeJwt();
    props.setIsAuth(false);
  };

  const onLogin = async (username: string, password: string) => {
    try {
      return await fetch(AQUALIN_URL + "/api/auth/login", {
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
          if (response.ok) {
            clearError();
            return response.json();
          }
          throw response.statusText;
        })
        .then((json) => {
          storeJwt(json);
          props.setIsAuth(true);
          navigation.navigate("HomePage");
        })
        .catch(() => setError("Wrong username or password"));
    } catch (error) {
      console.error(error);
    }
  };
  return props.isAuth ? (
    <View>
      <TouchableHighlight onPress={() => logOut()} accessibilityLabel="Log in">
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
            Log out
          </Text>
        </View>
      </TouchableHighlight>
      <Button
        title="Home Page"
        onPress={() => navigation.navigate("HomePage")}
      />
    </View>
  ) : (
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
        onPress={() => onLogin(username, password)}
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
            Log in
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
