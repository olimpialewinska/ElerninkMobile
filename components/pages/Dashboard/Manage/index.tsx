import { View, Text, StyleSheet } from "react-native";
import { Course } from "./Course";

export function Manage() {
  return (
    <>
      <Text style={styles.title}>Manage Courses</Text>
      <View style={styles.container}>
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    textTransform: "uppercase",
  },
  container: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
