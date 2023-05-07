import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";

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
  screenHeight: number;
  screenWidth: number;
}

interface userInterface {
  auth: {
    id: string;
    email: string;
  };
}

export const windowContext = createContext<contextInterface>(
  {} as contextInterface
);

export const userContext = createContext<userInterface>({} as userInterface);

export function Dashboard() {
  const [windowContent, setWindowContent] = useState("My Courses");
  const user = {
    id: "6d0b3462-2d06-4398-93b0-0479e456bff2",
    email: "olim1003@gmail.com",
  };
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  return (
    <>
      <userContext.Provider value={{ auth: user }}>
        <windowContext.Provider
          value={{
            windowContent,
            setWindowContent,
            screenHeight,
            screenWidth,
          }}
        >
          <Navbar />

          <ScrollView contentContainerStyle={styles.container}>
            {windowContent === "Find" ? <Find /> : <></>}
            {windowContent === "Notes" ? <Notes /> : <></>}
            {windowContent === "Create" ? <Create /> : <></>}
            {windowContent === "Manage" ? <Manage /> : <></>}
            {windowContent === "Files" ? <Files /> : <></>}
            {windowContent === "Settings" ? <Settings /> : <></>}
            {windowContent === "My Courses" ? <MyCourses /> : <></>}
          </ScrollView>
        </windowContext.Provider>
      </userContext.Provider>
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
