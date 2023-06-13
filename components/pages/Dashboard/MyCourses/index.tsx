import { Text, View, StyleSheet, Image, TextInput } from "react-native/";
import { Course } from "./Course";
import { useCallback, useContext, useEffect, useState } from "react";
import { ICourse } from "../../../../types";
import { userContext } from "..";
import { Loading } from "../../../Loading";

export function MyCourses() {
  const { auth } = useContext(userContext);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);

  const getMyCourses = useCallback(async () => {
    setLoading(true);
    const data = await fetch(
      `https://elernink.vercel.app/api/courses/dashboardCourses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: auth.id,
        }),
      }
    );

    if (data.status == 200) {
      const response = await data.json();
      setCourses(response);
      setLoading(false);
      return;
    }
  }, [auth.id]);

  const filterList = useCallback(
    (search: string) => {
      if (search != "") {
        const filteredList = courses.filter((course: ICourse) => {
          return course.name.toLowerCase().includes(search.toLowerCase());
        });
        setCourses(filteredList);
      } else {
        getMyCourses();
      }
    },
    [courses, getMyCourses]
  );

  const leave = useCallback(
    (id: string) => {
      const newList = courses.filter((course: ICourse) => course.id !== id);
      setCourses(newList);
    },
    [courses]
  );

  useEffect(() => {
    getMyCourses();
  }, [getMyCourses]);

  return (
    <>
      <Text style={styles.title}>My Courses</Text>
      <View style={styles.searchContainer}>
        <Image
          source={require("../../../../assets/search.png")}
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={"#002542"}
          onChangeText={(text) => filterList(text)}
        />
      </View>

      <View style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          courses?.map((course) => {
            return <Course key={course.id} course={course} leave={leave} />;
          })
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    textTransform: "uppercase",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 24,
    paddingVertical: 10,
    marginBottom: 10,
  },

  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
});
