import { Cell, GameState } from "@aqua/core";
import { Text, View } from "./Themed";
import { StyleSheet, Image, TouchableHighlight } from "react-native";
import Colors from "../constants/Colors";
import { Symbols } from "../constants/Symbols";
import { TokenColors } from "../constants/TokenColors";
import { AQUALIN_URL } from "@env";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GameTemplate, RootStackParamList } from "../types";
import { registerAction } from "../http/registerAction";
import { UIToken } from "./UIToken";

interface CellProps {
  gameTemplate: GameTemplate;
  gameId: number;
  index: number;
}

export const RiverCell = ({ gameTemplate, index, gameId }: CellProps) => {
  const cell = gameTemplate.gameState.river[index];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  if (cell && gameTemplate.isPlayerTurn) {
    return (
      <TouchableHighlight
        onPress={() => registerAction(null, index, gameId, navigation)}
      >
        <UIToken token={cell} />
      </TouchableHighlight>
    );
  } else {
    return <Text style={styles.cell}></Text>;
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
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    maxHeight: 50,
    maxWidth: 50,
  },
  ...TokenColors,
});
