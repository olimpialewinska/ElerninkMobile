import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import { Navbar } from "../../Navbar";
import { createContext, useState } from "react";
import { MyCourses } from "./MyCourses";
import { Find } from "./Find";
import { Notes } from "./Notes";
import { Create } from "./Create";
import { Files } from "./Files";
import { Settings } from "./Settings";
import { Manage } from "./Manage";

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

      <ScrollView contentContainerStyle={styles.container}>
        {windowContent === "MyCourses" ? <MyCourses /> : <></>}
        {windowContent === "Find" ? <Find /> : <></>}
        {windowContent === "Notes" ? <Notes /> : <></>}
        {windowContent === "Create" ? <Create /> : <></>}
        {windowContent === "Manage" ? <Manage /> : <></>}
        {windowContent === "Files" ? <Files /> : <></>}
        {windowContent === "Settings" ? <Settings /> : <></>}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
