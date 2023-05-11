import React, { useCallback, useEffect, useState } from "react";

import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import DocumentPicker from "react-native-document-picker";

interface MyModalProps {
  handleShow: () => void;
  hide: () => void;
  visible: boolean;
  courseId: string | undefined;
  order: number;
  getCourseData: () => Promise<void>;
}
export function NewItemModal(props: MyModalProps) {
  const [files, setFiles] = useState<any>([]);
  const [lesson, setLesson] = useState("");
  const [topic, setTopic] = useState("");
  const [button, setButton] = useState("Create Topic");

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pickMultiple({
        presentationStyle: "fullScreen",
      });
      setFiles(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const deleteFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((file: any, i: number) => i !== index);
      setFiles(newFiles);
    },
    [files]
  );
  useEffect(() => {
    console.log(props.courseId);
  });

  const handleSave = useCallback(async () => {
    setButton("Saving...");
    const response = await fetch(
      "https://elernink.vercel.app/api/courses/createTopics",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: props.courseId,
          topic: topic,
          lesson: lesson,
          order: props.order + 1,
        }),
      }
    );
    if (response.status !== 200) {
      setButton("Create");
      return;
    }
    const TopicData = await response.json();

    const formData = new FormData();
    formData.append("topicId", TopicData.data[0].id);
    formData.append("courseId", props.courseId as string);

    for (const item in files) {
      formData.append("file", files[item]);
    }

    const fileRes = await fetch(
      "https://elernink.vercel.app/api/courses/addCourseFiles",
      {
        method: "POST",
        body: formData,
      }
    );
    if (fileRes.status !== 200) {
      setButton("Create Topic");
      setFiles([]);
      return;
    }
    setButton("Create Topic");
    props.getCourseData();
    setFiles([]);
    props.hide();
  }, [files, lesson, props, topic]);

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
            <Pressable style={[styles.button]} onPress={props.hide}>
              <Image
                source={require("../../../../../assets/close.png")}
                style={{ width: 20, height: 20 }}
              />
            </Pressable>
            <TextInput
              placeholder="Topic"
              style={styles.input}
              onChangeText={(text) => {
                setTopic(text);
              }}
            />
            <TextInput
              placeholder="Lesson"
              style={styles.dInput}
              multiline={true}
              onChangeText={(text) => {
                setLesson(text);
              }}
            />

            <TouchableOpacity
              style={[styles.buttonBg, { marginBottom: 16 }]}
              onPress={handleDocumentSelection}
            >
              <Text style={styles.buttonText}>Select 📑</Text>
            </TouchableOpacity>

            {files.map(
              (
                file: {
                  name: string;
                },
                index: number
              ) => (
                <View key={file.name} style={styles.wrapper}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../../../../assets/file.png")}
                      style={{ width: 20, height: 20, marginRight: 10 }}
                    />
                    <Text>
                      {file.name?.length > 50
                        ? file.name?.substring(0, 50) + "..."
                        : file.name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      deleteFile(index);
                    }}
                  >
                    <Image
                      source={require("../../../../../assets/delete.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              )
            )}
            <TouchableOpacity
              style={[styles.buttonBg, { marginTop: 20 }]}
              onPress={() => {
                handleSave();
              }}
            >
              <Text style={styles.buttonText}>{button}</Text>
            </TouchableOpacity>
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
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    padding: 5,
    elevation: 2,
    position: "absolute",
    top: 5,
    right: 5,
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
    marginTop: 10,
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
  dInput: {
    width: "90%",
    height: 100,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
  },
  wrapper: {
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
