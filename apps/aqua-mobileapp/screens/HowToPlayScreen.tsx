import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

export default function HowToPlayScreen() {
  return (
    <View style={styles.container}>
      <Text>{`
Aqualin is a competitive game.

Two players are required to play the game, one choose colors, the other symbols.

Each player need to have the most score by creating cluster.
Score depends of the size of each cluster. 

Bigger cluster give more points. The bigger, the better thay are.
`}
      </Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}><Text>Number of cell in the cluster</Text></View>
          <View style={styles.cell}><Text>2</Text></View>
          <View style={styles.cell}><Text>3</Text></View>
          <View style={styles.cell}><Text>4</Text></View>
          <View style={styles.cell}><Text>5</Text></View>
          <View style={styles.cell}><Text>6</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}><Text>Points rewarded </Text></View>
          <View style={styles.cell}><Text>1</Text></View>
          <View style={styles.cell}><Text>3</Text></View>
          <View style={styles.cell}><Text>6</Text></View>
          <View style={styles.cell}><Text>10</Text></View>
          <View style={styles.cell}><Text>15</Text></View>
        </View>
      </View>
      <Text>{`
Players play one after the other.

Each turn is composed:

First :
Move a token from the board to an other cell (not mandatory).

The move can only be a move on same column or the same row, and the path between them needs to be empty.

It can be done once per turn. 
 

Second:
Place a token from the river on the board.
`}
      </Text>
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
  cell: {
    flex: 1,
    padding: 5,
    alignSelf: "stretch",
    alignContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
  },
  row: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  table: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
});
