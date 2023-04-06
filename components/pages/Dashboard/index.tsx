import { Text, StyleSheet, View, SafeAreaView } from "react-native";

import { Navbar } from "../../Navbar";
import { createContext, useState } from "react";
import { MyCourses } from "./MyCourses";
import { Find } from "./Find";
import { Notes } from "./Notes";
import { Create } from "./Create";
import { Files } from "./Files";
import { Settings } from "./Settings";

interface contextInterface {
  windowContent: string;
  setWindowContent: (value: string) => void;
}

export const windowContext = createContext<contextInterface>(
  {} as contextInterface
);

export function Dashboard() {
  const [windowContent, setWindowContent] = useState("MyCourses");
  return (
    <>
      <windowContext.Provider value={{ windowContent, setWindowContent }}>
        <Navbar />
      </windowContext.Provider>
      <View style={styles.container}>
        <View>
          {windowContent === "MyCourses" ? <MyCourses /> : <></>}
          {windowContent === "Find" ? <Find /> : <></>}
          {windowContent === "Notes" ? <Notes /> : <></>}
          {windowContent === "Create" ? <Create /> : <></>}
          {windowContent === "Files" ? <Files /> : <></>}
          {windowContent === "Settings" ? <Settings /> : <></>}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:
      "linear-gradient( -45deg, rgba(229, 243, 255, 1) 0%,  rgba(247, 252, 255, 1) 100% )",
  },
});
