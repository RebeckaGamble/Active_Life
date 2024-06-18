import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ExerciseDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const { item } = route.params; //access passes params

  return (
    <View style={{ flex: 1, backgroundColor: '#191919', }}>
      <View style={{ backgroundColor: "#191919", borderBottomLeftRadius: 40, color: '#fff' }}>
        <Image
          source={{ uri: item.gifUrl }}
          style={{ width: wp(100), height: wp(100), resizeMode: "cover" }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Exercises")}
        style={{ position: "absolute", top: hp(2), right: wp(2) }}
      >
        <AntDesign name="closecircle" size={hp(4.5)} color="#f43f5e" />
      </TouchableOpacity>
      <ScrollView
        style={{ margin: wp(4), marginTop: hp(3), marginBottom: hp(2) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: hp(3.5), fontWeight: "bold", color: "#fff" }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: hp(2), color: "#fff", marginTop: hp(1.5) }}>
          Equipment{" "}
          <Text style={{ fontWeight: "bold", color: "#fff" }}>
            {item.equipment}
          </Text>
        </Text>
        <Text style={{ fontSize: hp(2), color: "#fff", marginTop: hp(1.5) }}>
          Secondary Muscles{" "}
          <Text style={{ fontWeight: "bold", color: "#fff" }}>
            {item.secondaryMuscles.join(", ")}
          </Text>
        </Text>
        <Text style={{ fontSize: hp(2), color: "#fff", marginTop: hp(1.5) }}>
          Target{" "}
          <Text style={{ fontWeight: "bold", color: "#fff" }}>
            {item.target}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: hp(3),
            fontWeight: "bold",
            color: "#fff",
            marginTop: hp(2.5),
          }}
        >
          Instructions
        </Text>
        {item.instructions.map((instruction, index) => (
          <Text
            key={index}
            style={{ fontSize: hp(1.7), color: "#fff", marginTop: hp(1) }}
          >
            {instruction.trim()}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
