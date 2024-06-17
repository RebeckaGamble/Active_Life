import axios from "axios";
import { rapidApiKey } from "../constants";

/*
const baseUrl = "https://exercisedb.p.rapidapi.com";

const apiCall = async (url, params = {}) => {
  try {
    const options = {
      method: "GET",
      url,
      params,
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };
    console.log("Requested options: ", options);
    const response = await axios.request(options);
    console.log("API Response:", response.data);
    return response.data;
  } catch (err) {
    console.log(
      "API call error:",
      err.response ? err.response.data : err.message
    );
    return null;
  }
};
*/
export const fetchExercisesByBodyPart = async (bodyPart) => {
  try {
    const data = await apiCall(`${baseUrl}/exercises/bodyPart/${bodyPart}`);
    console.log("Fetched Data:", data); // Log the fetched data
    return data;
  } catch (err) {
    console.error("Fetch exercises error:", err.message);
    return null;
  }
};
