import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

export function FileItem() {
  return (
    <View style={styles.fileItem}>
      <View style={styles.wrapper}>
        <Image
          source={require("../../../../../assets/file.png")}
          style={styles.fileIcon}
        />
        <Text style={styles.fileName}>File Name</Text>
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
  fileItem: {
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
  fileIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  fileName: {
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
