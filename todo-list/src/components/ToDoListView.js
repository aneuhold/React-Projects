import React from 'react';
import propTypes from 'prop-types';
import ToDoView from './ToDoView';
import '../components-css/ToDoListView.css';

const ToDoListView = props => (
  <div className="ToDoListView">
    {props.toDoList.map((toDo, index) => (
      <ToDoView
        key={toDo.name}
        toDoNum={index}
        toDo={toDo}
        handleDeleteButtonClick={props.handleDeleteButtonClick}
      />
    ))}
  </div>
);

ToDoListView.propTypes = {
  toDoList: propTypes.array.isRequired,
  handleDeleteButtonClick: propTypes.func.isRequired,
};

export default ToDoListView;
