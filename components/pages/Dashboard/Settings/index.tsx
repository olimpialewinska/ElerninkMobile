import { useCallback, useContext, useState } from "react";
import { Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { userContext } from "..";

export function Settings() {
  const { auth } = useContext(userContext);
  const [mail, setMail] = useState(auth.email);
  const [password, setPassword] = useState("");

  const [valid, setValid] = useState(true);
  const [match, setMatch] = useState(true);

  const [validationText, setValidationText] = useState("Change your email");
  const [validationTextPass, setValidationTextPass] = useState(
    "Change your password"
  );

  const emailValidation = useCallback(() => {
    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i;
    setValid(expression.test(mail));
  }, [mail]);

  const passwordMatch = useCallback(
    (confirm: string) => {
      password == confirm ? setMatch(true) : setMatch(false);
    },
    [password]
  );

  const updatePassword = useCallback(async () => {
    const data = await fetch(
      "https://elernink.vercel.app/api/auth/updateUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: auth.id,
          value: password,
          type: "password",
        }),
      }
    );
    const res = data.status;

    if (res == 200) {
      setValidationTextPass("Account updated successfully");
    } else {
      const message = await data.json();
      setValidationTextPass(message.error);
    }
  }, [auth.id, password]);

  const updateData = useCallback(async () => {
    const data = await fetch(
      "https://elernink.vercel.app/api/auth/updateUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: auth.id,
          value: mail,
          type: "email",
        }),
      }
    );

    const res = data.status;

    if (res == 200) {
      setValidationText("Account updated successfully");
    } else {
      const message = await data.json();
      setValidationText(message.error);
    }
  }, [auth.id, mail]);
  return (
    <>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.paragraph}>
        {!valid ? "Please enter a valid email" : validationText}
      </Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={(text) => {
          emailValidation();
          setMail(text);
        }}
        value={mail}
      />
      <TouchableOpacity
        style={styles.buttonBg}
        onPress={() => {
          updateData();
        }}
      >
        <Text style={styles.buttonText}>Update email</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        {!match ? "Passwords do not match" : validationTextPass}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="New password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        onChangeText={(text) => {
          passwordMatch(text);
        }}
      />
      <TouchableOpacity
        style={styles.buttonBg}
        onPress={() => {
          updatePassword();
        }}
      >
        <Text style={styles.buttonText}>Update password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signOutBtnBg}>
        <Text style={styles.buttonText}>Sign out</Text>
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
  signOutBtnBg: {
    width: "90%",
    backgroundColor:
      "linear-gradient(-45deg, rgba(185, 203, 255, 1) 0%, rgba(101, 157, 255, 1) 100% )",
    padding: 18,
    borderRadius: 30,
    marginBottom: 10,
    position: "absolute",
    bottom: -160,
  },
});
