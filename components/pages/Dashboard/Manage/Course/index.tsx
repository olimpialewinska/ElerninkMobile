import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import { ICourse } from "../../../../../types";
import { useCallback } from "react";

interface ICourseComponent {
  course: ICourse;
  courseList: ICourse[];
  deleteCourse: (id: string) => void;
}
export function Course(props: ICourseComponent) {
  const handleDelete = useCallback(async () => {
    const data = await fetch("https://elernink.vercel.app/api/courses/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.course.id,
      }),
    });

    const response = data.status;

    if (response === 200) {
      props.deleteCourse(props.course.id);
    }
  }, [props]);
  return (
    <>
      <View style={style.container}>
        <Image
          style={style.courseImage}
          source={{
            uri: props.course.image,
          }}
        />
        <View style={style.wrapper}>
          <Text style={style.header}>{props.course.name}</Text>
          <Text style={style.description}>
            {props.course.description.length > 100
              ? props.course.description.slice(0, 100) + "..."
              : props.course.description}
          </Text>
          <View style={style.buttonsContainer}>
            <TouchableOpacity>
              <Image
                source={require("../../../../../assets/people.png")}
                style={style.image}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../../../../assets/edit.png")}
                style={style.image}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleDelete();
              }}
            >
              <Image
                source={require("../../../../../assets/delete.png")}
                style={style.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    height: "60%",
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
  image: {
    width: 24,
    height: 24,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 16,
    position: "absolute",
    bottom: 14,
  },
  courseImage: {
    width: "100%",
    height: "100%",
  },
});
