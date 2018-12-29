import React from 'react';
import propTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  IconButton, ListItem, ListItemSecondaryAction, Checkbox, Input,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import '../components-css/ToDoView.css';

// theme is an optional parameter for this function
const styles = () => ({
  noPadding: {
    padding: 0,
  },
});

class ToDoView extends React.Component {
  static propTypes = {
    toDo: propTypes.object.isRequired,
    classes: propTypes.object.isRequired,
    deleteToDo: propTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    this.props.deleteToDo(this.props.toDo.toDoNum);
  }

  render() {
    return (
      <div className="ToDoView">
        <ListItem>
          <Checkbox className={this.props.classes.noPadding} />
          <Input
            value={this.props.toDo.title}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={this.handleDeleteClick}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(ToDoView);
