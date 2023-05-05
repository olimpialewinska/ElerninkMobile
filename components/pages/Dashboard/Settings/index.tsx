import { useState } from "react";
import { Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export function Settings() {
  return (
    <>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.paragraph}>Change your email</Text>
      <TextInput placeholder="Name" style={styles.input} />
      <TouchableOpacity style={styles.buttonBg}>
        <Text style={styles.buttonText}>Update email</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>Change your password</Text>
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Name" style={styles.input} />
      <TouchableOpacity style={styles.buttonBg}>
        <Text style={styles.buttonText}>Update password</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonBg: {
    width: 200,
    backgroundColor:
      "linear-gradient(-45deg, rgba(185, 203, 255, 1) 0%, rgba(101, 157, 255, 1) 100% )",
    padding: 14,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
