import React, { useCallback, useContext, useState } from "react";
import { ICourse } from "../../../../../../types";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { userContext } from "../../..";

interface MyModalProps {
  handleShow: () => void;
  hide: () => void;
  visible: boolean;
  course: ICourse;
  getCourses: () => void;
}
export function CourseModal(props: MyModalProps) {
  const { auth } = useContext(userContext);
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(true);

  const handleSignUp = useCallback(async () => {
    const res = await fetch(
      "https://elernink.vercel.app/api/courses/joinCourse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: auth.id,
          courseId: props.course.id,
          userName: auth.email,
        }),
      }
    );

    if (res.status === 200) {
      props.hide();
      props.getCourses();
    }
  }, [auth, props]);

  const handleSubmit = useCallback(() => {
    if (props.course.code == code) {
      setValid(true);
      handleSignUp();
    } else {
      setValid(false);
    }
  }, [code, handleSignUp, props.course.code]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.hide();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={styles.close} onPress={props.hide}>
              <Image
                source={require("../../../../../../assets/close.png")}
                style={{ width: 20, height: 20 }}
              />
            </Pressable>
            <Image
              style={{
                width: 260,
                height: 160,
                borderRadius: 10,
                marginBottom: 20,
                resizeMode: "cover",
                justifyContent: "center",
              }}
              source={
                props.course.image
                  ? {
                      uri: props.course.image,
                    }
                  : require("../../../../../../assets/404image.png")
              }
            />

            <Text style={styles.modalText}>{props.course.name}</Text>
            <Text style={styles.textStyle}>{props.course.description}</Text>

            {props.course.code ? (
              <>
                <Text
                  style={[
                    styles.modalText,
                    { marginTop: 20, textTransform: "none" },
                  ]}
                >
                  {valid ? "Enter the code below" : "Invalid code"}
                </Text>
                <TextInput
                  placeholder="Name"
                  style={styles.input}
                  value={code}
                  onChangeText={(text) => {
                    setValid(true);
                    setCode(text);
                  }}
                />
                <Pressable
                  style={[styles.buttonBg, { marginTop: 20 }]}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text style={styles.buttonText}>Join Course</Text>
                </Pressable>
              </>
            ) : (
              <Pressable
                style={[styles.buttonBg, { marginTop: 20 }]}
                onPress={() => {
                  handleSignUp();
                }}
              >
                <Text style={styles.buttonText}>Join Course</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0, 0.6)",
  },
  modalView: {
    backgroundColor: "rgba(255,255,255, 1)",
    width: "90%",
    margin: 20,
    borderRadius: 20,
    paddingVertical: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    width: "90%",
    fontSize: 14,
    textAlign: "justify",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
    marginBottom: 10,
  },
  close: {
    width: 30,
    height: 30,
    borderRadius: 15,
    padding: 5,
    elevation: 2,
    position: "absolute",
    top: 5,
    right: 5,
  },
  buttonBg: {
    width: 200,
    backgroundColor:
      "linear-gradient(-45deg, rgba(185, 203, 255, 1) 0%, rgba(101, 157, 255, 1) 100% )",
    padding: 14,
    borderRadius: 30,
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
