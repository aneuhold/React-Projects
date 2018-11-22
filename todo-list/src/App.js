import React, { Component } from 'react';
import iconDelete from './images/outline-delete-24px.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newToDoInput: '',
      toDoList: [],
      toDoCount: 0
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
      // Improving the data structure for the Todos
      this.state.toDoList.push({
        title: this.state.newToDoInput,
        toDoNum: this.state.toDoCount + 1
      });
      this.setState({
        newToDoInput: '',
        toDoCount: this.state.toDoCount + 1
      });
    }
  }
  handleDeleteButtonClick(toDoNum) {
    // Building a function that handles delete button click
    console.log(toDoNum);
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
          handleDeleteButtonClick={this.handleDeleteButtonClick}
        />
      </div>
    );
  }
}

class ToDoListView extends Component {
  render() {
    const toDoListStyle = {
      width: "100%"
    }
    return (
      <div style={toDoListStyle}>
        {this.props.toDoList.map((toDo, index) => 
          <ToDo 
            key={index} 
            toDoNum={index}
            toDo={toDo}
            handleDeleteButtonClick = {this.props.handleDeleteButtonClick}
          />
        )}
      </div>
    );
  }
}

class ToDo extends Component {
  render() {
    const toDoStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
    return (
      <div style={toDoStyle}>
        {this.props.toDo.title}
        <img 
          // Trying to get the delete button event into an onClick event.
          onClick={this.props.handleDeleteButtonClick(this.props.toDo.toDoNum)} 
          src={iconDelete} 
          alt="delete"
        />
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
        <label htmlFor="newToDoInput">New ToDo:</label>
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
