import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newToDoInput: '',
      toDoList: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    this.setState({
      newToDoInput: e.target.value
    });
  }
  handle
  render() {
    const appStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px"
    }
    return (
      <div className="App" style={appStyle}>
        {/* Input field for the new task  */}
        <ToDoInput 
          newToDoInput={this.state.newToDoInput}
          handleInputChange={this.handleInputChange}
        />
        {/* Button for adding the new task  */}
      </div>
    );
  }
}

class ToDo extends Component {

}

class ToDoInput extends Component {
  render() {
    const fullInputStyle = {
      display: "flex",
      flexDirection: "row",
      width: "100%"
    }
    const inputStyle = {
      width: "500px"
    }
    
    return (
      <div style={fullInputStyle}>
        <label for="newToDoInput">New ToDo:</label>
        <input 
          type="text" 
          name="newToDoInput" 
          style={inputStyle}
          onChange={this.props.handleInputChange}
          // Add in onKeyDown for "Enter" and add that input to the todoList,
          // also, set the todoInput field to "".
        />
      </div>
    );
  }
}

export default App;
