import { SafeAreaView, Text, StyleSheet, View, Image } from "react-native";

export function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.menu}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:
      "linear-gradient( -45deg, rgba(229, 243, 255, 1) 0%,  rgba(247, 252, 255, 1) 100% )",
  },
  menu: {
    width: "100%",
    backgroundColor:
      "linear-gradient(-45deg, rgba(185, 203, 255, 1) 0%, rgba(101, 157, 255, 1) 100% )",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    filter: "invert(1)",
  },
  image: {
    width: 50,
    height: 50,
  },
});
