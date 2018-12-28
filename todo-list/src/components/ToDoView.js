import React from 'react';
import propTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import '../components-css/ToDoView.css';

const ToDoView = props => (
  <div className="ToDoView">
    {props.toDo.title}
    <IconButton>
      <DeleteIcon />
    </IconButton>
  </div>
);

ToDoView.propTypes = {
  toDo: propTypes.object.isRequired,
};

export default ToDoView;
