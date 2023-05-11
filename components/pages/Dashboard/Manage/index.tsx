import { View, Text, StyleSheet } from "react-native";
import { Course } from "./Course";
import { useCallback, useContext, useEffect, useState } from "react";
import { userContext } from "..";
import { ICourse } from "../../../../types";

export function Manage() {
  const { auth } = useContext(userContext);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);

  const getCourses = useCallback(async () => {
    setLoading(true);
    const data = await fetch(
      "https://elernink.vercel.app//api/courses/myCreatedCourses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: auth.id,
        }),
      }
    );

    const response = await data.json();
    setCourses(response);
    setLoading(false);
  }, [auth.id]);

  const deleteCourse = useCallback(
    (id: string) => {
      const newCourses = courses.filter((course) => course.id !== id);
      setCourses(newCourses);
    },
    [courses]
  );

  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return (
    <>
      <Text style={styles.title}>Manage Courses</Text>
      <View style={styles.container}>
        {courses?.map((course) => {
          return (
            <Course
              key={course.id}
              courseList={courses}
              deleteCourse={deleteCourse}
              course={course}
            />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    textTransform: "uppercase",
  },
  container: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
