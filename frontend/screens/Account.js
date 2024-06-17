import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../context/AuthContext";
import { getExerciseById } from "../api/ex_program";
import { formatTime } from "../utils/timer_format";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Account() {
  const [userEmail, setUserEmail] = useState(null);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [expandedWorkoutId, setExpandedWorkoutId] = useState(null);
  const [savedLaps, setSavedLaps] = useState([]);

  const { token, fetchUserInfo, logout, getSavedWorkout, removeSavedWorkout } =
    useAuthContext();
  const navigation = useNavigation();

  useEffect(() => {
    const getUserInfo = async () => {
      if (token) {
        const email = await fetchUserInfo();
        setUserEmail(email);
      }
    };
    getUserInfo();
  }, [token]);

  useEffect(() => {
    const getWorkouts = async () => {
      if (token) {
        const workouts = await getSavedWorkout();
        setSavedWorkouts(workouts);
      }
    };
    getWorkouts();
  }, [token]);

  const getExerciseDetails = (exerciseIds) => {
    return exerciseIds.map((id) => getExerciseById(id));
  };

  //toggle workout-details visibility
  const toggleWorkoutDetails = (workoutId) => {
    setExpandedWorkoutId(expandedWorkoutId === workoutId ? null : workoutId);
  };

  const handleLogout = async () => {
    await logout();
    navigation.navigate("LogIn");
  };

  const handleRemoveWorkout = async (workoutId) => {
    try {
      await removeSavedWorkout(workoutId);
      setSavedWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout.workout_id !== workoutId)
      );
    } catch (error) {
      console.error("Error removing workout:", error);
    }
  };

  //saved laps - timer
  /*
  useEffect(() => {
    const fetchSavedLaps = async () => {
      try {
        const storedLaps = await AsyncStorage.getItem("savedLaps");
        if (storedLaps) {
          setSavedLaps(JSON.parse(storedLaps));
        }
      } catch (error) {
        console.error("Error fetching saved laps:", error);
      }
    };

    fetchSavedLaps();
  }, []);
  */

  return (
    <ScrollView style={styles.container}>
      {token ? (
        <>
          <Text style={styles.title}>Keep track!</Text>
          <Text style={styles.normalText}>Logged in as: {userEmail}</Text>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../assets/images/avatar.png")}
              style={styles.avatar}
            />
          </View>
          <View style={styles.notificationIcon}>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Keep track of your workouts!
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Timer")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Timer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.normalText}>Your achievements:</Text>
            {/** 
            <View>
              {savedLaps.map((lap, index) => (
                <View key={index} style={styles.lap}>
                  <Text style={styles.lapText}>
                    Lap {savedLaps.length - index}
                  </Text>
                  <Text style={styles.lapText}>{formatTime(lap)}</Text>
                </View>
              ))}
            </View>
            */}
          </View>
          <View style={styles.achievementsContainer}>
            <Text style={styles.normalText}>Your saved workout programs:</Text>
            {Array.isArray(savedWorkouts) && savedWorkouts.length > 0 ? (
              savedWorkouts.map((workout, index) => (
                <View key={index} style={styles.workoutContainer}>
                  <View style={styles.workoutHeader}>
                    <Text style={styles.workoutTitle}>
                      {workout.workout_name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveWorkout(workout.workout_id)}
                      style={styles.iconBtn}
                    >
                      <Ionicons name="heart" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.workoutDuration}>
                    {workout.duration_minutes} minutes
                  </Text>
                  <Text style={styles.workoutDescription}>
                    {workout.workout_description}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => toggleWorkoutDetails(workout.id)}
                  >
                    <Text style={styles.buttonText}>
                      {expandedWorkoutId === workout.id
                        ? "Hide Exercises"
                        : "Show Exercises"}
                    </Text>
                  </TouchableOpacity>
                  {expandedWorkoutId === workout.id && (
                    <View style={styles.exerciseDetailsContainer}>
                      {getExerciseDetails(workout.exercises).map((exercise) => (
                        <View
                          key={exercise.id}
                          style={styles.exerciseContainer}
                        >
                          <Text style={styles.exerciseName}>
                            {exercise.name}
                          </Text>
                          <Text style={styles.bodyText}>
                            {exercise.instructions}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.normalText}>No workouts saved.</Text>
            )}
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.title}>You need to log in</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("LogIn")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191919",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  avatarContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  notificationIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  notificationButton: {
    height: 50,
    width: 50,
    backgroundColor: "#E2E8F0",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#CBD5E0",
  },
  descriptionContainer: {
    alignItems: "center",
  },
  descriptionText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#d40da3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    maxWidth: 220,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  normalText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  achievementsContainer: {
    marginTop: 20,
  },
  workoutContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  workoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  workoutDescription: {
    fontSize: 16,
    marginVertical: 5,
  },
  workoutDuration: {
    fontSize: 16,
    fontStyle: "italic",
  },
  iconBtn: {
    padding: 5,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lap: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#151515",
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  lapText: {
    fontSize: 18,
    color: "#fff",
  },
});
