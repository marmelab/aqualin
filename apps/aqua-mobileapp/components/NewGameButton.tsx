import { AQUALIN_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Appearance, StyleSheet, TouchableHighlight } from "react-native";

import { RootStackParamList } from "../types";
import { getJwt } from "../utils/asyncStorage";
import ErrorComponent from "./ErrorCompnent";
import { Text, View } from "./Themed";

export default function NewGameButton() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [error, setError] = React.useState("");

  const startNewGameFromApiAsync = async () => {
    try {
      return await fetch(AQUALIN_URL + "/api/games", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + await getJwt(),
        },
        
        credentials: "include",
      })
        .then((response) => { if(response.ok){
          return response.json()}
        throw response.statusText;  
        })
        .then((json) => {
          navigation.navigate("Game", { gameTemplate: json });
        })
        .catch(error => {
          if(error ==="Unauthorized"){
            navigation.navigate("Root");
          }else{
            setError(error)
          };
        });
    } catch (error) {
      console.error(error);
    }
  };
  const colorScheme = Appearance.getColorScheme()
  return (
    <View>
      <TouchableHighlight
        onPress={startNewGameFromApiAsync}
        accessibilityLabel="start a new game of Aqualin"
      >
      <View style={[commonStyles.button, colorScheme === "dark" ? darkStyles.button : lightStyles.button]}>
          <Text>New game</Text>
        </View>
      </TouchableHighlight>
      <ErrorComponent error={error} />
    </View>
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
