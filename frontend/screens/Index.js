import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function Index() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    console.log("Navigating to Home screen");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Active Life!</Text>

        <View>
          <Text style={styles.subtitle}>
            Best <Text style={styles.highlight}>workouts</Text> For You
          </Text>
          <TouchableOpacity
            onPress={handleGetStarted}
            //onPress={() => navigation.navigate("Home")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    top: 40,
    gap: 50,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Adjust opacity as needed
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  subtitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    textShadowColor: "#d40da3",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  highlight: {
    color: "#d40da3",
  },
  button: {
    backgroundColor: "#d40da3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    maxWidth: 160,
    marginHorizontal: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
