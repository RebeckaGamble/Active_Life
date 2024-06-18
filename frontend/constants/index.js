//import dotenv from "dotenv";
//require('dotenv').config()
//dotenv.config();

export const rapidApiKey = "5cf647bd42mshf5570b6c7e4a998p18ce46jsnb19b1264408d"
//export const rapidApiKey = process.env.RAPID_API_KEY

export const sliderImages = [
  ("../assets/images/slide1.1.png"),
  ("../assets/images/slide2.png"),
  ("../assets/images/slide3.3.png"),
  ("../assets/images/slide4.4.png"),
  ("../assets/images/slide5.png"),
];
/*
export const sliderImages = [
  {
    mobile: require("../assets/images/slide1.1.png"),
    web: require("../assets/images/slide1.1.png").default,
  },
  {
    mobile: require("../assets/images/slide2.png"),
    web: require("../assets/images/slide2.png").default,
  },
  {
    mobile: require("../assets/images/slide3.3.png"),
    web: require("../assets/images/slide3.3.png").default,
  },
  {
    mobile: require("../assets/images/slide4.4.png"),
    web: require("../assets/images/slide4.4.png").default,
  },
  {
    mobile: require("../assets/images/slide5.png"),
    web: require("../assets/images/slide5.png").default,
  },
];
*/
export const bodyParts = [
  {
    name: "back",
    image: require("../assets/images/back.png"),
  },
  {
    name: "cardio",
    image: require("../assets/images/cardio.png"),
  },
  {
    name: "lower arms",
    image: require("../assets/images/lowerarms.png"),
  },
  {
    name: "lower legs",
    image: require("../assets/images/lowerlegs.png"),
  },
  {
    name: "chest",
    image: require("../assets/images/chest.png"),
  },
  {
    name: "neck",
    image: require("../assets/images/neck.png"),
  },
  {
    name: "shoulders",
    image: require("../assets/images/shoulders.png"),
  },
  {
    name: "upper arms",
    image: require("../assets/images/uperarms.png"),
  },
  {
    name: "upper legs",
    image: require("../assets/images/upperlegs.png"),
  },
];


