import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function ExerciseList({ data }) {
  //const router = useRouter();
  const navigation = useNavigation();

  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <ExerciseCard index={index} item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

const ExerciseCard = ({ item, navigation, index }) => {
  // const navigation = useNavigation();

  return (
    <View style={styles.exerciseContainer}>
      <TouchableOpacity
        /*onPress={() =>
          router.push({ pathname: "/exerciseDetails", params: item })
        }*/
        onPress={() => navigation.navigate("ExerciseDetails", { item })}
        className="flex py-3 space-y-2"
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 25,
            overflow: "hidden",
            marginBottom: "14px",
            width: wp(44),
          }}
        >
          <Image
            source={{ uri: item?.gifUrl }}
            resizeMode="cover"
            style={{ width: wp(44), height: wp(52), borderRadius: 25 }}
          />
          <Text
            style={{
              fontSize: hp(1.7),
              maxWidth: 'wp(44)',
              marginHorizontal: "12px",
              letterSpacing: "0.025em",
              paddingVertical: "4px",
              color: "rgb(64 64 64)",
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
              fontSize: '16px'
            }}
          >
            {item?.name?.length > 20
              ? item.name.slice(0, 16) + "..."
              : item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


//exerciseContainer
const styles = StyleSheet.create({
  exerciseContainer: {
    flex: 1,
    justifyContent: 'space-between',
    gap: '10px',
  },
});