import React from 'react';

// CSS Christmas Colors
const lightRed = "rgb(255,120,120)";
const lightGreen = "rgb(115,214,128)";
const green = "rgb(55,139,40)";
// Also use white and red 🎄

// CSS Settings
const centeredColumn = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}
const emptyButton = {
  backgroundColor: "transparent",
  border: "0px",
}
const Arrow = function(props) {
  return(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `rotate(${props.rotationDeg})`
      }}
    >
      <Triangle
        yOffset="0"
        triangleColor={props.arrowColor}
        triangleSize={props.arrowSize}
      />
      <div
        style={{
          position: "relative",
          width: props.arrowSize,
          height: props.arrowSize,
          top: 0,
          backgroundColor: props.arrowColor,
        }}
      />
    </div>
  )
}
const Triangle = function(props) {
  // Must take props: yOffset, triangleColor, triangleSize
  return (
    <div
      style={{
        position: "relative",
        bottom: props.yOffset,
        width: 0,
        height: 0,
        borderLeft: props.triangleSize + " solid transparent",
        borderRight: props.triangleSize + " solid transparent",
        borderBottom: props.triangleSize + " solid " + props.triangleColor,
      }}
    />
  );
}
const ChristmasTree = function(props) {
  // Must take props: treeSize
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // The marginTop might need to change a bit for different sizes
        marginTop: `calc(${props.treeSize} * -1.85)`,
      }}
    >
      <Triangle 
        yOffset={`calc(${props.treeSize} * -1.4)`}
        triangleColor="green"
        triangleSize={props.treeSize}
      />
      <Triangle 
        yOffset={`calc(${props.treeSize} * -0.9)`}
        triangleColor="green"
        triangleSize={`calc(${props.treeSize} * 1.3)`}
      />
      <Triangle 
        yOffset="0px"
        triangleColor="green"
        triangleSize={`calc(${props.treeSize} * 1.6)`}
      />
      <div
        style={{
          width: `calc(${props.treeSize} * 0.6)`,
          height: `calc(${props.treeSize} * 0.6)`,
          backgroundColor: "#9d4e15",
          position: "relative",
          top: '0px',
        }}
      >
      </div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minutesLeft: "25",
      secondsLeft: "00",
      timerRunning: false,
      breakTimerRunning: false,
    }

    this.incrementSessionLength = this.incrementSessionLength.bind(this);
    this.decrementSessionLength = this.decrementSessionLength.bind(this);
    this.incrementBreakLength = this.incrementBreakLength.bind(this);
    this.decrementBreakLength = this.decrementBreakLength.bind(this);
    this.decrementTimerOneSec = this.decrementTimerOneSec.bind(this);
    this.toggleTimerRunning = this.toggleTimerRunning.bind(this);
    this.createInterval = this.createInterval.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.audioElement = document.getElementById("beep");
  }

  componentWillUnmount() {
    delete this.audioElement;
  }

  incrementSessionLength() {
    if (this.state.sessionLength < 60) {
      let newSessionLength = this.state.sessionLength + 1;
      let newMinutesLeft = newSessionLength;
      if (newMinutesLeft < 10) {
        newMinutesLeft = `0${newMinutesLeft}`;
      }
      this.setState({
        sessionLength: newSessionLength,
        minutesLeft: newMinutesLeft,
      });
    }
  }

  decrementSessionLength() {
    if (this.state.sessionLength > 1) {
      let newSessionLength = this.state.sessionLength - 1;
      let newMinutesLeft = newSessionLength;
      if (newMinutesLeft < 10) {
        newMinutesLeft = `0${newMinutesLeft}`;
      }
      this.setState({
        sessionLength: newSessionLength,
        minutesLeft: newMinutesLeft,
      });
    }
  }

  incrementBreakLength() {
    if (this.state.breakLength < 60) {
      this.setState(previousState => ({
        breakLength: previousState.breakLength + 1,
      }))
    }
  }

  decrementBreakLength() {
    if (this.state.breakLength > 1) {
      this.setState(previousState => ({
        breakLength: previousState.breakLength - 1,
      }))
    }
  }

  toggleTimerRunning() {
    const timerIsRunning = this.state.timerRunning;
    this.setState({
      timerRunning: !timerIsRunning
    });
    if (!timerIsRunning) {
      this.createInterval();
    } else {
      clearInterval(this.intervalID);
    }
  }

  createInterval() {
    this.intervalID = setInterval(this.decrementTimerOneSec, 1000);
  }

  decrementTimerOneSec() {
    let newSeconds = Number(this.state.secondsLeft);
    let newMinutes = Number(this.state.minutesLeft);
    if (newMinutes === 0 && newSeconds === 0) {
      if (!this.state.breakTimerRunning) {
        newMinutes = this.state.breakLength;
        this.setState({
          breakTimerRunning: true,
        })
      } else {
        newMinutes = this.state.sessionLength;
        this.setState({
          breakTimerRunning: false,
        })
      }
      this.audioElement.play();
    } else if (newSeconds === 0) {
      newMinutes--;
      newSeconds = 59;
    } else {
      newSeconds--;
    }
    if (newSeconds < 10) {
      newSeconds = `0${newSeconds}`;
    }
    if (newMinutes < 10) {
      newMinutes = `0${newMinutes}`;
    }
    this.setState({
      secondsLeft: newSeconds,
      minutesLeft: newMinutes,
    });
  }

  resetTimer() {
    if (this.state.timerRunning) {
      this.toggleTimerRunning();
    }
    let newMinutes = this.state.sessionLength;
    if (newMinutes < 10) {
      newMinutes = `0${newMinutes}`;
    }
    this.setState({
      minutesLeft: newMinutes,
      secondsLeft: "00",
      breakTimerRunning: false,
    })
    if (this.audioElement.currentTime > 0) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }

  render() {
    const clockStyle = {
      fontSize: "2.2em",
      fontWeight: "bold",
      marginBottom: "20px",
    }
    return (
      <div 
        className="App"
        style={Object.assign({
          backgroundColor: lightGreen,
          color: "white",
          height: "100vh",
          textAlign: "center",
        }, centeredColumn)}
      >
        <h1>Pomodoro Clock</h1>
        <ChristmasTree
          treeSize="25px"
        />
        <TimerSettings
          breakLength={this.state.breakLength}
          incrementBreakLength={this.incrementBreakLength}
          decrementBreakLength={this.decrementBreakLength}
          sessionLength={this.state.sessionLength}
          incrementSessionLength={this.incrementSessionLength}
          decrementSessionLength={this.decrementSessionLength}
        />
        <h2 id="timer-label">
        {
          this.state.breakTimerRunning?
          "Break Timer":
          "Session Timer"
        }
        </h2>
        <div style={clockStyle} id="time-left">
          {this.state.minutesLeft}:{this.state.secondsLeft}
        </div>
        <button id="start_stop" onClick={this.toggleTimerRunning}>
          Start/Stop
        </button>
        <button id="reset" onClick={this.resetTimer}>
          Reset
        </button>
        <audio 
          id="beep"
          src="https://sampleswap.org/samples-ghost/SFX%20and%20UNUSUAL%20SOUNDS/ELECTRO%20and%20SYNTHETIC/192[kb]watch_alarm.aif.mp3"
        />
        <p>Coded by <a href="https://github.com/aneuhold">Tony Neuhold</a> roughly around Christmas Time 😁🎄</p>
      </div>
    );
  }
}

