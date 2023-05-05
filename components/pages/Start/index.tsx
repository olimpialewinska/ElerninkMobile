import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import * as RootNavigation from "../../../RootNavigation";

export function Start() {
  const handleLoginPress = useCallback(() => {
    RootNavigation.navigate("Login", {});
  }, []);

  const handleRegisterPress = useCallback(() => {
    RootNavigation.navigate("Register", {});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/logo1.png")}
      />
      <View>
        <TouchableOpacity style={styles.buttonBg} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBg}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
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

  image: {
    width: 250,
    height: 150,
  },
  buttonBg: {
    width: 300,
    backgroundColor:
      "linear-gradient(-45deg, rgba(185, 203, 255, 1) 0%, rgba(101, 157, 255, 1) 100% )",
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
