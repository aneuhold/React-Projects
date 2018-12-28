import React from 'react';
import propTypes from 'prop-types';
import '../components-css/ToDoView.css';

const ToDoView = props => (
  <div className="ToDoView">
    {props.toDo.title}
  </div>
);

ToDoView.propTypes = {
  toDo: propTypes.object.isRequired,
};

export default ToDoView;
