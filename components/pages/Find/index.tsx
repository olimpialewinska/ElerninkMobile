import { SafeAreaView, Text, StyleSheet } from "react-native";

export function Find() {
  return (
    <SafeAreaView>
      <Text>FindView</Text>
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
});
