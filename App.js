import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { StyleSheet, View, Button, Text } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [loggedIn, setLoggedIn] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "28332934929-5ss87b86nuakbn8j3h5tmi2sdiqjcvvl.apps.googleusercontent.com",
    webClientId:
      "28332934929-ccckm0m9mj90hted4crsr3u1u7mdon99.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication, type } = response;
      setLoggedIn(type);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
      <Text>{loggedIn === "success" ? "Logged In" : "Logged Out"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
