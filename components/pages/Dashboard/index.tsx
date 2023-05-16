import { StyleSheet, ScrollView, Dimensions } from "react-native";

import { Navbar } from "../../Navbar";
import { createContext, useState } from "react";
import { MyCourses } from "./MyCourses";
import { Find } from "./Find";
import { Create } from "./Create";
import { Files } from "./Files";
import { Settings } from "./Settings";
import { Manage } from "./Manage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

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

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard", "MyStack">;

export function Dashboard(props: Props) {
  const [windowContent, setWindowContent] = useState("My Courses");
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const auth: userInterface = {
    auth: {
      id: props.route.params.id,
      email: props.route.params.email,
    },
  };

  return (
    <>
      <userContext.Provider value={{ auth: auth.auth }}>
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

            {windowContent === "Create" ? <Create /> : <></>}
            {windowContent === "Manage" ? <Manage /> : <></>}
            {windowContent === "Files" ? <Files /> : <></>}
            {windowContent === "Settings" ? <Settings /> : <></>}
            {windowContent === "My Courses" ? <MyCourses /> : <></>}
            {windowContent === "Course" ? <MyCourses /> : <></>}
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
