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
    return (
      <div 
        className="App"
        style={Object.assign({
          backgroundColor: green,
          color: "white",
        }, centeredColumn)}
      >
        <h1>Pomodoro Clock</h1>
        <TimerSettings
          breakLength={this.state.breakLength}
          incrementBreakLength={this.incrementBreakLength}
          decrementBreakLength={this.decrementBreakLength}
          sessionLength={this.state.sessionLength}
          incrementSessionLength={this.incrementSessionLength}
          decrementSessionLength={this.decrementSessionLength}
        />
        <div id="timer-label">
        {
          this.state.breakTimerRunning?
          "Break Timer":
          "Session Timer"
        }
        </div>
        <div id="time-left">
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
      </div>
    );
  }
}

const TimerSettings = function(props) {
  return (
    <div 
      id="timer-settings"
      style={{
        display: "flex",
      }}
    >
      <div 
        id="break-settings"
        style={centeredColumn}
      >
        <div id="break-label">Break Length</div>
        <div id="break-length">{props.breakLength}</div>
        <button 
          id="break-increment" onClick={props.incrementBreakLength}
          style={{
            height: "50px",
            width: "50px",
            backgroundColor: "red",
          }}
        >
        </button>
        <button id="break-decrement" onClick={props.decrementBreakLength}>
          Break Decrement
        </button>
      </div>

      <div
        id="session-settings"
        style={centeredColumn}
      >
        <div id="session-label">Session Length</div>
        <div id="session-length">{props.sessionLength}</div>
        <button id="session-increment" onClick={props.incrementSessionLength}>
          Session Increment
        </button>
        <button id="session-decrement" onClick={props.decrementSessionLength}>
          Session Decrement
        </button>
      </div>
    </div>
    
  );
}

export default App;