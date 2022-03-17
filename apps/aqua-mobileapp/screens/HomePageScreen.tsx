import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Platform, StyleSheet } from "react-native";

import JoinGameComponent from "../components/JoinGameComponent";
import NewGameButton from "../components/NewGameButton";
import { Text, View } from "../components/Themed";
import { RootStackParamList } from "../types";


export default function HomePageScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aqualin</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <NewGameButton />
      <JoinGameComponent />
      <Button
        title="Open games"
        onPress={() => navigation.navigate('OpenGames')}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
