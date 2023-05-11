import { useCallback, useEffect, useState } from "react";
import { FileInterface, TopicInterface } from "../../../../types";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RNFetchBlob from "rn-fetch-blob";
import { AddFileModal } from "./AddFileModal";

interface TopicProps {
  topic: TopicInterface;
  courseId: string | string[] | undefined;
  deleteTopic: (id: number) => void;
}

export function Topic(props: TopicProps) {
  const [files, setFiles] = useState<FileInterface[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const hide = () => {
    setModalVisible(false);
  };
  const handleShow = useCallback(() => {
    setModalVisible(true);
  }, []);

  const [lesson, setLesson] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(true);

  const getFiles = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      "https://elernink.vercel.app/api/courses/getTopicFiles",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          courseId: props.courseId,
          topicId: props.topic.id,
        }),
      }
    );

    const data = await response.json();
    setFiles(data.files);
    setLoading(false);
  }, [props.courseId, props.topic.id]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  const updateTopic = useCallback(async () => {
    const data = await fetch(
      `https://elernink.vercel.app/api/courses/updateTopic`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.topic.id,
          value: topic,
          type: "topic",
        }),
      }
    );

    if (data.status !== 200) {
    }
  }, [props.topic.id, topic]);

  const updateLesson = useCallback(async () => {
    const data = await fetch(
      `https://elernink.vercel.app/api/courses/updateTopic`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.topic.id,
          value: lesson,
          type: "lesson",
        }),
      }
    );

    if (data.status !== 200) {
    }
  }, [props.topic.id, lesson]);

  const deleteTopic = useCallback(async () => {
    const data = await fetch(
      `https://elernink.vercel.app/api/courses/deleteTopic`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.topic.id,
        }),
      }
    );

    if (data.status === 200) {
      props.deleteTopic(props.topic.id);
    }
  }, [props.topic.id]);

  const deleteFile = useCallback(
    async (filename: string) => {
      setFiles([]);
      setLoading(true);

      const data = await fetch(
        `https://elernink.vercel.app/api/courses/deleteCourseFiles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topicId: props.topic.id,
            courseId: props.courseId,
            filename: filename,
          }),
        }
      );

      if (data.status === 200) {
        getFiles();
      }
    },
    [getFiles, props.courseId, props.topic.id]
  );
  return (
    <View style={styles.bg}>
      <View style={styles.topicWrapper}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          {props.topic.topic}
        </Text>
        <TouchableOpacity
          onPress={() => {
            deleteTopic();
          }}
        >
          <Image
            source={require("../../../../assets/delete.png")}
            style={{ width: 20, height: 20, marginTop: -4 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text
          style={{
            fontSize: 14,
            textAlign: "justify",
            marginBottom: 20,
            marginTop: 18,
            alignSelf: "flex-start",
          }}
        >
          {props.topic.lesson}
        </Text>

        {files.map((file: FileInterface) => (
          <View style={styles.container} key={file.id}>
            <View style={styles.wrapper}>
              <Image
                style={[styles.icon, { marginRight: 8 }]}
                source={require("../../../../assets/file.png")}
              />
              <Text style={{ fontSize: 14, fontWeight: "600" }}>
                {file.name.length > 30
                  ? file.name.substring(0, 30) + "..."
                  : file.name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                deleteFile(file.name);
              }}
            >
              <Image
                style={styles.icon}
                source={require("../../../../assets/delete.png")}
              />
            </TouchableOpacity>
          </View>
        ))}
        {loading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
        <TouchableOpacity
          style={styles.buttonBg}
          onPress={() => {
            handleShow();
          }}
        >
          <Text style={styles.buttonText}>Add Files</Text>
        </TouchableOpacity>
        <AddFileModal
          hide={hide}
          handleShow={handleShow}
          visible={modalVisible}
          getFiles={getFiles}
          topic={props.topic}
          setLoading={setLoading}
          courseId={props.courseId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    marginBottom: 20,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  topicWrapper: {
    width: "90%",
    backgroundColor: "rgb(235, 235, 235)",
    padding: 14,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    zIndex: 20,
  },
  content: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgb(255, 255, 255)",
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    padding: 16,

    marginTop: -14,
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgb(235, 235, 235)",
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  fileName: {},
  icon: {
    width: 20,
    height: 20,
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
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
