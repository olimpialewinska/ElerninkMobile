import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import * as RootNavigation from "../../RootNavigation";
import { windowContext } from "../pages/Dashboard";

interface MenuItemProps {
  setVisible: (value: boolean) => void;
  text: string;
}
function MenuItem({ setVisible, text }: MenuItemProps) {
  const { setWindowContent } = useContext(windowContext);
  return (
    <TouchableOpacity
      onPress={() => {
        setVisible(false);
        setWindowContent(text);
      }}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

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

      <MenuItem text="My Courses" setVisible={props.setVisible}></MenuItem>
      <MenuItem text="Create" setVisible={props.setVisible}></MenuItem>
      <MenuItem text="Manage" setVisible={props.setVisible}></MenuItem>
      <MenuItem text="Files" setVisible={props.setVisible}></MenuItem>
      <MenuItem text="Find" setVisible={props.setVisible}></MenuItem>
      <MenuItem text="Settings" setVisible={props.setVisible}></MenuItem>
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
