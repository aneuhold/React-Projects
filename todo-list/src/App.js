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
  handleNewTodoKeyPress(e) {
    if (e.keyCode === 13) {
      // Finish entering logic for adding a todo after pressing "Enter".
      // Clear out the newTodoInput and add an entry to toDoList as an object.
      console.log("Pressed the enter key");
    }
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
          handleNewTodoKeyPress={this.handleNewTodoKeyPress}
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
          onKeyDown={this.props.handleNewTodoKeyPress}
        />
      </div>
    );
  }
}

export default App;
