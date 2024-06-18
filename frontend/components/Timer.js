import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import moment from "moment";
import { useAuthContext } from "../context/AuthContext";

const CountTimer = () => {
  const { saveLaps } = useAuthContext();
  const [start, setStart] = useState(0);
  const [now, setNow] = useState(0);
  const [laps, setLaps] = useState([]);
  const [timerState, setTimerState] = useState("initial");
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => clearInterval(timer);
  }, []);

  const startTimer = () => {
    const timestamp = new Date().getTime();
    setStart(timestamp);
    setNow(timestamp);
    setLaps([0]);
    setTimerState("running");

    const interval = setInterval(() => {
      setNow(new Date().getTime());
    }, 100);

    setTimer(interval); // Store the interval reference
  };

  const lap = () => {
    const [firstLap, ...other] = laps;
    const timestamp = new Date().getTime();
    const newLaps = [0, firstLap + now - start, ...other];

    setLaps(newLaps);
    setStart(timestamp);
    setNow(timestamp);
  };

  const stopTimer = () => {
    clearInterval(timer); // Clear the interval

    const [firstLap, ...other] = laps;
    const newLaps = [firstLap + now - start, ...other];

    setLaps(newLaps);
    setStart(0);
    setNow(0);
    setTimerState("stopped");
  };

  const resetTimer = () => {
    clearInterval(timer);

    setLaps([]);
    setStart(0);
    setNow(0);
    setTimerState("initial");
  };

  const resumeTimer = () => {
    const timestamp = new Date().getTime();
    setStart(timestamp);
    setNow(timestamp);
    setTimerState("running");

    const interval = setInterval(() => {
      setNow(new Date().getTime());
    }, 100);

    setTimer(interval); // Store the interval reference
  };

  const handleSaveLaps = async () => {
    try {
      console.log("Saving laps:", laps);
      await saveLaps(laps); // Ensure laps is correctly structured and includes lap_time, fastest, slowest
      Alert.alert("Success", "Laps saved successfully.");
    } catch (error) {
      console.error("Error saving laps:", error);
      Alert.alert(
        "Failed to save laps.",
        error.message || "Unknown error occurred"
      );
    }
  };

  const pad = (n) => (n < 10 ? "0" + n : n);

  const Timer = ({ interval, style }) => {
    const duration = moment.duration(interval);
    const centiseconds = Math.floor(duration.milliseconds() / 10);

    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={style}>{pad(duration.minutes())}: </Text>
        <Text style={style}>{pad(duration.seconds())},</Text>
        <Text style={style}>{pad(centiseconds)}</Text>
      </View>
    );
  };

  const RoundButton = ({ title, color, background, onPress, disabled }) => (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={{
        backgroundColor: background,
        borderRadius: 40,
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
      }}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View
        style={{
          width: 76,
          height: 76,
          borderRadius: 38,
          borderWidth: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: color, fontSize: 18 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const Lap = ({ number, interval, fastest, slowest }) => {
    const lapStyle = [
      styles.lap,
      fastest && styles.fastest,
      slowest && styles.slowest,
    ];

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderColor: "#151515",
          borderTopWidth: 1,
          paddingVertical: 10,
        }}
      >
        <Text style={lapStyle}>Lap {number}</Text>
        <Timer style={[lapStyle, styles.lapTimer]} interval={interval} />
      </View>
    );
  };

  const LapsTable = ({ laps, timer }) => {
    const finishedLaps = laps.slice(1);
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;

    if (finishedLaps.length >= 2) {
      finishedLaps.forEach((lap) => {
        if (lap < min) min = lap;
        if (lap > max) max = lap;
      });
    }

    return (
      <ScrollView style={{ alignSelf: "stretch" }}>
        {laps.map((lap, index) => (
          <Lap
            number={laps.length - index}
            key={laps.length - index}
            interval={index === 0 ? timer + lap : lap}
            fastest={lap === min}
            slowest={lap === max}
          />
        ))}
      </ScrollView>
    );
  };

  const ButtonRow = ({ children }) => (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-between",
        marginTop: 80,
        marginBottom: 30,
      }}
    >
      {children}
    </View>
  );

  const styles = StyleSheet.create({
    lap: {
      color: "#FFFFFF",
      fontSize: 18,
    },
    lapTimer: {
      width: 30,
    },
    fastest: {
      color: "#4BC05F",
    },
    slowest: {
      color: "#CC3531",
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0D0D0D",
        alignItems: "center",
        paddingTop: 130,
        paddingHorizontal: 20,
      }}
    >
      <Timer
        interval={laps.reduce((total, curr) => total + curr, 0) + (now - start)}
        style={{
          color: "#fff",
          fontSize: 76,
          fontWeight: "200",
          width: 110,
        }}
      />
      {timerState === "initial" && (
        <ButtonRow>
          <RoundButton
            title="Lap"
            color="#8B8B90"
            background="#3D3D3D"
            onPress={lap}
            disabled
          />
          <RoundButton
            title="Start"
            color="#50D167"
            background="#1B361F"
            onPress={startTimer}
          />
        </ButtonRow>
      )}

      {timerState === "running" && (
        <ButtonRow>
          <RoundButton
            title="Lap"
            color="#FFFFFF"
            background="#3D3D3D"
            onPress={lap}
          />
          <RoundButton
            title="Stop"
            color="#E33935"
            background="#3C1715"
            onPress={stopTimer}
          />
        </ButtonRow>
      )}

      {timerState === "paused" && (
        <ButtonRow>
          <RoundButton
            title="Lap"
            color="#FFFFFF"
            background="#3D3D3D"
            onPress={lap}
          />
          <RoundButton
            title="Reset"
            color="#FFFFFF"
            background="#3D3D3D"
            onPress={resetTimer}
          />
          <RoundButton
            title="Start"
            color="#50D167"
            background="#1B361F"
            onPress={resumeTimer}
          />
        </ButtonRow>
      )}

      {timerState === "stopped" && (
        <ButtonRow>
          <RoundButton
            title="Lap"
            color="#FFFFFF"
            background="#3D3D3D"
            onPress={lap}
          />
          <RoundButton
            title="Reset"
            color="#FFFFFF"
            background="#3D3D3D"
            onPress={resetTimer}
          />
          <RoundButton
            title="Start"
            color="#50D167"
            background="#1B361F"
            onPress={resumeTimer}
          />
        </ButtonRow>
      )}

      <LapsTable laps={laps} timer={now - start} />

      <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
        <Text style={{ color: "#fff", fontSize: "24px", alignItems: "center", paddingVertical: '10px', textAlign: 'center' }}>
          Keep track of your progress by saving your times to your account.
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 40,
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            color: "#50D167",
            backgroundColor: "#1B361F",
          }}
          onPress={handleSaveLaps}
        >
          <View
            style={{
              width: 76,
              height: 76,
              borderRadius: 38,
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CountTimer;
