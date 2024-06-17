import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
  } from "react-native";
  //import AsyncStorage from '@react-native-async-storage/async-storage';
  
  import React, { Component } from "react";
  import moment from "moment";
  import { useAuthContext } from "../context/AuthContext";
  
  //format time
  //const formatTime = (time) => moment.utc(time).format("mm:ss.SS");
  
  export class CountTimer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        start: 0,
        now: 0,
        laps: [],
        timerState: "initial",
      };
    }
  
    componentWillUnmount() {
      // AsyncStorage.removeItem("savedLaps"); //clear asyncstorage/laps on com unmount
      clearInterval(this.timer);
    }
  
    //start timer
    start = () => {
      const now = new Date().getTime();
      this.setState({
        start: now,
        now,
        laps: [0], //or empty
        timerState: "running",
      });
      this.timer = setInterval(() => {
        this.setState({ now: new Date().getTime() });
      }, 100);
    };
  
    //record lap
    lap = () => {
      const { laps, now, start } = this.state;
      const [firstLap, ...other] = laps; //takes laps array and puts first el into first lap var
  
      const timestamp = new Date().getTime();
      const newLaps = [0, firstLap + now - start, ...other];
      /*
      const newLaps = [0, firstLap + now - start, ...other];
  
      // Save laps to AsyncStorage
      AsyncStorage.setItem("savedLaps", JSON.stringify(newLaps))
        .then(() => console.log("Laps saved successfully."))
        .catch((error) => console.error("Error saving laps:", error));
  */
  
      this.setState({
        laps: newLaps,
        start: timestamp,
        now: timestamp,
      });
    };
  
    //stop timer
    stop = () => {
      clearInterval(this.timer); //clear timeer
      const { laps, now, start } = this.state;
      const [firstLap, ...other] = laps;
      const newLaps = [firstLap + now - start, ...other];
      /*
      const newLaps = [firstLap + now - start, ...other];
  
      // Save laps to AsyncStorage
      AsyncStorage.setItem("savedLaps", JSON.stringify(newLaps))
        .then(() => console.log("Laps saved successfully."))
        .catch((error) => console.error("Error saving laps:", error));
  */
      this.setState({
        laps: newLaps,
        start: 0, //reset
        now: 0,
        timerState: "stopped",
      });
    };
  
    //reset timer
    reset = () => {
      clearInterval(this.timer);
      /*
      AsyncStorage.removeItem("savedLaps") // Clear laps from AsyncStorage on reset (for testing)
      .then(() => console.log("Laps cleared successfully."))
      .catch((error) => console.error("Error clearing laps:", error));
  */
  
      this.setState({
        laps: [],
        start: 0,
        now: 0,
        timerState: "initial",
      });
    };
  
    resume = () => {
      const now = new Date().getTime();
      this.setState({
        start: now,
        now,
        timerState: "running",
      });
      this.timer = setInterval(() => {
        this.setState({ now: new Date().getTime() });
      }, 100);
    };
  
    handleSaveLaps = async () => {
      const { laps } = this.state;
      const { saveLaps } = this.props;
      try {
        console.log("Saving laps:", laps);
        await saveLaps(laps);
        Alert.alert("Success", "Laps saved successfully.");
      } catch (error) {
        console.error("Error saving laps:", error);
        Alert.alert("Failed to save laps.", error.message);
      }
    };
  
    render() {
      const { now, start, laps, timerState } = this.state;
      const timer = now - start;
  
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#0D0D0D",
            alignItems: "center",
            paddingTop: "130px",
            paddingHorizontal: "20px",
          }}
        >
          <Timer
            interval={laps.reduce((total, curr) => total + curr, 0) + timer} //reduce first lap  curr add value to tot begining 0, increase after every lap
            style={{
              color: "#fff",
              fontSize: "76px",
              fontWeight: "200",
              width: "110px",
            }}
          />
          {timerState === "initial" && (
            <ButtonRow>
              <RoundButton
                title="Lap"
                color="#8B8B90"
                background="#3D3D3D"
                onPress={this.lap}
                disabled
              />
              <RoundButton
                title="Start"
                color="#50D167"
                background="#1B361F"
                onPress={this.start}
              />
            </ButtonRow>
          )}
  
          {timerState === "running" && (
            <ButtonRow>
              <RoundButton
                title="Lap"
                color="#FFFFFF"
                background="#3D3D3D"
                onPress={this.lap}
              />
              <RoundButton
                title="Stop"
                color="#E33935"
                background="#3C1715"
                onPress={this.stop}
              />
            </ButtonRow>
          )}
  
          {timerState === "paused" && (
            <ButtonRow>
              <RoundButton
                title="Lap"
                color="#FFFFFF"
                background="#3D3D3D"
                onPress={this.lap}
              />
              <RoundButton
                title="Reset"
                color="#FFFFFF"
                background="#3D3D3D"
                onPress={this.reset}
              />
              <RoundButton
                title="Start"
                color="#50D167"
                background="#1B361F"
                onPress={this.resume}
              />
            </ButtonRow>
          )}
  
          {timerState === "stopped" && (
            <ButtonRow>
              <RoundButton
                title="Lap"
                color="#FFFFFF"
                background="#3D3D3D"
                onPress={this.lap}
              />
              <RoundButton
                title="Reset"
                color="#FFFFFF"
                background="#3D3D3D"
                onPress={this.reset}
              />
              <RoundButton
                title="Start"
                color="#50D167"
                background="#1B361F"
                onPress={this.resume}
              />
            </ButtonRow>
          )}
          {/**from start */}
          {/**
          {laps.length === 0 && (
            <ButtonRow>
              <RoundButton
                title="Lap"
                color="#8B8B90"
                background="#151515"
                disabled
              />
              <RoundButton
                onPress={this.start}
                title="Start"
                color="#50D167"
                background="#1B361F"
              />
            </ButtonRow>
          )}
             */}
          {/**when started */}
          {/** 
          {start > 0 && (
            <ButtonRow>
              <RoundButton
                title="Reset"
                color="#FFFFFF"
                background="#3D3D3D"
                onPress={this.reset}
                disabled
              />
              <RoundButton
                onPress={this.stop}
                title="Stop"
                color="#E33935"
                background="#3C1715"
              />
            </ButtonRow>
          )}
          */}
          {/**when stopped */}
          {/**
          {laps.length > 0 && start === 0 && (
            <ButtonRow>
              <RoundButton
                title="Lap"
                color="#FFFFFF"
                background="#3D3D3D"
                onPress={this.lap}
              />
               <RoundButton
                title="Reset"
                color="#FFFFFF"
                background="#3D3D3D"
                onPress={this.reset}
              />
              <RoundButton
                onPress={this.resume}
                title="Start"
                color="#50D167"
                background="#1B361F"
              />
            </ButtonRow>
          )}
           */}
          <LapsTable laps={laps} timer={timer} />
          <View>
            <Text>
              Keep track of your progress by saving your times to your account.
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: "40px",
                width: "80px",
                height: "80px",
                alignItems: "center",
                justifyContent: "center",
                color: '#50D167',
                backgroundColor: "#1B361F"
              }}
              onPress={this.handleSaveLaps}
            >
              <Text style={{color: "#fff", fontSize: '18px'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  
  function Timer({ interval, style }) {
    const pad = (n) => (n < 10 ? "0" + n : n); //set to 00: 00,00
  
    const duration = moment.duration(interval);
    const centiseconds = Math.floor(duration.milliseconds() / 10);
  
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={style}>{pad(duration.minutes())}: </Text>
        <Text style={style}>{pad(duration.seconds())},</Text>
        <Text style={style}>{pad(centiseconds)}</Text>
      </View>
    );
  }
  
  function RoundButton({ title, color, background, onPress, disabled }) {
    return (
      <TouchableOpacity
        onPress={() => !disabled && onPress()}
        style={{
          backgroundColor: background,
          borderRadius: "40px",
          width: "80px",
          height: "80px",
          alignItems: "center",
          justifyContent: "center",
        }}
        activeOpacity={disabled ? 1.0 : 0.7}
      >
        <View
          style={{
            width: "76px",
            height: "76px",
            borderRadius: "38px",
            borderWidth: "2px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: color, fontSize: "18px" }}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  
  function Lap({ number, interval, fastest, slowest }) {
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
          borderTopWidth: "1px",
          paddingVertical: "10px",
        }}
      >
        <Text style={lapStyle}>Lap {number}</Text>
        <Timer style={[lapStyle, styles.lapTimer]} interval={interval} />
      </View>
    );
  }
  
  function LapsTable({ laps, timer }) {
    const finishedLaps = laps.slice(1); //dont mark the current lap
    let min = Number.MAX_SAFE_INTEGER; //atleast one min lap will be found
    let max = Number.MIN_SAFE_INTEGER;
  
    if (finishedLaps.length >= 2) {
      finishedLaps.forEach((lap) => {
        if (lap < min) min = lap;
        if (lap > max) max = lap; //if greater than max
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
  }
  
  function ButtonRow({ children }) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignSelf: "stretch",
          justifyContent: "space-between",
          marginTop: "80px",
          marginBottom: "30px",
        }}
      >
        {children}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    lap: {
      color: "#FFFFFF",
      fontSize: "18px",
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
  
  const CountTimerWithAuth = (props) => {
    const { saveLaps } = useAuthContext();
    return <CountTimer {...props} saveLaps={saveLaps} />;
  };
  
  export default CountTimerWithAuth;