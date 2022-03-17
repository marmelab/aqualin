import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Platform, StyleSheet, TouchableHighlight, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { getOpenGamesList } from "../http/getOpenGamesList";
import { joinGame } from "../http/joinGame";
import { RootStackParamList } from "../types";

export default function OpenGameScreen() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [openGamesList, setOpenGamesList] = React.useState([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    try{
      setLoading(true);
     getOpenGamesList()
     .then((data)=>{return setOpenGamesList(data)})
     .catch(error => {throw new Error (error)});
    }catch(error){
      setLoading(false);
      setError("An error has occured, please try later.");
    }
 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aqualin Open Games</Text>
      <Text >Click on one game:</Text>
      <FlatList
        data={openGamesList}
        style={styles.list}
        keyExtractor={(item,index)=> index.toString()}
        renderItem={({item}) => 
        <TouchableHighlight key={item}
        onPress={() =>joinGame(item, navigation)}
        accessibilityLabel="game"
      ><Text style={styles.item}>{item}</Text></TouchableHighlight>
    }
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
  item: {
    padding: 5,
    margin:5,
    fontSize: 18,
    height: 44,
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "stretch",
    textAlign: "center",
  },
  list: {
    flex: 1,
    alignSelf: "stretch",
  }
});

