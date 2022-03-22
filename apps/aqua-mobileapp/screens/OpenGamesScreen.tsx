import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Appearance,
  FlatList,
  Platform,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

import ErrorComponent from "../components/ErrorCompnent";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { getOpenGamesList } from "../http/getOpenGamesList";
import { joinGame } from "../http/joinGame";
import { RootStackParamList } from "../types";

export default function OpenGameScreen() {
  const colorScheme = Appearance.getColorScheme();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [openGamesList, setOpenGamesList] = React.useState([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    try {
      setLoading(true);
      getOpenGamesList()
        .then((data) => {
          return setOpenGamesList(data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    } catch (error) {
      setLoading(false);
      setError("An error has occured, please try later.");
    }
  }, [loading]);

  return (
    <View style={styles.container}>
      <Text
        style={[
          colorScheme === "dark" ? Colors.textColorDark : Colors.textColorLight,
          styles.title,
        ]}
      >
        Aqualin Open Games
      </Text>
      <Text
        style={[
          colorScheme === "dark" ? Colors.textColorDark : Colors.textColorLight,
          styles.subtitle,
        ]}
      >
        Click on one game:
      </Text>
      <FlatList
        data={openGamesList}
        style={styles.containerList}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.column}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableHighlight
            key={item}
            onPress={() => joinGame(item, navigation)}
            accessibilityLabel="game"
          >
            <Text
              style={[
                styles.item,
                colorScheme === "dark" ? Colors.buttonDark : Colors.buttonLight,
                colorScheme === "dark"
                  ? Colors.buttonTextColorDark
                  : Colors.buttonTextColorLight,
              ]}
            >
              {item}
            </Text>
          </TouchableHighlight>
        )}
      />
      <ErrorComponent error={error} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    margin: 10,
  },
  containerList: {
    flex: 1,
    flexDirection: "column",
  },
  list: {
    justifyContent: "space-around",
  },
  item: {
    width: 140,
    height: 40,
    margin: 10,
    borderRadius: 5,
    textAlign: "center",
    textAlignVertical: "center",
  },
  column: {
    flexShrink: 1,
  },
});
