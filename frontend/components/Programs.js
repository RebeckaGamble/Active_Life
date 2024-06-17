import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getAllWorkouts, getExerciseById } from "../api/ex_program";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuthContext } from "../context/AuthContext";
//import { saveWorkout } from "../api/accountDB";

const Programs = () => {
  const workouts = getAllWorkouts();
  const [expandedWorkoutId, setExpandedWorkoutId] = useState(null);
  const { saveWorkout } = useAuthContext();

  // Function to get exercise details by ID using getExerciseById
  const getExerciseDetails = (exerciseIds) => {
    return exerciseIds.map((id) => getExerciseById(id));
  };

  //toggle workout-details visibility
  const toggleWorkoutDetails = (workoutId) => {
    setExpandedWorkoutId(expandedWorkoutId === workoutId ? null : workoutId);
  };

  const handleSaveWorkout = async (item) => {
    const workout = {
      workout_id: item.id,
      workout_name: item.name,
      workout_description: item.description,
      duration_minutes: item.duration_minutes,
      exercises: item.exercises,
    };
    console.log("the workout", workout)

    try {
      await saveWorkout(workout);
      console.log("Workout saved successfully");
    } catch (error) {
    //  console.log("Workout not saved program: ", workout);

      console.error("Error saving workout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.bodyText}>{item.duration_minutes} min workout</Text>
              <Text style={styles.title}>{item.name}</Text>
              <TouchableOpacity onPress={() => handleSaveWorkout(item)} style={styles.iconBtn}>
                <Ionicons name="heart-outline" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.exerciseNames}>
                <Text style={styles.exerciseName}>Includes:</Text>{" "}
                {item.exercises
                  .map((exerciseId) => getExerciseById(exerciseId).name)
                  .join(", ")}
              </Text>
              <Text>{item.description}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => toggleWorkoutDetails(item.id)}
              >
                <Text style={styles.buttonText}>
                  {expandedWorkoutId === item.id
                    ? "Hide Exercises"
                    : "Show Exercises"}
                </Text>
              </TouchableOpacity>
              {expandedWorkoutId === item.id && (
                <View style={styles.exerciseDetailsContainer}>
                  {getExerciseDetails(item.exercises).map((exercise) => (
                    <View key={exercise.id} style={styles.exerciseContainer}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.bodyText}>{exercise.instructions}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Programs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 10,
    flexDirection: "column",
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 16,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  iconBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  button: {
    backgroundColor: "#d40da3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    maxWidth: 200,
    marginHorizontal: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  exerciseDetailsContainer: {
    marginTop: 10,
  },
  exerciseContainer: {
    marginTop: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
  },
  exerciseNames: {
    fontSize: 16,
    fontStyle: "italic",
    marginVertical: 5,
  },
  bodyText: {
    fontSize: 16,
  }
});
