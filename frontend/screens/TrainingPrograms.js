import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Programs from "../components/Programs";

export default function TrainingPrograms() {
  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center", paddingHorizontal: "10px" }}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Ready to Challenge Yourself?</Text>
          <Text style={styles.subtitle}>
            Explore these training programs and push your limits.
          </Text>
        </View>
        <Programs />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "column",
    backgroundColor: '#191919',
  },
  headerContainer: {
    //paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 20,
    //backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#fdfdfd",
  },
});
