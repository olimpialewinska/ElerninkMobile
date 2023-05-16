import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { createContext, useEffect } from "react";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { Start } from "./components/pages/Start";
import { Dashboard } from "./components/pages/Dashboard";
import { Course } from "./components/pages/Course";
import { createStackNavigator } from "@react-navigation/stack";
import { ICourse } from "./types";
import { CourseEdit } from "./components/pages/CourseEdit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParamList = {
  Course: { course: ICourse | undefined };
  CourseEdit: { course: ICourse | undefined };
  Dashboard: { id: string; email: string };
  Start: undefined;
  Login: undefined;
  Register: undefined;
};
export type StackNavigation = NavigationProp<RootStackParamList>;

export const RootStack = createStackNavigator<RootStackParamList>();

export type Props = NativeStackScreenProps<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

interface User {
  id: string;
  email: string;
}

interface userContext {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const setUserContext = createContext({} as userContext);

export default function App() {
  const [user, setUser] = React.useState<User | undefined>(undefined);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        const id = token.split(",")[0];
        const email = token.split(",")[1];
        setUser({ id, email });
      } else {
        setUser(undefined);
      }
    });
  }, []);

  return (
    <setUserContext.Provider value={{ setUser }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {user !== undefined ? (
            <>
              <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ title: "Dashboard" }}
                initialParams={user}
              />
              <Stack.Screen
                name="Course"
                component={Course}
                options={{ title: "Course" }}
                initialParams={{ course: undefined }}
              />
              <Stack.Screen
                name="CourseEdit"
                component={CourseEdit}
                options={{ title: "Course" }}
                initialParams={{ course: undefined }}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Start" component={Start} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </setUserContext.Provider>
  );
}
