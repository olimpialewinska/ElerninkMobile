import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ICourse } from "../../../../../types";
import { CourseModal } from "./CourseModal";
import { useCallback, useState } from "react";

interface CourseProps {
  course: ICourse;
  getCourses: () => void;
}

export function CourseComponenet(props: CourseProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const hide = () => {
    setModalVisible(false);
  };
  const handleShow = useCallback(() => {
    setModalVisible(true);
  }, []);

  return (
    <>
      <TouchableOpacity
        style={{
          width: "100%",
          alignItems: "center",
        }}
        onPress={handleShow}
      >
        <View style={style.container}>
          <Image
            style={style.image}
            source={{
              uri: props.course.image,
            }}
          />
          <View style={style.wrapper}>
            <Text style={style.header}>{props.course.name}</Text>
            <Text style={style.description}>{props.course.description}</Text>
          </View>
        </View>
        <CourseModal
          hide={hide}
          handleShow={handleShow}
          visible={modalVisible}
          course={props.course}
          getCourses={props.getCourses}
        />
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
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
    justifyContent: "center",
  },
});
