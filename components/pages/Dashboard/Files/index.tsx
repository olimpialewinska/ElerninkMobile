import { useCallback, useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { FileItem } from "./FileItem";
import { FileInterface } from "../../../../types";
import { userContext } from "..";
import { AddFileModal } from "./AddFileModal";

const sortFiles = (fileList: FileInterface[], type: "asc" | "desc") => {
  const sortedFiles = fileList
    ?.slice()
    .sort((a: FileInterface, b: FileInterface) => {
      if (type === "asc") {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      } else {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
      }
      return 0;
    });
  return sortedFiles;
};

export function Files() {
  const { auth } = useContext(userContext);
  const [files, setFiles] = useState<FileInterface[]>([]);
  const [search, setSearch] = useState("");

  const [select, setSelect] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const hide = () => {
    setModalVisible(false);
  };
  const handleShow = useCallback(() => {
    setModalVisible(true);
  }, []);

  const getFiles = useCallback(async () => {
    const files = await fetch(
      "https://elernink.vercel.app/api/files/getMyFiles",
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

    if (files.status !== 200) {
      return;
    }

    const data = await files.json();
    setFiles(data.files);
  }, [auth.id]);

  const searchByName = useCallback(
    (name: string) => {
      if (name != "") {
        const filteredList = files?.filter((file: FileInterface) => {
          return file.name.toLowerCase().includes(name.toLowerCase());
        });
        setFiles(filteredList);
      } else {
        getFiles();
      }
    },
    [files, getFiles]
  );

  const deleteFile = useCallback(
    (id: string) => {
      const newFiles = files?.filter((file: FileInterface) => file.id !== id);
      setFiles(newFiles);
    },
    [files]
  );

  const sort = useCallback(() => {
    const sortedFiles = sortFiles(files, select ? "desc" : "asc");
    setFiles(sortedFiles);
  }, [files, select]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  return (
    <>
      <Text style={styles.title}>My Files</Text>
      <View style={styles.searchContainer}>
        <Image
          source={require("../../../../assets/search.png")}
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={"#002542"}
          onChangeText={(text) => {
            searchByName(text);
          }}
        />
      </View>

      <View style={styles.bar}>
        <TouchableOpacity style={styles.addButton} onPress={handleShow}>
          <Text style={styles.addButtonText}>+ Add Files</Text>
        </TouchableOpacity>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.iconBg}
            onPress={() => {
              setSelect(!select);
              sort();
            }}
          >
            <Image
              source={
                select
                  ? require("../../../../assets/ZA.png")
                  : require("../../../../assets/AZ.png")
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fContainer}>
        {files?.map((file: FileInterface) => (
          <FileItem key={file.id} file={file} deleteFile={deleteFile} />
        ))}
      </View>
      <AddFileModal
        hide={hide}
        handleShow={handleShow}
        visible={modalVisible}
      />
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 24,
    paddingVertical: 10,
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
  bar: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  wrapper: {
    flexDirection: "row",
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconBg: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fContainer: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
