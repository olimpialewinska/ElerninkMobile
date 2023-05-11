import { useCallback, useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { NoteItem } from "./NoteItem";
import { userContext } from "..";
import { NoteInterface } from "../../../../types";
import { AddNoteModal } from "./AddNoteModal";

const sort = (noteList: NoteInterface[], type: "asc" | "desc") => {
  const sortedNotes = noteList
    ?.slice()
    .sort((a: NoteInterface, b: NoteInterface) => {
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
  return sortedNotes;
};

export function Notes() {
  const { auth } = useContext(userContext);
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const hide = () => {
    setModalVisible(false);
  };
  const handleShow = useCallback(() => {
    setModalVisible(true);
  }, []);

  const sortNotes = useCallback(() => {
    const sortedNotes = sort(notes, select ? "asc" : "desc");
    setNotes(sortedNotes);
  }, [notes, select]);

  const getNotes = useCallback(async () => {
    setLoading(true);
    const data = await fetch(`https://elernink.vercel.app/api/notes/getNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        userId: auth.id,
      }),
    });
    if (data.status !== 200) {
      return;
    }
    const notes = await data.json();
    setNotes(notes.data);
    setLoading(false);
  }, [auth.id]);

  const searchByName = useCallback(
    (name: string) => {
      if (name != "") {
        const filteredList = notes?.filter((note: NoteInterface) => {
          return note.name.toLowerCase().includes(name.toLowerCase());
        });
        setNotes(filteredList);
      } else {
        getNotes();
      }
    },
    [getNotes, notes]
  );

  const deleteNote = useCallback(
    (id: string) => {
      const newNotes = notes?.filter((note: NoteInterface) => note.id !== id);
      setNotes(newNotes);
    },
    [notes]
  );
  useEffect(() => {
    getNotes();
  }, [getNotes]);
  return (
    <>
      <Text style={styles.title}>My Notes</Text>
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
            setSearch(text);
            searchByName(text);
          }}
        />
      </View>

      <View style={styles.bar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            handleShow();
          }}
        >
          <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.iconBg}
            onPress={() => {
              setSelect(!select);
              sortNotes();
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
        {notes?.map((note: NoteInterface) => {
          return <NoteItem key={note.id} note={note} deleteNote={deleteNote} />;
        })}
      </View>
      <AddNoteModal
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
