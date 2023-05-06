import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { NoteInterface } from "../../../../../types";

interface NoteItemProps {
  note: NoteInterface;
  deleteNote: (id: string) => void;
}
export function NoteItem(props: NoteItemProps) {
  return (
    <View style={styles.noteItem}>
      <View style={styles.wrapper}>
        <Image
          source={require("../../../../../assets/file.png")}
          style={styles.noteIcon}
        />
        <Text style={styles.noteName}>{props.note.name}</Text>
      </View>

      <View style={styles.wrapper}>
        <TouchableOpacity
          style={{
            marginRight: 20,
          }}
        >
          <Image
            source={require("../../../../../assets/download.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../../../../assets/delete.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noteItem: {
    display: "flex",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    paddingHorizontal: 14,
    height: 50,
  },
  noteIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  noteName: {
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
