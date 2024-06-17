import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

import StackNavigator from "./StackNavigator";
import Account from "../screens/Account";
import Home from "../screens/Home";
import TrainingPrograms from "../screens/TrainingPrograms";

const Tab = createBottomTabNavigator();

export default function AppNavigatior() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === "Account") {
              iconName = focused ? "pluscircleo" : "pluscircleo";
              return <AntDesign name={iconName} size={size} color={color} />;
            } else if (route.name === "TrainingPrograms") {
              iconName = focused ? "tasks" : "tasks";
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "#d40da3",
          inactiveTintColor: "#9BA1A6",
        }}
      >
        <Tab.Screen
          name="Home"
          component={StackNavigator}
          options={{
            title: "Home",
            headerShown: null,
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            title: "Account",
            //headerShown: null,
          }}
        />
        <Tab.Screen
          name="TrainingPrograms"
          component={TrainingPrograms}
          options={{
            title: "TrainingPrograms",
            //headerShown: null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
