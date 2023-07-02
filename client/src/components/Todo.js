import * as React from 'react';
import {
    ListItem,
    Checkbox,
    IconButton,
    ListItemText,
    ListItemSecondaryAction,
  } from '@mui/material';
  import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
  import EditIcon from '@mui/icons-material/Edit';

const Todo = (props) => {
  return (
    <ListItem divider={props.divider}>
    <Checkbox
      onClick={props.onCheckBoxToggle}
      checked={props.isCompleted}
      disableRipple
    />
    <ListItemText primary={props.content} />
    <ListItemSecondaryAction>
    <IconButton aria-label="Update Todo" onClick={()=>props.updateTodo(props.id,props.content)}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Delete Todo" onClick={props.onDelete}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
  )
}



export default Todo;