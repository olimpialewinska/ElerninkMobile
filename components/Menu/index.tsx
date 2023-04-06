import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as RootNavigation from "../../RootNavigation";

export function MainMenu(props: {
  setVisible: (arg0: boolean) => void;
  visible: any;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => props.setVisible(!props.visible)}>
          <Image
            style={styles.image}
            source={require("../../assets/menu.png")}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          props.setVisible(false);
          RootNavigation.navigate("Dashboard", {});
        }}
      >
        <Text style={styles.text}>Dashborad</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.setVisible(false);
          RootNavigation.navigate("Create", {});
        }}
      >
        <Text style={styles.text}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.setVisible(false);
          RootNavigation.navigate("Files", {});
        }}
      >
        <Text style={styles.text}>Files</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.setVisible(false);
          RootNavigation.navigate("Find", {});
        }}
      >
        <Text style={styles.text}>Find</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.setVisible(false);
          RootNavigation.navigate("Notes", {});
        }}
      >
        <Text style={styles.text}>Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.setVisible(false);
          RootNavigation.navigate("Settings", {});
        }}
      >
        <Text style={styles.text}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:
      "linear-gradient(-45deg, rgba(185, 203, 255, 1) 0%, rgba(101, 157, 255, 1) 100% )",
  },
  image: {
    width: 30,
    height: 30,
  },
  menu: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textTransform: "uppercase",
    letterSpacing: 0.1,
    lineHeight: 60,
  },
});
