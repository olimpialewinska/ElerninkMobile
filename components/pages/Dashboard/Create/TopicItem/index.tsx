import { Key, useCallback, useContext, useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { TopicInterface, listContext } from "..";
import DocumentPicker from "react-native-document-picker";

interface TopicItemInterface {
  topic: TopicInterface;
  key: number;
}

export function TopicItem(props: TopicItemInterface) {
  const { deleteItem, changeLesson, changeTopic, list, setList, addFileList } =
    useContext(listContext);
  const [lesson, setLesson] = useState(props.topic.lesson);
  const [topic, setTopic] = useState(props.topic.topic);
  const [files, setFiles] = useState<any>([]);
  const [error, setError] = useState(false);

  const deleteFile = useCallback(
    (index: Key) => {
      const newFiles = [...files];
      newFiles.splice(index as number, 1);
      setFiles(newFiles);
      addFileList(props.topic.id, newFiles);
    },
    [addFileList, files, props.topic.id]
  );

  const handleChangeTopic = useCallback(
    (e: string) => {
      setTopic(e);
      changeTopic(props.topic.id, e);
    },
    [changeTopic, props.topic.id]
  );

  const handleChangeLesson = useCallback(
    (e: string) => {
      setLesson(e);
      changeLesson(props.topic.id, e);
    },
    [changeLesson, props.topic.id]
  );

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pickMultiple({
        presentationStyle: "fullScreen",
      });
      setFiles(response);
      handleFileChange(response);
    } catch (err) {
      console.warn(err);
    }
  }, [props, files]);

  const handleFileChange = useCallback(
    (newfiles: any) => {
      setError(false);
      const newFiles = newfiles;
      if (!newFiles) return;
      setFiles([...files, ...Array.from(newFiles)]);
      addFileList(props.topic.id, [...files, ...Array.from(newFiles)]);
    },
    [addFileList, files, props.topic.id]
  );

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          placeholder="Topic"
          style={styles.tInput}
          value={topic}
          onChangeText={handleChangeTopic}
        />
        <TouchableOpacity
          style={styles.Ibutton}
          onPress={() => {
            deleteItem(props.topic.id);
          }}
        >
          <Image
            style={styles.image}
            source={require("../../../../../assets/delete.png")}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Lesson"
        style={styles.dInput}
        multiline={true}
        value={lesson}
        onChangeText={handleChangeLesson}
      />
      <TouchableOpacity
        style={styles.tOpacity}
        onPress={handleDocumentSelection}
      >
        <View style={styles.area}>
          <Text>Tap to add files</Text>
        </View>
      </TouchableOpacity>
      <View style={{ marginTop: 20, width: "100%" }}>
        {files?.map((file: any, index: Key) => {
          return (
            <View style={styles.centeredView} key={file.name}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../../assets/file.png")}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />

                <Text>
                  {file.name.length > 50
                    ? file.name.substring(0, 50) + "..."
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
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 10,
  },
  dInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
  },
  tOpacity: {
    width: "100%",
  },
  area: {
    width: "100%",
    height: 100,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 30,
    height: 30,
  },
  Ibutton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: -18,
  },
  tInput: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
    flex: 1,
  },
  centeredView: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
    padding: 10,
  },
});
