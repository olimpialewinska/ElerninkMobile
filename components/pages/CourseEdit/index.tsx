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
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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
  const [name, setName] = useState(route.params.course?.name);
  const [description, setDescription] = useState(
    route.params.course?.description
  );
  const [alert, setAlert] = useState(route.params.course?.alert);

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
  }, [navigation, route.params.course?.id]);

  const deleteTopic = useCallback(
    (id: number) => {
      const newTopics = topics.filter(
        (topic: TopicInterface) => topic.id !== id
      );
      setTopics(newTopics);
    },
    [topics]
  );
  const updateCourse = useCallback(
    async (type: string) => {
      const data = await fetch(
        `https://elernink.vercel.app/api/courses/updateCourse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: route.params.course?.id,
            value:
              type === "name"
                ? name
                : type === "description"
                ? description
                : alert,
            type: type,
          }),
        }
      );

      if (data.status !== 200) {
        return;
      }
      getCourseData();
    },
    [alert, description, getCourseData, name, route.params.course?.id]
  );

  useEffect(() => {
    getCourseData();
  }, [getCourseData, route.params.course?.id]);
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

          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
            onEndEditing={() => {
              updateCourse("name");
            }}
          />
          <TextInput
            placeholder="Description"
            style={[styles.input, { height: 160 }]}
            multiline
            numberOfLines={4}
            value={description}
            onEndEditing={() => {
              updateCourse("description");
            }}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <View style={styles.alert}>
          <TextInput
            placeholder="Alert"
            style={[styles.input, { marginBottom: 0 }]}
            value={alert}
            onChangeText={(text) => setAlert(text)}
            onEndEditing={() => {
              updateCourse("alert");
            }}
          />
        </View>

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
          courseId={route.params.course?.id}
          order={topics?.length}
          getCourseData={getCourseData}
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
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
    alignSelf: "center",
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
