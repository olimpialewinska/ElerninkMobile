import { useCallback, useEffect, useState } from "react";
import { FileInterface, TopicInterface } from "../../../../types";
import { Image, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TopicProps {
  topic: TopicInterface;
  courseId: string | string[] | undefined;
}

export function Topic(props: TopicProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<FileInterface[]>([]);

  const getFiles = useCallback(async () => {
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
  }, [props.courseId, props.topic.id]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);
  return (
    <View style={styles.bg}>
      <View style={styles.topicWrapper}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          {props.topic.topic}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Image
            source={require("../../../../assets/arrow-down.png")}
            style={{ width: 20, height: 20, marginTop: -4 }}
          />
        </TouchableOpacity>
      </View>

      {isOpen ? (
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
            <View style={styles.container}>
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
              <Image
                style={styles.icon}
                source={require("../../../../assets/download.png")}
              />
            </View>
          ))}
        </View>
      ) : (
        <></>
      )}
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
});
