import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { GameTemplate } from '../types';
import { Board } from '../components/Board';
import { River } from '../components/River';

interface GameProps {
  gameTemplate: GameTemplate;
}

export default function GameScreen({gameTemplate}: GameProps) {
  gameTemplate = {
    gameState: {
      board: [[null, {symbol: 2, color: 4}, null, null, null, null],
      [null, {symbol: 2, color: 0}, null, null, null, null],
      [null, null, null, null, {symbol: 4, color: 5}, null],
      [null, {symbol: 2, color: 1}, {symbol: 100, color: 100}, {symbol: 100, color: 100}, {symbol: 100, color: 100}, {symbol: 100, color: 100}],
      [null, null, {symbol: 3, color: 4}, {symbol: 2, color: 3}, null, null],
      [null, {symbol: 2, color: 5}, null, null, null, null],],
      river: [{symbol: 0, color: 0}, {symbol: 1, color: 1}, {symbol: 2, color: 2},
         {symbol: 3, color: 3}, {symbol: 4, color: 4}, {symbol: 5, color: 5}],
      playerTurn: "Color"
    }
  } as GameTemplate;
    return (
        <View style={styles.container}>
            <Text>Board</Text>
            <Text>Player Turn : {gameTemplate.gameState.playerTurn}</Text>
            <Text>Board</Text>
            <Board board={gameTemplate.gameState.board}></Board>
            <Text>River</Text>
            <View style={styles.river}>
            <River river={gameTemplate.gameState.river}></River>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    river: {
      flexDirection:'row',
      flexWrap:'wrap'
    }
  });
  