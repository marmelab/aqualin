import { AQUALIN_URL } from "@env";
import { NavigationProp } from "@react-navigation/native";

import { RootStackParamList } from "../types";

export const joinGame = async (
  gameId: string | number,
  navigation: NavigationProp<RootStackParamList>,
) => {
  return await fetch(AQUALIN_URL + "/api/games/" + gameId, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      playerAction: "join",
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response.statusText;
    })
    .then((json) => {
      navigation.navigate("Game", { gameTemplate: json });
    })
    .catch((error) => {
      throw new Error(error);
    });
};
