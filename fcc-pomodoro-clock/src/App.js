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
  }
  render() {
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div id="break-label">Break Length</div>
        <div id="break-length">5</div>
        <button id="break-increment">Break Increment</button>
        <button id="break-decrement">Break Decrement</button>
        <div id="sesson-label">Session Length</div>
        <div id="session-length">25</div>
        <button id="session-increment">Session Increment</button>
        <button id="session-decrement">Session Decrement</button>
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
