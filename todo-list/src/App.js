import React, { Component } from 'react';
import iconDelete from './images/outline-delete-24px.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newToDoInput: '',
      toDoList: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNewTodoKeyPress = this.handleNewTodoKeyPress.bind(this);
  }
  handleInputChange(e) {
    this.setState({
      newToDoInput: e.target.value
    });
  }
  handleNewTodoKeyPress(e) {
    if (e.keyCode === 13) {
      this.state.toDoList.push(this.state.newToDoInput);
      this.setState({
        newToDoInput: '',
      });
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
        {/* List of Todos */}
        <ToDoListView
          toDoList={this.state.toDoList}
        />
      </div>
    );
  }
}

class ToDoListView extends Component {
  render() {
    return (
      <div>
        {this.props.toDoList.map((val, index) => 
          <ToDo key={index} val={val}/>
        )}
      </div>
    );
  }
}

class ToDo extends Component {
  render() {
    const toDoStyle = {
      
    }
    return (
      <div style={toDoStyle}>
        {this.props.val}
        {/* Find out what is going on with the image icon */}
        <img src={iconDelete} alt="delete"/>
      </div>
    );
  }
}

class ToDoInput extends Component {
  render() {
    const fullInputStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
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
          value={this.props.newToDoInput}
          onChange={this.props.handleInputChange}
          onKeyDown={this.props.handleNewTodoKeyPress}
        />
      </div>
    );
  }
}

export default App;
