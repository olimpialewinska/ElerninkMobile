import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { TopicItem } from "./TopicItem";
import { launchImageLibrary } from "react-native-image-picker";
import { userContext } from "..";
import { DocumentPickerResponse } from "react-native-document-picker";

export interface TopicInterface {
  topic: string;
  lesson: string;
  order: number;
  listOfFiles: DocumentPickerResponse[];
  id: number;
}
interface listContextInterface {
  deleteItem: (index: number) => void;
  changeTopic: (index: number, topic: string) => void;
  changeLesson: (index: number, lesson: string) => void;
  list: TopicInterface[];
  setList: Dispatch<SetStateAction<TopicInterface[]>>;
  addFileList: (index: number, file: DocumentPickerResponse[]) => void;
}

export const listContext = createContext({} as listContextInterface);

export function Create() {
  const { auth } = useContext(userContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [button, setButton] = useState("Create");
  const [image, setImage] = useState<any>();
  const [code, setCode] = useState("");
  const [alert, setAlert] = useState("");
  const [list, setList] = useState<TopicInterface[]>([
    {
      topic: `Topic 0`,
      lesson: "Lesson 0",
      id: 0,
      order: 0,
      listOfFiles: [],
    },
  ]);

  const handleImagePick = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        setImage(response.assets![0]);
      }
    );
  }, []);

  const addNewItem = useCallback(() => {
    setList((prev) => [
      ...prev,
      {
        topic: `Topic ${list.length}`,
        lesson: `Lesson`,
        id: list.length,
        order: list.length,
        listOfFiles: [],
      },
    ]);
  }, [list.length]);

  const deleteItem = useCallback(
    (id: number) => {
      setList(list.filter((x) => x.id !== id));
    },
    [list]
  );

  const changeTopic = useCallback(
    (id: number, topic: string) => {
      const item = list.find((x) => x.id === id);
      if (!item) return;
      item.topic = topic;
    },
    [list]
  );

  const changeLesson = useCallback((index: number, lesson: string) => {
    setList((prev) => {
      prev[index].lesson = lesson;
      return [...prev];
    });
  }, []);

  const addFileList = useCallback(
    (index: number, file: DocumentPickerResponse[]) => {
      setList((prev) => {
        prev[index].listOfFiles = file;
        return [...prev];
      });
    },

    []
  );
  const handleCreate = useCallback(async () => {
    setButton("Loading...");
    if (name == "") {
      setButton("Create");
      return;
    }
    const response = await fetch(
      "https://elernink.vercel.app/api/courses/createCourse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creator: auth.id,
          name: name,
          description: description,
          code: code,
          alert: alert,
        }),
      }
    );

    if (response.status !== 200) {
      console.log(await response.json());
      setButton("Create");
      return;
    }

    const courseData = await response.json();

    if (image) {
      const formData = new FormData();
      formData.append("courseId", courseData[0].id);
      formData.append("image", image);

      const response = await fetch(
        "https://elernink.vercel.app/api/photos/addCoursePhoto",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status !== 200) {
        console.log("1", await response.json());
        setButton("Create");
        return;
      }
    }

    for (const index in list) {
      const topic = list[index].topic;
      const lesson = list[index].lesson;
      const order = list[index].order;
      const listOfFiles = list[index].listOfFiles;

      const response = await fetch(
        "https://elernink.vercel.app/api/courses/createTopics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: courseData[0].id,
            topic: topic,
            lesson: lesson,
            order: order,
          }),
        }
      );
      if (response.status !== 200) {
        setButton("Create");
        console.log("2", await response.json());
        return;
      }

      const TopicData = await response.json();

      const formData = new FormData();
      formData.append("topicId", TopicData.data[0].id);
      formData.append("courseId", courseData[0].id);

      for (const i in list[index].listOfFiles) {
        formData.append("files", listOfFiles[i] as any);
      }

      const response2 = await fetch(
        "https://elernink.vercel.app/api/courses/addCourseFiles",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response2.status !== 200) {
        setButton("Create");
        console.log("3", await response2.json());
        return;
      }
    }
    setButton("Created");
  }, [alert, auth.id, code, description, image, list, name]);

  return (
    <>
      <TouchableOpacity onPress={handleCreate}>
        <View style={styles.button}>
          <Text>{button}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          onChangeText={(text) => setName(text)}
        />
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Course Code"
            style={styles.codeInput}
            onChangeText={(text) => setCode(text)}
          />
          <TouchableOpacity
            style={styles.Ibutton}
            onPress={() => {
              handleImagePick();
            }}
          >
            <Image
              style={styles.image}
              source={require("../../../../assets/add-image.png")}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Description"
          style={styles.input}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          placeholder="Alert (optional)"
          style={styles.input}
          onChangeText={(text) => setAlert(text)}
        />
        <listContext.Provider
          value={{
            deleteItem,
            changeTopic,
            changeLesson,
            list,
            setList,
            addFileList,
          }}
        >
          <View style={styles.tContainer}>
            {list.map((item) => (
              <TopicItem topic={item} key={item.id} />
            ))}
          </View>
        </listContext.Provider>

        <TouchableOpacity style={styles.circleButton} onPress={addNewItem}>
          <Image
            style={styles.image}
            source={require("../../../../assets/add.png")}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "90%",
    backgroundColor:
      "linear-gradient(-45deg, rgba(185, 203, 255, 1) 0%, rgba(101, 157, 255, 1) 100% )",
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 30,
    height: 30,
  },
  Ibutton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: -18,
  },
  codeInput: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
    flex: 1,
  },
  tContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
