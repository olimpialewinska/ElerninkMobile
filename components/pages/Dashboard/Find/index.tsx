import { useCallback, useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TextInput } from "react-native";
import { userContext } from "..";
import { ICourse } from "../../../../types";
import { CourseComponenet } from "./Course";
import { Loading } from "../../../Loading";

export function Find() {
  const { auth } = useContext(userContext);
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<any>();
  const [loading, setLoading] = useState(false);
  const getCourses = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `https://elernink.vercel.app/api/courses/findCourse`,
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
    const data = await response.json();
    setCourses(data);
    setLoading(false);
  }, [auth.id]);

  const filterList = useCallback(
    (search: string) => {
      if (search != "") {
        const filteredList = courses.filter((course: ICourse) => {
          return course.name.toLowerCase().includes(search.toLowerCase());
        });
        setCourses(filteredList);
      } else {
        getCourses();
      }
    },
    [courses, getCourses]
  );

  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return (
    <>
      <Text style={styles.title}>Find Course</Text>
      <View style={styles.searchContainer}>
        <Image
          source={require("../../../../assets/search.png")}
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={"#002542"}
          value={search}
          onChangeText={(text) => {
            filterList(text);
            setSearch(text);
          }}
        />
      </View>
      <View style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          courses?.map((course: ICourse) => {
            return (
              <CourseComponenet
                key={course.id}
                course={course}
                getCourses={getCourses}
              />
            );
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
