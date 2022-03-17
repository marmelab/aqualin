import { StyleSheet } from "react-native";

import { Text } from "./Themed";

export default function ErrorComponent({ error }: { error: string }) {
    return  error === "" ? <></> : <Text style={styles.error}>{error}</Text>
}

const styles = StyleSheet.create({
  error: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    padding: 10,
    color: "#ffffff",
    margin: 10,
    borderRadius: 5,
  },
});
