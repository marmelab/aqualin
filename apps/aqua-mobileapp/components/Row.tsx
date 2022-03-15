import React from "react";
import { Cell } from "@aqua/core";
import { UICell } from "./UICell";
import { View } from "./Themed";
import { StyleSheet } from 'react-native';
import Colors from "../constants/Colors";

export const Row = ({ row }: { row: Cell[] }) => {
    return (
    <View style={styles.row}>
        {row.map((cell, index) => <UICell key={index} cell={cell}></UICell>)}
    </View>);
};


const styles = StyleSheet.create({
    row: {
      flexDirection:'row',
      backgroundColor: Colors.board.backgroundColor
    }
  });
  