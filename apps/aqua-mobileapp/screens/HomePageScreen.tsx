import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Appearance, Button, Platform, StyleSheet } from "react-native";

import JoinGameComponent from "../components/JoinGameComponent";
import NewGameButton from "../components/NewGameButton";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { RootStackParamList } from "../types";

export default function HomePageScreen() {
  const colorScheme = Appearance.getColorScheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text
        style={[
          colorScheme === "dark" ? Colors.textColorDark : Colors.textColorLight,
          styles.title,
        ]}
      >
        Aqualin
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <NewGameButton />
      <JoinGameComponent />
      <Button
        title="Open games"
        onPress={() => navigation.navigate("OpenGames")}
      />
      <View style={styles.buttonHowTo}>
        <Button
          title="How to play"
          onPress={() => navigation.navigate("HowToPlay")}
        />
      </View>
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
  buttonHowTo: {
    paddingTop: 10,
  },
});
