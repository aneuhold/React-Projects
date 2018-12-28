import React from 'react';
import propTypes from 'prop-types';
import '../components-css/ToDoInput.css';

const ToDoInput = props => (
  <div className="ToDoInput">
    <label htmlFor="newToDoInput">
      <input
        type="text"
        id="newToDoInput"
        name="newToDoInput"
        className="ToDoInput__InputBox"
        value={props.newToDoInput}
        onChange={props.handleInputChange}
        onKeyDown={props.handleNewTodoKeyPress}
      />
      New ToDo:
    </label>
  </div>
);

ToDoInput.propTypes = {
  newToDoInput: propTypes.string.isRequired,
  handleInputChange: propTypes.func.isRequired,
  handleNewTodoKeyPress: propTypes.func.isRequired,
};

export default ToDoInput;
