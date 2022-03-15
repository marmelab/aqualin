import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet,TouchableHighlight } from 'react-native';
import { Text, View } from './Themed';


export default function NewGameButton() {
  return (
    <TouchableHighlight onPress={startNewGame} 
    accessibilityLabel="start a new game of Aqualin">
    <View style={styles.button}>
      <Text>New game</Text>
    </View>
  </TouchableHighlight>
    
  );
}

function startNewGame() {

  //TODO call api to create new game
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
 
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
