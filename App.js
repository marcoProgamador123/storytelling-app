import *as React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"
import DrawerNavigator from "./navigation/DrawerNavigator";

import Feed from "./screens/Feed";
import CreateStory from "./screens/CreateStory";

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}

