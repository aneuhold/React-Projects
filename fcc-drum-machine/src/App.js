/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';
import './App.css';

// Audio Sources
const claves = "http://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/standard%20808%20drumkit/2[kb]claves.aif.mp3"
const crashcym = "http://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/standard%20808%20drumkit/192[kb]crashcym.aif.mp3"
const clapSnare = "http://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/snares/26[kb]clapsnare.aif.mp3"
const eightOhEight1 = "http://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/kicks/152[kb]808distbd.aif.mp3"
const kick1 = "http://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/standard%20808%20drumkit/60[kb]kick1.aif.mp3"
const tom1 = "http://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/standard%20808%20drumkit/31[kb]tom1.aif.mp3"
const kick2 = "http://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/standard%20808%20drumkit/74[kb]kick2.aif.mp3"
const snare1 = "http://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/808%20Kicks%20n%20Snares/32[kb]808sd15.aif.mp3"
const saw = "http://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/Strange%20Kit/29[kb]strangeKit03-QuickSaw..wav.mp3"

// CSS Objects
const flexCenter = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}
const drumPadOn = Object.assign({
  justifyContent: "center",
  backgroundColor: "white",
  height: "75px",
  width: "75px",
  fontSize: "1.5em",
  borderRadius: "10px"
}, flexCenter);
const drumPadOff = Object.assign({
  boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
}, drumPadOn);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastPlayedAudioClip: "No audio played yet"
    };
    this.setLastPlayedAudioClip = this.setLastPlayedAudioClip.bind(this);
  }
  
  setLastPlayedAudioClip(audioString) {
    this.setState({
      lastPlayedAudioClip: audioString
    });
  }
  
  render() {
    return (
      <div 
        className="siteContainer"
        id="drum-machine"
        style={Object.assign({
          fontFamily: "'Roboto', sans-serif",
          backgroundColor: "silver",
          margin: 0,
          padding: 0,
          height: "100vh",
          width: "100%"
        }, flexCenter)}
      >
        <h1
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "10px",
            textAlign: "center"
          }}
        >
          🥁 Drum Machine 🥁
        </h1>
        <DrumDisplayContainer
          setLastPlayedAudioClip={this.setLastPlayedAudioClip}
          lastPlayedAudioClip={this.state.lastPlayedAudioClip}
        />
      </div>
    );
  }
}

class DrumDisplayContainer extends Component {
  render() {
    return (
      <div 
        id="display"
        style={{
          textAlign: "center"
        }}
      >
        <DrumAudioDisplay
          lastPlayedAudioClip={this.props.lastPlayedAudioClip}
        />
        <DrumDisplay 
          setLastPlayedAudioClip={this.props.setLastPlayedAudioClip}
        />
      </div>
    );
  }
}

class DrumAudioDisplay extends Component {
  render() {
    return (
      <div>
        {this.props.lastPlayedAudioClip}
      </div>
    );
  }
}

class DrumDisplay extends Component {
  render() {
    let drumKeys = [
      {
        drumPadId: "claves-drumPad", 
        audioSrc: claves,
        audioString: "Claves",
        audioElId: "Q"
      },
      {
        drumPadId: "crashcym-drumPad", 
        audioSrc: crashcym,
        audioString: "Crash Cymbol",
        audioElId: "W"
      },
      {
        drumPadId: "eightOhEight1-drumPad", 
        audioSrc: eightOhEight1,
        audioString: "808",
        audioElId: "E"
      },
      {
        drumPadId: "clapSnare-drumPad", 
        audioSrc: clapSnare,
        audioString: "Clap Snare",
        audioElId: "A"
      },
      {
        drumPadId: "kick1-drumPad", 
        audioSrc: kick1,
        audioString: "808 Kick 1",
        audioElId: "S"
      },
      {
        drumPadId: "tom1-drumPad", 
        audioSrc: tom1,
        audioString: "Tom",
        audioElId: "D"
      },
      {
        drumPadId: "kick2-drumPad", 
        audioSrc: kick2,
        audioString: "808 Kick 2",
        audioElId: "Z"
      },
      {
        drumPadId: "snare1-drumPad", 
        audioSrc: snare1,
        audioString: "Snare",
        audioElId: "X"
      },
      {
        drumPadId: "saw-drumPad", 
        audioSrc: saw,
        audioString: "Saw",
        audioElId: "C"
      }
    ]
    return (
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: "10px"
        }}  
      >
        {drumKeys.map(obj => 
          <DrumPad
            drumPadId={obj.drumPadId}
            audioElId={obj.audioElId}
            audioSrc={obj.audioSrc}
            audioString={obj.audioString}
            setLastPlayedAudioClip={this.props.setLastPlayedAudioClip}
          />
        )}
      </div>
    );
  }
}

// Responsible for click logic of drumpad elements, and sound file logic. 
class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drumPadStyle: drumPadOff
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  
  handleKeyDown(event) {
    if (event.key.toUpperCase() == this.props.audioElId) {
      let audioElement = document.getElementById(this.props.audioElId);
      this.setState({
        drumPadStyle: drumPadOn
      })
      this.playSound(audioElement);
    }
  }
  
  handleKeyUp(event) {
    if (event.key.toUpperCase() == this.props.audioElId) {
      this.setState({
        drumPadStyle: drumPadOff
      })
    }
  }
  
  componentDidMount() {
    let drumPadElement = document.getElementById(this.props.drumPadId);
    drumPadElement.addEventListener('click', this.handleClick);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }
  
  componentWillUnmount() {
    let drumPadElement = document.getElementById(this.props.drumPadId);
    drumPadElement.removeEventListener('click', this.handleClick);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }
  
  playSound(element) {
    if (element != null) {
      if (element.currentTime > 0) {
        element.currentTime = 0;
        element.play();
      } else {
        element.play();
      }
      this.props.setLastPlayedAudioClip(this.props.audioString);
    }
  }
  
  handleClick(e) {
    let audioElement = document.getElementById(this.props.audioElId);
    this.setState({
      drumPadStyle: drumPadOn
    });
    setTimeout(
      function() {
        this.setState({
          drumPadStyle: drumPadOff
        })
      }.bind(this), 
      300
    );
    // For some reason this function call is a trap and doesn't return to the function
    // after completing
    this.playSound(audioElement);
  }
  
  handleEndSound(e) {
    e.target.currentTime = 0;
  }
  
  render() {
    return (
      <div
        className="drum-pad" 
        id={this.props.drumPadId}
        style={this.state.drumPadStyle}
      >
        <audio 
          id={this.props.audioElId}
          onEnded={this.handleEndSound}
          className="clip"
          audioString={this.props.audioString}
          src={this.props.audioSrc}
        />
        <strong>
          {this.props.audioElId}
        </strong>
      </div>
    );
  }
}

export default App;
