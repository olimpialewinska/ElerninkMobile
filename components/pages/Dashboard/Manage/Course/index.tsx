import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";

export function Course() {
  return (
    <>
      <View style={style.container}>
        <View style={style.wrapper}>
          <Text style={style.header}>Course</Text>
          <Text style={style.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
            accusantium at aspernatur eos optio assumenda, nisi eaque, quo
            blanditiis minima hic. Ad sint rem animi, quod maxime ipsa cum
            similique!
          </Text>
          <View style={style.buttonsContainer}>
            <TouchableOpacity>
              <Image
                source={require("../../../../../assets/people.png")}
                style={style.image}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../../../../assets/edit.png")}
                style={style.image}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../../../../assets/delete.png")}
                style={style.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "rgba(185, 203, 255, 1) ",
    display: "flex",
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "90%",
    height: 260,
    marginBottom: 20,
    borderRadius: 12,
  },
  wrapper: {
    height: "60%",
    width: "100%",
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.6)",
  },
  image: {
    width: 24,
    height: 24,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 16,
  },
});
