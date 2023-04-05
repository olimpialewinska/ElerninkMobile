import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, StyleSheet, View } from "react-native";
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
        <View style={styles.button}>
          <Button title="Login" color={"white"} onPress={handleLoginPress} />
        </View>
        <View style={styles.button}>
          <Button
            title="Register"
            color={"white"}
            onPress={handleRegisterPress}
          />
        </View>
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
});
