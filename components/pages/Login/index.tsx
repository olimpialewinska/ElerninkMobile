import React, { useCallback, useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { setUserContext } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "../../Loading";

export function Login() {
  const { setUser } = useContext(setUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);

    const data = await fetch(`https://elernink.vercel.app/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const response = await data.json();
    setLoading(false);

    if (data.status === 200) {
      const token = response.user.id + "," + response.user.email;
      AsyncStorage.setItem("token", token);
      setUser({
        id: response.user.id,
        email: response.user.email,
      });
    } else {
      alert("Invalid email or password");
    }
  }, [email, password, setUser]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/logo1.png")}
      />
      <View>
        <TextInput
          placeholder="email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          textContentType="password"
          secureTextEntry={true}
        />
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
