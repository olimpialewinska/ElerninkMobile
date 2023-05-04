import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
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
import { TopicInterface } from "../../../../types";

interface listContextInterface {
  deleteItem: (index: number) => void;
  changeTopic: (index: number, topic: string) => void;
  changeLesson: (index: number, lesson: string) => void;
  list: TopicInterface[];
  setList: Dispatch<SetStateAction<TopicInterface[]>>;
  addFileList: (index: number, file: File[]) => void;
}

export const listContext = createContext({} as listContextInterface);

export function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File>();
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
    (index: number, file: File[]) => {
      setList((prev) => {
        prev[index].listOfFiles = file;
        return [...prev];
      });
    },

    []
  );

  return (
    <>
      <View style={styles.button}>
        <Button title="Create" color={"black"} />
      </View>
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
          <TouchableOpacity style={styles.Ibutton}>
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
