import { useState } from "react";
import { Text, StyleSheet, View, SafeAreaView } from "react-native";

import { Navbar } from "../../Navbar";

export function Create() {
  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <View>
          <Text>Create</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:
      "linear-gradient( -45deg, rgba(229, 243, 255, 1) 0%,  rgba(247, 252, 255, 1) 100% )",
  },
});
