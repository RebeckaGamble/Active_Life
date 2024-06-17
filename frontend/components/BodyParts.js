import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { bodyParts } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function BodyParts() {
  const navigation = useNavigation();

  return (
    <View style={{ marginHorizontal: wp(4), flex: 1 }}>
      <Text
        style={{
          fontSize: hp(3),
          fontWeight: "bold",
          paddingTop: hp(2),
          color: "#fff",
        }}
      >
        Exercises
      </Text>

      <FlatList
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp(10),
          paddingTop: hp(2),
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <BodyPartCard index={index} item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

const BodyPartCard = ({ item, navigation, index }) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(400)
        .delay(index * 200)
        .springify()}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Exercises", { item: item })}
        style={{ width: wp(42), height: wp(52), marginBottom: hp(2) }}
      >
        <Image
          source={item.image}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", borderRadius: wp(3) }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: hp(15),
            borderRadius: wp(3),
            justifyContent: "flex-end",
            padding: wp(4),
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: hp(2.3),
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {item?.name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};
