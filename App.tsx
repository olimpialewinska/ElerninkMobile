import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import * as RootNavigation from "./RootNavigation";
import { Start } from "./components/pages/Start";
import { Dashboard } from "./components/pages/Dashboard";
import { Create } from "./components/pages/Create";
import { Files } from "./components/pages/Files";
import { Find } from "./components/pages/Find";
import { Notes } from "./components/pages/Notes";
import { Settings } from "./components/pages/Settings";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Files" component={Files} />
        <Stack.Screen name="Find" component={Find} />
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
