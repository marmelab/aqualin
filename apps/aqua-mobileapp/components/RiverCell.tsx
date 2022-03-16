import { Cell, GameState } from "@aqua/core";
import { Text, View } from "./Themed";
import { StyleSheet, Image, TouchableHighlight } from "react-native";
import Colors from "../constants/Colors";
import { Symbols } from "../constants/Symbols";
import { TokenColors } from "../constants/TokenColors";
import { AQUALIN_URL } from "@env";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";

interface CellProps {
  gameState: GameState;
  gameId: number;
  index: number;
}

export const RiverCell = ({ gameState, index, gameId }: CellProps) => {
  const cell = gameState.river[index];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  async function registerAction(column: number) {
    try {
      return await fetch(AQUALIN_URL + "/api/games/" + gameId, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          column: column,
          row: null,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          navigation.navigate("Game", { id: json?.id });
        });
    } catch (error) {
      console.error(error);
    }
  }
  if (cell) {
    return (
      <TouchableHighlight onPress={() => registerAction(index)}>
        <View
          style={[
            styles.cell,
            styles[`color${cell.color}` as keyof typeof styles],
          ]}
        >
          <Image
            resizeMode="contain"
            style={styles.image}
            source={Symbols[cell.symbol]}
          />
        </View>
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
