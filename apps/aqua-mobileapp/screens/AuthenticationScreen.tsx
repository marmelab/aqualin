import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Platform, StyleSheet } from "react-native";
import CreateAccountComponent from "../components/CreateAccountComponent";
import ErrorComponent from "../components/ErrorCompnent";
import LoginComponent from "../components/LoginComponent";
import { Text, View } from "../components/Themed";
import { RootStackParamList, RootStackScreenProps } from "../types";

export default function AuthenticationScreen({ route }: RootStackScreenProps<"Authentication">) {
  const [error, setError] = React.useState("");
  if(route.params?.error){
    setError(route.params?.error);
  }
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aqualin</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <LoginComponent />
      <ErrorComponent error={error}/>
      <Button
        title="Create account"
        onPress={() => navigation.navigate('CreateAccount')}
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
