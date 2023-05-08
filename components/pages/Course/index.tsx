import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { ICourse, TopicInterface } from "../../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import { Topic } from "./Topic";

export type RootStackParamList = {
  Course: { course: ICourse | undefined };
};

type Props = NativeStackScreenProps<RootStackParamList, "Course", "MyStack">;

export function Course({ navigation, route }: Props) {
  const [data, setData] = useState<any>();
  const [topics, setTopics] = useState<any>();
  const [image, setImage] = useState("");

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
          />
        ))}
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
    marginVertical: 20,
    alignSelf: "center",
  },
});