const TimerSettings = function(props) {
  const timerStyle = Object.assign({
    margin: "0px 15px"
  }, centeredColumn);
  const timerNumberStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
    marginBottom: "10px",
  }
  return (
    <div 
      id="timer-settings"
      style={{
        display: "flex",
      }}
    >
      <div id="session-settings" style={timerStyle}>
        <h3 id="session-label">Session Length</h3>
        <div style={timerNumberStyle} id="session-length">{props.sessionLength}</div>
        <div
          style={{
            display: "flex",
          }}
        >
          <button id="session-increment" onClick={props.incrementSessionLength} style={emptyButton}>
            <Arrow arrowColor={lightRed} arrowSize="20px" rotationDeg="0deg"/>
          </button>
          <button id="session-decrement" onClick={props.decrementSessionLength} style={emptyButton}>
            <Arrow arrowColor={lightRed} arrowSize="20px" rotationDeg="180deg"/>
          </button>
        </div>
      </div>
      <div id="break-settings" style={timerStyle}>
        <h3 id="break-label">Break Length</h3>
        <div style={timerNumberStyle} id="break-length">{props.breakLength}</div>
        <div 
          style={{
            display: "flex",
          }}
        >
          <button id="break-increment" onClick={props.incrementBreakLength} style={emptyButton}>
            <Arrow arrowColor={green} arrowSize="20px" rotationDeg="0deg"/>
          </button>
          <button id="break-decrement" onClick={props.decrementBreakLength} style={emptyButton}>
            <Arrow arrowColor={green} arrowSize="20px" rotationDeg="180deg"/>
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default App;