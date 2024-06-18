import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-virtualized-view";
import { demoExercises } from "../constants";
import ExerciseList from "../components/ExerciseList";
import { fetchExercisesByBodyPart } from "../api/exerciseDB";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Exercises() {
  const navigation = useNavigation();
  const route = useRoute();

  // State to hold exercises data
  const [exercises, setExercises] = useState([]); //demoExercises

  // Access item from route.params safely
  const item = route.params?.item;
  
  useEffect(() => {
    if (item) {
      getExercises(item.name);
      console.log("item", item)
    }
  }, [item]);

  // Fetch exercises based on body part
  const getExercises = async (bodypart) => {
    try {
      let data = await fetchExercisesByBodyPart(bodypart);
      setExercises(data);
      console.log("getting data from exercises", data)
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#191919', flex: '1', color: '#fff', gap: '10px', }}>
      <StatusBar style="light" />

      {item && (
        <Image
          source={item.image}
          style={{ width: wp(100), height: hp(25) }}
          resizeMode="cover"
        />
      )}
      {/**
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          position: "absolute",
          top: hp(7),
          left: wp(4),
          backgroundColor: "#d40da3",
          padding: hp(1),
          borderRadius: hp(5.5) / 2,
        }}
      >
        <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>
 */}
      <View style={{ marginHorizontal: wp(4), marginTop: hp(4), gap: '10px', justifyContent: 'space-between',  }}>
        {item && (
          <Text style={{ fontSize: hp(3), fontWeight: "bold", color: "#fff" }}>
            {item.name} exercises
          </Text>
        )}
        <View style={{ marginTop: hp(2), marginBottom: hp(10) }}>
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
}
