import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Home from "../screens/Home";
import Exercises from "../screens/Exercises";
import ExerciseDetails from "../screens/ExerciseDetails";
import Index from "../screens/Index";
import Account from "../screens/Account";
import CountTimer from "../components/Timer";
import CreateUser from "../screens/CreateUser";
import LogIn from "../screens/LogIn";
import { useAuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const { token, logout } = useAuthContext();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    navigation.navigate("LogIn");
  };

  return (
    <Stack.Navigator initialRouteName="Index">
     {/**  <Stack.Screen
        name="index"
        component={Index}
        options={{ headerShown: false }}
      />*/}
      <Stack.Screen
        name="home"
        component={Home}
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10, gap: 10 }}>
              {token ? (
                <View
                  style={{ flexDirection: "row", marginRight: 10, gap: 10 }}
                >
                  <Pressable
                    onPress={() => navigation.navigate("Account")}
                    color="#000"
                    style={{ borderRadius: 10 }}
                  >
                    <Text>Account</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleLogout}
                    color="#000"
                    style={{ borderRadius: 10 }}
                  >
                    <Text>Logout</Text>
                  </Pressable>
                </View>
              ) : (
                <View
                  style={{ flexDirection: "row", marginRight: 10, gap: 10 }}
                >
                  <Pressable
                    onPress={() => navigation.navigate("LogIn")}
                    color="#000"
                    style={{ borderRadius: 10 }}
                  >
                    <Text>Login</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => navigation.navigate("CreateUser")}
                    color="#000"
                    style={{ borderRadius: 10 }}
                  >
                    <Text>Create account</Text>
                  </Pressable>
                </View>
              )}
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10, gap: 10 }}>
              {token && (
                <Pressable
                  onPress={handleLogout}
                  color="#000"
                  style={{ borderRadius: 10 }}
                >
                  <Text>Logout</Text>
                </Pressable>
              )}
            </View>
          ),
        })}
      />

      <Stack.Screen
        name="Timer"
        component={CountTimer}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        component={Exercises}
        name="Exercises"
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        component={LogIn}
        name="LogIn"
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        component={CreateUser}
        name="CreateUser"
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        component={ExerciseDetails}
        name="ExerciseDetails"
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
