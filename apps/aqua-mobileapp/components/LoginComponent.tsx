import { AQUALIN_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  Appearance,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import Colors from "../constants/Colors";
import CommonStyle from "../constants/CommonStyle";
import { RootStackParamList } from "../types";
import { storeJwt } from "../utils/asyncStorage";
import ErrorComponent from "./ErrorCompnent";
import { Text, View } from "./Themed";

export default function LoginComponent() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  

  const colorScheme = Appearance.getColorScheme()
  const clearError = () => {
    setError('');
  };

  

  const onLogin = async (username: string, password:string) => {
    try {
      return await fetch(AQUALIN_URL + "/api/auth/login", {
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
        .then((response) => 
       { if(response.ok){
        clearError();
          return response.json()}
        throw response.statusText;  
        }
        )
        .then((json) => {
          storeJwt(json);
          navigation.navigate("HomePage");
        }). catch(error =>setError("Wrong username or password") );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.center}>
      <Text style={ colorScheme === "dark" ? Colors.textColorDark : Colors.textColorLight}>Username</Text>
      <TextInput
        style={[CommonStyle.input, colorScheme === "dark" ? Colors.inputDark : Colors.inputLight]}
        onChangeText={(value) => setUsername(value)}
        value={username}
        placeholder="Username"
      />
      <Text style={ colorScheme === "dark" ? Colors.textColorDark : Colors.textColorLight}>Password</Text>
       <TextInput
        style={[CommonStyle.input, colorScheme === "dark" ? Colors.inputDark : Colors.inputLight]}
        onChangeText={(value) => setPassword(value)}
        value={password}
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
      />
      <TouchableHighlight
        onPress={() => onLogin(username, password)}
        accessibilityLabel="Log in"
      >
        <View style={[CommonStyle.button, colorScheme === "dark" ? Colors.buttonDark : Colors.buttonLight, styles.center]}>
          <Text style={ colorScheme === "dark" ? Colors.buttonTextColorDark : Colors.buttonTextColorLight}>Log in</Text>
        </View>
      </TouchableHighlight>
      <ErrorComponent error={error}/>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  }
});