export const demoExercises = [
  {
    bodyPart: "back",
    equipment: "cable",
    gifUrl: "../assets/images/back.png",
    id: "0007",
    name: "alternate lateral pulldown",
    target: "lats",
    secondaryMuscles: ["biceps", "rhomboids"],
    instructions: [
      "Sit on the cable machine with your back straight and feet flat on the ground.",
      "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
      "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
      "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    bodyPart: "back",
    equipment: "body weight",
    gifUrl: "../assets/images/back.png",
    id: "3293",
    name: "archer pull up",
    target: "lats",
    secondaryMuscles: ["biceps", "forearms"],
    instructions: [
      "Start by hanging from a pull-up bar with an overhand grip, slightly wider than shoulder-width apart.",
      "Engage your core and pull your shoulder blades down and back.",
      "As you pull yourself up, bend one arm and bring your elbow towards your side, while keeping the other arm straight.",
      "Continue pulling until your chin is above the bar and your bent arm is fully flexed.",
      "Lower yourself back down with control, straightening the bent arm and repeating the movement on the other side.",
      "Alternate sides with each repetition.",
    ],
  },
  {
    bodyPart: "back",
    equipment: "leverage machine",
    gifUrl: "../assets/images/back.png",
    id: "0015",
    name: "assisted parallel close grip pull-up",
    target: "lats",
    secondaryMuscles: ["biceps", "forearms"],
    instructions: [
      "Adjust the machine to your desired weight and height.",
      "Place your hands on the parallel bars with a close grip, palms facing each other.",
      "Hang from the bars with your arms fully extended and your feet off the ground.",
      "Engage your back muscles and pull your body up towards the bars, keeping your elbows close to your body.",
      "Continue pulling until your chin is above the bars.",
      "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    bodyPart: "back",
    equipment: "leverage machine",
    gifUrl: "../assets/images/back.png",
    id: "0017",
    name: "assisted pull-up",
    target: "lats",
    secondaryMuscles: ["biceps", "forearms"],
    instructions: [
      "Adjust the machine to your desired weight and height settings.",
      "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
      "Hang with your arms fully extended and your feet off the ground.",
      "Engage your back muscles and pull your body up towards the handles, keeping your elbows close to your body.",
      "Continue pulling until your chin is above the handles.",
      "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    bodyPart: "back",
    equipment: "leverage machine",
    gifUrl: "../assets/images/back.png",
    id: "1431",
    name: "assisted standing chin-up",
    target: "lats",
    secondaryMuscles: ["biceps", "forearms"],
    instructions: [
      "Adjust the machine to your desired assistance level.",
      "Stand on the foot platform and grip the handles with an overhand grip, slightly wider than shoulder-width apart.",
      "Keep your chest up and shoulders back, engage your core, and slightly bend your knees.",
      "Pull your body up by flexing your elbows and driving your elbows down towards your sides.",
      "Continue pulling until your chin is above the bar.",
      "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    bodyPart: "back",
    equipment: "leverage machine",
    gifUrl: "../assets/images/back.png",
    id: "1432",
    name: "assisted standing pull-up",
    target: "lats",
    secondaryMuscles: ["biceps", "forearms"],
    instructions: [
      "Adjust the machine to your desired weight and height settings.",
      "Stand facing the machine with your feet shoulder-width apart.",
      "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
      "Engage your lats and biceps, and pull yourself up towards the handles.",
      "Pause for a moment at the top, squeezing your back muscles.",
      "Slowly lower yourself back down to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    bodyPart: "back",
    equipment: "stability ball",
    gifUrl: "../assets/images/back.png",
    id: "1314",
    name: "back extension on exercise ball",
    target: "spine",
    secondaryMuscles: ["glutes", "hamstrings"],
    instructions: [
      "Place the stability ball on the ground and lie face down on top of it, with your hips resting on the ball and your feet against a wall or other stable surface.",
      "Position your hands behind your head or crossed over your chest.",
      "Engage your core and slowly lift your upper body off the ball, extending your back until your body forms a straight line from your head to your heels.",
      "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    bodyPart: "back",
    equipment: "body weight",
    gifUrl: "../assets/images/back.png",
    id: "3297",
    name: "back lever",
    target: "upper back",
    secondaryMuscles: ["biceps", "forearms", "core"],
    instructions: [
      "Start by hanging from a pull-up bar with an overhand grip, hands slightly wider than shoulder-width apart.",
      "Engage your core and pull your shoulder blades down and back.",
      "Bend your knees and tuck them towards your chest.",
      "Slowly lift your legs up, keeping them straight, until your body is parallel to the ground.",
      "Hold this position for a few seconds, then slowly lower your legs back down to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    bodyPart: "back",
    equipment: "body weight",
    gifUrl: "../assets/images/back.png",
    id: "1405",
    name: "back pec stretch",
    target: "lats",
    secondaryMuscles: ["shoulders", "chest"],
    instructions: [
      "Stand tall with your feet shoulder-width apart.",
      "Extend your arms straight out in front of you, parallel to the ground.",
      "Cross your arms in front of your body, with your right arm over your left arm.",
      "Interlock your fingers and rotate your palms away from your body.",
      "Slowly raise your arms up and away from your body, feeling a stretch in your back and chest.",
      "Hold the stretch for 15-30 seconds, then release.",
      "Repeat on the opposite side.",
    ],
  },
  {
    bodyPart: "back",
    equipment: "band",
    gifUrl: "../assets/images/back.png",
    id: "0970",
    name: "band assisted pull-up",
    target: "lats",
    secondaryMuscles: ["biceps", "forearms"],
    instructions: [
      "Attach the band to a pull-up bar or sturdy anchor point.",
      "Step onto the band and grip the bar with your palms facing away from you, hands slightly wider than shoulder-width apart.",
      "Hang with your arms fully extended, keeping your core engaged and your shoulders down and back.",
      "Pull your body up towards the bar by squeezing your shoulder blades together and driving your elbows down towards your hips.",
      "Continue pulling until your chin is above the bar, then slowly lower yourself back down to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
];
