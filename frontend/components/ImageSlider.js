import React from "react";
import { View, StyleSheet, Dimensions, Image, Platform } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { sliderImages } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width: screenWidth } = Dimensions.get("window");

export default function ImageSlider() {
  return (
    <Carousel
      data={sliderImages}
      loop={true}
      autoPlay={true}
      renderItem={({ item, index }) => <ItemCard item={item} index={index} />}
      width={screenWidth}
      height={wp(78) - 70}
      autoPlayInterval={4000}
      style={{ display: "flex", alignItems: "center" }}
      scrollAnimationDuration={1000}
    />
  );
}

const ItemCard = ({ item }) => {
  /*
  const imageSource = Platform.OS === "web" ? item.uri : item;
  console.log('Rendering image:', item);
*/
  return (
    <View style={styles.itemContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: wp(100),
    height: hp(25),

    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: wp(100),
    height: hp(25),
    resizeMode: "cover",
   // borderRadius: 30,
  },
});
