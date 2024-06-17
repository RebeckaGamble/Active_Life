import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { getAllExercises } from "../api/ex_program";

const Programs = () => {
  const exercises = getAllExercises();

  return (
    <FlatList
      data={exercises}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ width: "40%", backgroundColor: "#fdfdfd", gap: "10px" }}>
          <Text>{item.category}</Text>
          <View style={{backgroundColor: '#fff', borderRadius: '10px'}}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 200, height: 200, borderRadius: '10px' }}
            />
          </View>
          <View>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.instructions}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default Programs;
