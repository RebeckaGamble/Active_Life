import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import mysql2 from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
//const { Sequelize, DataTypes } = require("sequelize");
//const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const port = process.env.DB_PORT;

app.use(cors());
app.use(bodyParser.json());

/*
const sequelize = new Sequelize("fitness_app", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});
*/

const jwtSecret = process.env.JWT_SECRET;

const db = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  port: process.env.PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database as id " + db.threadId);
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error registering the user.");
      }
      res.status(200).send("User registered successfully.");
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).send("Error on the server.");
    if (results.length === 0) return res.status(404).send("No user found.");

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).send({ auth: true, token: token });
  });
});

//middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(403).send("No token provided.");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send("Failed to authenticate token.");

    req.userId = decoded.id;
    next();
  });
}

//get user info in account
app.get("/user-info", verifyToken, (req, res) => {
  const userId = req.userId;
  console.log("userId from db", userId);

  db.query("SELECT email FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Error fetching user info.");
    }

    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }

    const user = results[0];
    res.status(200).send({ email: user.email });
  });
});

//save workout
app.post("/save-workout", (req, res) => {
  const { workout } = req.body;
  const id = req.userId;

  console.log("workout server", workout);
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(500).send("Failed to authenticate token.");

    const { id: user_id } = decoded;
    console.log("user id save workout server: ", user_id);
    console.log("user id save workout server: ", id);

    const {
      workout_id,
      workout_name,
      workout_description,
      duration_minutes,
      exercises,
    } = workout;
    console.log("in server", workout);

    const query = `
      INSERT INTO saved_workouts (
        user_id, workout_id, workout_name, workout_description, duration_minutes, exercises
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        user_id,
        workout_id,
        workout_name,
        workout_description,
        duration_minutes,
        JSON.stringify(exercises),
      ],
      (err, result) => {
        if (err) return res.status(500).send("Error saving the workout.");
        res.status(200).send("Workout saved successfully.");
      }
    );
  });
});

//get the saved workouts to users account
app.get("/saved-workouts", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send("Failed to authenticate token.");

    db.query(
      "SELECT * FROM saved_workouts WHERE user_id = ?",
      [decoded.id],
      (err, results) => {
        if (err) return res.status(500).send("Error fetching workouts.");
        res.status(200).send(results);
      }
    );
  });
});

//remove saved workout
app.delete("/saved-workouts/:id", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const workoutId = req.params.id;
  // const { user_id } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send("Failed to authenticate token.");

    const userId = decoded.id;

    db.query(
      "DELETE FROM saved_workouts WHERE user_id = ? AND workout_id = ?",
      [userId, workoutId],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error removing workout.");
        }
        res.status(200).send("Workout removed.");
      }
    );
  });
});

//save laps
/*
app.post("/save-laps", (req, res) => {
  const { laps } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(500).send("Failed to authenticate token.");

    const { id: user_id } = decoded;
    console.log("user id save laps server: ", user_id);

    // Prepare the SQL query and values array for batch insert
    const query = `
      INSERT INTO laps (
        user_id, lap_index, lap_time, fastest, slowest
      ) VALUES ?
    `;

    // Prepare the values array with lap data
    const values = laps.map((lap, index) => [
      user_id,
      index,
      lap.lap_time,
      lap.fastest,
      lap.slowest,
    ]);

    db.query(query, [values], (err, result) => {
      if (err) {
        console.error("Error saving the laps:", err);
        return res.status(500).send("Error saving the laps.");
      }
      res.status(200).send("Laps saved successfully.");
    });
  });
});
*/
// save laps
app.post("/save-laps", (req, res) => {
  const { laps } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(500).send("Failed to authenticate token.");

    const { id: user_id } = decoded;
    console.log("user id save laps server: ", user_id);

    // Initialize with first lap time for comparison
    let fastest = laps.length > 0 ? laps[0].lap_time : null;
    let slowest = laps.length > 0 ? laps[0].lap_time : null;

    // Find actual fastest and slowest laps
    laps.forEach((lap) => {
      const lapTime = lap.lap_time;
      if (lapTime < fastest) {
        fastest = lapTime;
      }
      if (lapTime > slowest) {
        slowest = lapTime;
      }
    });

    // Prepare the SQL query and values array for batch insert
    const query = `
      INSERT INTO laps (
        user_id, lap_index, lap_time, fastest, slowest
      ) VALUES ?
    `;

    // Prepare the values array with lap data
    const values = laps.map((lap, index) => [
      user_id,
      index,
      lap.lap_time,
      fastest, // Set the overall fastest lap time for all laps
      slowest, // Set the overall slowest lap time for all laps
    ]);

    db.query(query, [values], (err, result) => {
      if (err) {
        console.error("Error saving the laps:", err);
        return res.status(500).send("Error saving the laps.");
      }
      res.status(200).send("Laps saved successfully.");
    });
  });
});


app.listen(port, () => {
  console.log("Listening on port: " + port);
});
