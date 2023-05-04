import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TextInput,
} from "react-native";

export function Find() {
  return (
    <>
      <Text style={styles.title}>Find Course</Text>
      <View style={styles.searchContainer}>
        <Image
          source={require("../../../../assets/search.png")}
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={"#002542"}
        />
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 24,
    paddingVertical: 10,
    marginBottom: 10,
  },

  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
});
