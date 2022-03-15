import { Cell } from "@aqua/core";
import { Text, View } from "./Themed"
import { StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import { Symbols } from "../constants/Symbols";

export const UICell = ({ cell }: { cell: Cell }) => {
  if (cell) {
    return <View style={[styles.cell, styles[`color${cell.color}` as keyof typeof styles ]]}><Image resizeMode="contain" style={styles.image} source={Symbols[cell.symbol]} /></View>
  } else {
    return <Text style={styles.cell}></Text>
  }
};

const styles = StyleSheet.create({
  cell: {
    height: 55,
    width: 55,
    backgroundColor: Colors.board.backgroundColor,
    borderColor: "#fdebd0",
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxHeight: 50,
    maxWidth: 50,
  },
  color0: {
    backgroundColor: "rgba(250, 7, 7,0.600)", // red
  },  
  color1:{
    backgroundColor: "rgba(35, 151, 6,0.600)", // green
  },
  color2:{
    backgroundColor: "rgba(241, 157, 209,0.600)", // pink
  },
  color3:{
    backgroundColor: "rgba(131, 205, 240,0.600)", //lightBlue
  },
  color4: {
    backgroundColor: "rgba(232, 236, 18,0.600)", // yellow
  },
  color5:{
    backgroundColor: "rgba(117, 24, 145,0.600)", // purple
  },
  color100:{
    backgroundColor: "#7fbee7", // dot
  }
})
