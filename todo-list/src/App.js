import React, { Component } from 'react';
import ToDoInput from './components/ToDoInput';
import ToDoListView from './components/ToDoListView';
import './App.css';
import { Button } from '@material-ui/core';

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
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      newToDoInput: e.target.value,
    });
  }

  handleNewTodoKeyPress(e) {
    if (e.keyCode === 13) {
      this.state.toDoList.push({
        title: this.state.newToDoInput,
        toDoNum: this.state.toDoCount,
      });
      this.setState(prevState => ({
        newToDoInput: '',
        toDoCount: prevState.toDoCount + 1,
      }));
    }
  }

  deleteToDo(toDoNum) {
    this.state.toDoList.splice(toDoNum, 1);
    this.setState(prevState => ({
      toDoList: prevState.toDoList.splice(toDoNum, 1),
    }));
  }

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
          deleteToDo={this.deleteToDo}
        />
        <Button href="/.netlify/functions/getDBConnection">Call the lambda function!</Button>
      </div>
    );
  }
}

export default App;
