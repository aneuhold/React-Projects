import React from 'react';
import propTypes from 'prop-types';
import { List } from '@material-ui/core';
import ToDoView from './ToDoView';
import '../components-css/ToDoListView.css';

const ToDoListView = props => (
  <div className="ToDoListView">
    <List disablePadding dense>
      {props.toDoList.map((toDo, index) => (
        <ToDoView
          key={toDo.toDoNum}
          toDoNum={index}
          toDo={toDo}
          deleteToDo={props.deleteToDo}
        />
      ))}
    </List>
  </div>
);

ToDoListView.propTypes = {
  toDoList: propTypes.array.isRequired,
  deleteToDo: propTypes.func.isRequired,
};

export default ToDoListView;
