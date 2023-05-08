import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import * as RootNavigation from "./RootNavigation";
import { Start } from "./components/pages/Start";
import { Dashboard } from "./components/pages/Dashboard";
import { Course, RootStackParamList } from "./components/pages/Course";
import { createStackNavigator } from "@react-navigation/stack";

const RootStack = createStackNavigator<RootStackParamList>();

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
        <RootStack.Screen
          name="Course"
          component={Course}
          options={{ title: "Course" }}
          initialParams={{ course: undefined }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
