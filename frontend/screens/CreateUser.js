import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CreateAccount from "../components/CreateAccount";

export default function CreateUser() {
  return (
    <View style={styles.container}>
      <CreateAccount />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#191919",
    },
  });
  