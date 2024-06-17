import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:3000";

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveWorkout = async (workout) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(
      `${API_URL}/save-workout`,
      { workout },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSavedWorkouts = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/saved-workouts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
