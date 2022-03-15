import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { RootStackParamList } from '../types';
import { Text, View } from './Themed';


export default function NewGameButton() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const startNewGame = async () => {
    navigation.navigate('Game')
    const response = await fetch("http://aqualin-lb-229479009.eu-west-3.elb.amazonaws.com/api/games", {
      method: "POST"
    });
    if (response.status === 200 && response.body) {
      navigation.navigate('Game', JSON.parse(await response.json()));
    }
  }

  return (
    <TouchableHighlight onPress={startNewGame}
    accessibilityLabel="start a new game of Aqualin">
    <View style={styles.button}>
      <Text>New game</Text>
    </View>
  </TouchableHighlight>
    
  );
}

const styles = StyleSheet.create({
 
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
