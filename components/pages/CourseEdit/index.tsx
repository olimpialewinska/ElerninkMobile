import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { TopicInterface } from "../../../types";
import { Topic } from "./Topic";
import { NewItemModal } from "./Topic/NewItemModal";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "CourseEdit",
  "MyStack"
>;
export function CourseEdit({ navigation, route }: Props) {
  const [data, setData] = useState<any>();
  const [topics, setTopics] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const hide = () => {
    setModalVisible(false);
  };
  const handleShow = useCallback(() => {
    setModalVisible(true);
  }, []);

  const getCourseData = useCallback(async () => {
    const data = await fetch(
      `https://elernink.vercel.app/api/courses/getCourse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: route.params.course?.id,
        }),
      }
    );

    if (data.status === 401) {
      navigation.goBack();
    }

    const response = await data.json();
    setData(response.data);
    setTopics(response.topics);
  }, [route]);

  const deleteTopic = useCallback(
    (id: number) => {
      const newTopics = topics.filter(
        (topic: TopicInterface) => topic.id !== id
      );
      setTopics(newTopics);
    },
    [topics]
  );

  useEffect(() => {
    getCourseData();
  }, [getCourseData]);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.navbar}>
          <Pressable
            style={[styles.closeButton]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={require("../../../assets/close.png")}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
          {route.params.course?.image ? (
            <Image
              source={{
                uri: route.params.course.image,
              }}
              style={styles.image}
            />
          ) : (
            <></>
          )}

          <Text style={styles.name}> {route.params.course?.name} </Text>
          <Text style={styles.description}>
            {" "}
            {route.params.course?.description}{" "}
          </Text>
        </View>
        {data?.[0].alert === "" ? (
          <></>
        ) : (
          <View style={styles.alert}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {data?.[0].alert}
            </Text>
          </View>
        )}
        {topics?.map((topic: TopicInterface) => (
          <Topic
            key={topic.id}
            topic={topic}
            courseId={route.params.course?.id}
            deleteTopic={deleteTopic}
          />
        ))}
        <TouchableOpacity style={styles.buttonBg} onPress={handleShow}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <NewItemModal
          visible={modalVisible}
          handleShow={handleShow}
          hide={hide}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "rgba(101, 157, 255, 0.2)",
    flex: 1,
    display: "flex",
    alignItems: "center",
  },

  navbar: {
    width: "100%",
    backgroundColor:
      "linear-gradient(-45deg, rgba(185, 203, 255, 1) 0%, rgba(101, 157, 255, 1) 100% )",
    padding: 20,
    marginBottom: 20,
  },
  image: {
    width: "80%",
    alignSelf: "center",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    padding: 5,
    elevation: 2,
    position: "absolute",
    top: 5,
    right: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  description: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "justify",
  },
  alert: {
    width: "90%",
    fontSize: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 106, 106, 0.42)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  buttonBg: {
    alignSelf: "center",
    width: 50,
    backgroundColor:
      "linear-gradient(-45deg, rgba(185, 203, 255, 1) 0%, rgba(101, 157, 255, 1) 100% )",
    padding: 14,
    borderRadius: 25,
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
