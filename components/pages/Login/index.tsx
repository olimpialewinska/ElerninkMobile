import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Image,
} from "react-native";
import * as RootNavigation from "../../../RootNavigation";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(() => {
    // if (email === "" || password === "") {
    //   alert("Please fill in all fields");
    //   return;
    // }

    RootNavigation.navigate("Dashboard", {});
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/logo1.png")}
      />
      <View>
        <TextInput placeholder="email" style={styles.input} />
        <TextInput placeholder="password" style={styles.input} />
      </View>
      <View style={styles.button}>
        <Button title="Login" color={"white"} onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:
      "linear-gradient( -45deg, rgba(229, 243, 255, 1) 0%,  rgba(247, 252, 255, 1) 100% )",
  },
  button: {
    width: 300,
    backgroundColor: "#5882a3",
    margin: 10,
    borderWidth: 0,
    borderColor: "transparent",
    color: "#fff",
    padding: 16,
    borderRadius: 30,
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  image: {
    width: 250,
    height: 150,
  },
  input: {
    width: 300,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
});
