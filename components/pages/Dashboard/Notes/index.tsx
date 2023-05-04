import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { NoteItem } from "./NoteItem";

export function Notes() {
  return (
    <>
      <Text style={styles.title}>My Notes</Text>
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

      <View style={styles.bar}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.iconBg}>
            <Image
              source={require("../../../../assets/AZ.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBg}>
            <Image
              source={require("../../../../assets/ZA.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fContainer}>
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
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
  bar: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  wrapper: {
    flexDirection: "row",
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconBg: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fContainer: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
