import React, { Dispatch, SetStateAction, useCallback, useState } from "react";

import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import { ModalFileItem } from "./ModalFileItem";
import { TopicInterface } from "../../../../../types";

interface MyModalProps {
  handleShow: () => void;
  hide: () => void;
  visible: boolean;
  getFiles: () => void;
  topic: TopicInterface;
  setLoading: Dispatch<SetStateAction<boolean>>;
  courseId: string | string[] | undefined;
}
export function AddFileModal(props: MyModalProps) {
  const [fileResponse, setFileResponse] = useState<any>([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pickMultiple({
        presentationStyle: "fullScreen",
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const deleteFile = useCallback(
    (index: number) => {
      const newFiles = fileResponse.filter(
        (file: any, i: number) => i !== index
      );
      setFileResponse(newFiles);
    },
    [fileResponse]
  );

  const handleFileChange = useCallback(async () => {
    props.setLoading(true);

    const formData = new FormData();
    formData.append("topicId", props.topic.id.toString());
    if (props.courseId) {
      formData.append("courseId", props.courseId as string);
    }

    for (let i = 0; i < fileResponse.length; i++) {
      const file = fileResponse[i];
      formData.append("file", file);
    }

    const fileRes = await fetch(
      "https://elernink.vercel.app/api/courses/addCourseFiles",
      {
        method: "POST",
        body: formData,
      }
    );

    if (fileRes.status !== 200) {
      const error = await fileRes.json();
      console.log(error);
      return;
    }

    setFileResponse([]);
    props.getFiles();
    props.hide();
  }, [fileResponse, props]);

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

            <TouchableOpacity
              style={[styles.buttonBg, { marginBottom: 16 }]}
              onPress={handleDocumentSelection}
            >
              <Text style={styles.buttonText}>Select 📑</Text>
            </TouchableOpacity>

            <View style={styles.fileColumn}>
              {fileResponse.map(
                (
                  file: {
                    name: string;
                  },
                  index: number
                ) => (
                  <ModalFileItem
                    key={index.toString()}
                    file={file}
                    index={index}
                    deleteFile={deleteFile}
                  />
                )
              )}
            </View>
            {fileResponse.length > 0 ? (
              <TouchableOpacity
                style={[styles.buttonBg]}
                onPress={() => {
                  handleFileChange();
                }}
              >
                <Text style={styles.buttonText}>Add Files</Text>
              </TouchableOpacity>
            ) : (
              <></>
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
  },
  fileColumn: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "scroll",
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
