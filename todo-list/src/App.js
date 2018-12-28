import React, { Component } from 'react';
import ToDoInput from './components/ToDoInput';
import ToDoListView from './components/ToDoListView';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newToDoInput: '',
      toDoList: [],
      toDoCount: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNewTodoKeyPress = this.handleNewTodoKeyPress.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      newToDoInput: e.target.value,
    });
  }

  handleNewTodoKeyPress(e) {
    if (e.keyCode === 13) {
      // Improving the data structure for the Todos
      this.state.toDoList.push({
        title: this.state.newToDoInput,
        toDoNum: this.state.toDoCount + 1,
      });
      this.setState(prevState => ({
        newToDoInput: '',
        toDoCount: prevState.toDoCount + 1,
      }));
    }
  }

  /*   handleDeleteButtonClick(toDoNum) {
    // Building a function that handles delete button click
    console.log(toDoNum);
  } */

  render() {
    return (
      <div className="App">
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

export default App;
