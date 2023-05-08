import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ICourse } from "../../../../../types";
import * as RootNavigation from "../../../../../RootNavigation";

interface CourseProps {
  course: ICourse;
}

export function Course(props: CourseProps) {
  return (
    <>
      <TouchableOpacity
        style={style.container}
        onPress={() => {
          RootNavigation.navigate("Course", { course: props.course });
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
    </>
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
});
