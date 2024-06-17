const exercisesData = require('./data.json');

//Exercises from json data, to programs component
export const getAllExercises = () => {
  return exercisesData.exercises;
};

//
export const getExerciseById = (id) => {
  return exercisesData.exercises.find(exercise => exercise.id === id);
};

//Workouts from json data, to programs
export const getAllWorkouts = () => {
  return exercisesData.workouts;
};