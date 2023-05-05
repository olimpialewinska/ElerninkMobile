import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
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
      <TouchableOpacity style={styles.buttonBg} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
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
  buttonBg: {
    width: 300,
    backgroundColor:
      "linear-gradient(-45deg, rgba(185, 203, 255, 1) 0%, rgba(101, 157, 255, 1) 100% )",
    padding: 20,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  image: {
    width: 250,
    height: 150,
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.2)",
    marginBottom: 20,
  },
});
