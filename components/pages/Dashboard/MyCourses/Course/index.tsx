import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ICourse } from "../../../../../types";
import { useCallback, useContext, useState } from "react";
import { StackNavigation } from "../../../../../App";
import { useNavigation } from "@react-navigation/native";
import { userContext } from "../..";

interface CourseProps {
  course: ICourse;
  leave: (id: string) => void;
}

export function Course(props: CourseProps) {
  const navigation = useNavigation<StackNavigation>();
  const { auth } = useContext(userContext);

  const [visible, setVisible] = useState(false);

  const leaveCourse = useCallback(async () => {
    const data = await fetch(
      `https://elernink.vercel.app/api/courses/leaveCourse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: props.course.id,
          userId: auth.id,
        }),
      }
    );
    if (data.status !== 200) {
      alert("Error");
      return;
    } else {
      props.leave(props.course.id);
    }
  }, [auth.id, props]);
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        position: "relative",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setVisible(!visible);
        }}
        style={{ width: "100%", zIndex: 999999 }}
      >
        <Image
          source={require("../../../../../assets/more.png")}
          style={{
            width: 30,
            height: 30,
            position: "absolute",
            top: 8,
            right: 20,
            zIndex: 999999,
          }}
        />
      </TouchableOpacity>
      {visible ? (
        <TouchableOpacity style={style.leave} onPress={leaveCourse}>
          <Text>Leave Course</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <TouchableOpacity
        style={style.container}
        onPress={() => {
          navigation.navigate("Course", { course: props.course });
        }}
      >
        <Image
          style={style.courseImage}
          source={{
            uri: props.course.image,
          }}
        />
        <View style={style.wrapper}>
          <Text style={style.header}>{props.course.name}</Text>
          <Text style={style.description}>{props.course.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "rgba(185, 203, 255, 1) ",
    display: "flex",
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "90%",
    height: 260,
    marginBottom: 20,
    borderRadius: 12,
    zIndex: 1,
  },
  wrapper: {
    height: "50%",
    width: "100%",
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.6)",
  },
  courseImage: {
    width: "100%",
    height: "100%",
  },
  leave: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 99999,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
});
