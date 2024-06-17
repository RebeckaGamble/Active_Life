import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageSlider from "../components/ImageSlider";
import BodyParts from "../components/BodyParts";

//import { useRouter } from "expo-router";

export default function Home() {
  const navigation = useNavigation();

  //const router = useRouter();

  return (
    <ScrollView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />

      <View className="flex-row justify-between items-center mx-5">
        <View
          style={{
            justifyContetn: "center",
            alignItems: "center",
            paddingVertical: "30px",
          }}
        >
          <Text
            style={{
              fontSize: hp(3.2),
              fontWeight: "bold",
              letterSpacing: "0.05em",
              color: "#fff",
            }}
            className="font-bold tracking-wider text-neutral-700"
          >
            GET READY TO {""}
            <Text
              style={{
                fontSize: hp(3.2),
                fontWeight: "bold",
                color: "#d40da3",
                letterSpacing: "0.05em",
                paddingLeft: "2px",
              }}
            >
              WORKOUT
            </Text>
          </Text>
        </View>
        {/** 
        <View className="flex justify-center items-center space-y-2">
          <TouchableOpacity
            //  onPress={() => router.push({ pathname: "/Account" })}
            onPress={() => navigation.navigate("Account")}
          >
            <Text style={{ marginTop: 10, color: "#333", fontWeight: "bold" }}>
              Account
            </Text>
          </TouchableOpacity>
        </View>
        */}
      </View>

      <ImageSlider />

      <View className="flex-1">
        <BodyParts />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191919",
  },
});
