import axios from "axios";
import { rapidApiKey } from "../constants/index";

const baseUrl = "https://exercisedb.p.rapidapi.com";

const apiCall = async (url, params = {}) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const fullUrl = queryParams ? `${url}?${queryParams}` : url;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com", //
      },
    };
    console.log('RAPID_API_KEY:', rapidApiKey); 
    console.log(`Making API call to: ${fullUrl}`); // Logging URL

    const response = await fetch(fullUrl, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API call failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error making API call:", error);
    throw error;
  }
};

export const fetchExercisesByBodyPart = async (bodyPart) => {
  try {
    const params = { limit: 10 }; // Sätt limit till 10
    const data = await apiCall(
      `${baseUrl}/exercises/bodyPart/${bodyPart}`,
      params
    );
    return data;
  } catch (error) {
    console.error(`Error fetching exercises for body part ${bodyPart}:`, error);
    throw error;
  }
};

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
*/

// Användningsexempel
/*
fetchExercisesByBodyPart("back")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
  */