import React from "react";
import { Cell, GameState } from "@aqua/core";
import { View } from "./Themed";
import { StyleSheet } from 'react-native';
import Colors from "../constants/Colors";
import { BoardCell } from "./BoardCell";

interface RowProps {
  gameState: GameState,
  row: number
}

export const Row = ({ gameState, row }: RowProps) => {
    return (
    <View style={styles.row}>
        {gameState.board[row].map((cell, index) => <BoardCell key={index} gameState={gameState} row={row} column={index}></BoardCell>)}
    </View>);
};


const styles = StyleSheet.create({
    row: {
      flexDirection:'row',
      backgroundColor: Colors.board.backgroundColor
    }
  });
  