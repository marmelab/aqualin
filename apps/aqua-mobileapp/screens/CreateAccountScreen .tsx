import { StatusBar } from "expo-status-bar";
import React from "react";
import { Appearance, Platform, StyleSheet } from "react-native";

import CreateAccountComponent from "../components/CreateAccountComponent";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";

export default function CreateAccountScreen() {
  const colorScheme = Appearance.getColorScheme();

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
      <CreateAccountComponent />
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
