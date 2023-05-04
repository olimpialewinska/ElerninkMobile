import { Text, View, StyleSheet } from "react-native/";
import { Course } from "./Course";

export function MyCourses() {
  return (
    <View style={styles.container}>
      <Course />
      <Course />
      <Course />
      <Course />
      <Course />
      <Course />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
