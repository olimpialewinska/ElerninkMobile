import { Text, View, StyleSheet, Image, TextInput } from "react-native/";
import { Course } from "./Course";

export function MyCourses() {
  return (
    <>
      <Text style={styles.title}>My Courses</Text>
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
      <View style={styles.container}>
        <Course />
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
  container: {
    marginTop: 20,
  },
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
