import { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MainMenu } from "../Menu";

export function Navbar() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      {visible ? <MainMenu visible={visible} setVisible={setVisible} /> : <></>}
      <View style={styles.menu}>
        <Text style={styles.title}>Hi, Eryk!</Text>
        <TouchableOpacity
          style={{ padding: 16, paddingRight: 0 }}
          onPress={() => setVisible(!visible)}
        >
          <Image
            style={styles.image}
            source={require("../../assets/menu.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:
      "linear-gradient( -45deg, rgba(229, 243, 255, 1) 0%,  rgba(247, 252, 255, 1) 100% )",
  },
  menu: {
    width: "100%",
    backgroundColor:
      "linear-gradient(-45deg, rgba(185, 203, 255, 1) 0%, rgba(101, 157, 255, 1) 100% )",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textTransform: "uppercase",
    letterSpacing: 0.1,
  },
});
