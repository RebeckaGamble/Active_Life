import axios from "axios";
import React, { createContext, useState, useContext } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      setToken(response.data.token);
      setUserEmail(email);
      await AsyncStorage.setItem("token", response.data.token); // Store token in AsyncStorage
      Alert.alert("Success", "Login successful.");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      Alert.alert(
        "Error",
        error.response?.data || "An error occurred during login."
      );
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        email,
        password,
      });
      Alert.alert("Success", response.data);
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);

      Alert.alert(
        "Error",
        error.response?.data || "An error occurred during registration."
      );
    }
  };

  const logout = async () => {
    setToken(null);
    setUserEmail(null);
    await AsyncStorage.removeItem("token");
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetch user info response:", response.data);

      return response.data.email;
    } catch (error) {
      console.error(
        "Fetch user info error:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Error",
        error.response?.data || "An error occurred while fetching user info."
      );
      return null;
    }
  };

  //save workout
  const saveWorkout = async (workout) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");
    //console.log("token in auth", token)
    try {
      const response = await axios.post(
        "http://localhost:3000/save-workout",
        { workout },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log("respons save work in auth", response)
      console.log("data save work in auth", response.data);

      return response.data;
    } catch (error) {
      //  console.log("err respons save work in auth", response)
      console.log("err data save work in auth", data);
      console.error(
        "Error saving workout:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  const getSavedWorkout = async (workout) => {
    try {
      const response = await axios.get("http://localhost:3000/saved-workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetch workout response:", response.data);

      return response.data;
    } catch (error) {
      console.error(
        "Fetch workout error:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Error",
        error.response?.data || "An error occurred while fetching workouts."
      );
      return null;
    }
  };

  //remove workout
  /*
  const removeSavedWorkout = async (workoutId, userId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/saved-workouts/${workoutId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user_id: userId,
        },
      });
      console.log("Workout removed:", response.data);
    } catch (error) {
      console.error("Error removing workout:", error);
      throw error;
    }
  };*/
  const removeSavedWorkout = async (workoutId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/saved-workouts/${workoutId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Workout removed:", response.data);
    } catch (error) {
      console.error("Error removing workout:", error);
      throw error;
    }
  };

  const saveLaps = async (laps) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    try {
      const response = await axios.post(
        "http://localhost:3000/save-laps",
        { laps },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data save laps in auth", response.data);
      return response.data;
    } catch (error) {
      console.error("Error saving laps:", error.response?.data || error.message);
      throw error;
    }
  };


  return (
    <AuthContext.Provider
      value={{
        token,
        userEmail,
        login,
        register,
        logout,
        fetchUserInfo,
        saveWorkout,
        getSavedWorkout,
        removeSavedWorkout,
        saveLaps,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}

/*save laps
export const saveLaps = async (laps) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");
    //console.log("token in auth", token)
    try {
      const response = await axios.post(
        "http://localhost:3000/save-laps",
        { laps },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log("respons save work in auth", response)
      console.log("data save laps in auth", response.data);

      return response.data;
    } catch (error) {
      //  console.log("err respons save work in auth", response)
      console.log("err data save laps in auth", data);
      console.error(
        "Error saving laps:",
        error.response?.data || error.message
      );

      throw error;
    }
  };*/
  