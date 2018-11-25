import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minutesLeft: "25",
      secondsLeft: "00",
    }

    this.incrementSessionLength = this.incrementSessionLength.bind(this);
    this.decrementSessionLength = this.decrementSessionLength.bind(this);
    this.incrementBreakLength = this.incrementBreakLength.bind(this);
    this.decrementBreakLength = this.decrementBreakLength.bind(this);
  }

  incrementSessionLength() {
    this.setState(previousState => ({
      sessionLength: previousState.sessionLength + 1,
    }))
  }

  decrementSessionLength() {
    this.setState(previousState => ({
      sessionLength: previousState.sessionLength - 1,
    }))
  }

  incrementBreakLength() {
    this.setState(previousState => ({
      breakLength: previousState.breakLength + 1,
    }))
  }

  decrementBreakLength() {
    this.setState(previousState => ({
      breakLength: previousState.breakLength - 1,
    }))
  }

  render() {
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div id="break-label">Break Length</div>
        <div id="break-length">{this.state.breakLength}</div>
        <button id="break-increment" onClick={this.incrementBreakLength}>
          Break Increment
        </button>
        <button id="break-decrement" onClick={this.decrementBreakLength}>
          Break Decrement
        </button>
        <div id="sesson-label">Session Length</div>
        <div id="session-length">{this.state.sessionLength}</div>
        <button id="session-increment" onClick={this.incrementSessionLength}>
          Session Increment
        </button>
        <button id="session-decrement" onClick={this.decrementSessionLength}>
          Session Decrement
        </button>
        <div id="timer-label">Timer</div>
        <div id="time-left">
          {this.state.minutesLeft}:{this.state.secondsLeft}
        </div>
        <button id="start_stop">Start/Stop</button>
        <button id="reset">Reset</button>
      </div>
    );
  }
}

export default App;
