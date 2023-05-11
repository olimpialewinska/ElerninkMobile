import { ActivityIndicator, View, StyleSheet } from "react-native";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="rgba(101, 157, 255, 1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
