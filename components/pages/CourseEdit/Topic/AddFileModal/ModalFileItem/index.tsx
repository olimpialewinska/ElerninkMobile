import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";

interface ModalFileItemProps {
  file: {
    name: string;
  };
  deleteFile: (index: number) => void;
  index: number;
}

export function ModalFileItem(props: ModalFileItemProps) {
  return (
    <View style={styles.centeredView}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../../../../assets/file.png")}
          style={{ width: 20, height: 20, marginRight: 10 }}
        />

        <Text>
          {props.file.name.length > 50
            ? props.file.name.substring(0, 50) + "..."
            : props.file.name}
        </Text>
      </View>

      <TouchableOpacity onPress={() => props.deleteFile(props.index)}>
        <Image
          source={require("../../../../../../assets/delete.png")}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
    padding: 10,
  },
});
