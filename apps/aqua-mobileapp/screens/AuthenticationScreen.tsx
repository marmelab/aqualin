import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Appearance, Button, Platform, StyleSheet } from "react-native";
import CreateAccountComponent from "../components/CreateAccountComponent";
import ErrorComponent from "../components/ErrorCompnent";
import LoginComponent from "../components/LoginComponent";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { RootStackParamList, RootStackScreenProps } from "../types";

export default function AuthenticationScreen({ route }: RootStackScreenProps<"Authentication">) {
  const [isAuth, setIsAuth] = React.useState(false);
  
  const [error, setError] = React.useState("");
  if(route.params?.error){
    setError(route.params?.error);
  }
  const colorScheme = Appearance.getColorScheme()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={ [colorScheme === "dark" ? Colors.textColorDark : Colors.textColorLight,styles.title]}>Aqualin</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <LoginComponent isAuth={isAuth} setIsAuth={setIsAuth} />
      <ErrorComponent error={error}/>
      
      {!isAuth &&<Button
        title="Create account"
        onPress={() => navigation.navigate('CreateAccount')}
      />}
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
