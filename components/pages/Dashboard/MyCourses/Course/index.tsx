import { View, Text, StyleSheet } from "react-native";

export function Course() {
  return (
    <>
      <View style={style.container}>
        <View style={style.wrapper}>
          <Text style={style.header}>Course</Text>
          <Text style={style.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
            accusantium at aspernatur eos optio assumenda, nisi eaque, quo
            blanditiis minima hic. Ad sint rem animi, quod maxime ipsa cum
            similique!
          </Text>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "rgba(185, 203, 255, 1) ",
    display: "flex",
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "90%",
    height: 260,
    marginBottom: 20,
    borderRadius: 12,
  },
  wrapper: {
    height: "50%",
    width: "100%",
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  description: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.6)",
  },
});
