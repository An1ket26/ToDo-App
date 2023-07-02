import React,{useEffect} from 'react'
import { getActions } from '../store/actions/taskAction'
import { connect } from 'react-redux'
import Todo from './Todo'
import { List, Paper} from '@mui/material';

const TodoList = ({getTodo,Tasks,deleteTodo,completeTodo,updateHandler}) => {

  const deleteHandler=(id)=>{
    deleteTodo({id})
  }
  const completeHandler=(id)=>{
    completeTodo({id});
  }

  useEffect(()=>{
    getTodo();
  },[getTodo])
  return (
    <>
      {Tasks.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {Tasks.map((todo, idx) => (
            <Todo
              {...todo}
              key={`TodoItem.${idx}`}
              divider={idx !== Tasks.length - 1}
              onDelete={()=>deleteHandler(todo.id)}
              onCheckBoxToggle={()=>completeHandler(todo.id)}
              updateTodo={updateHandler}
            />
          ))}
        </List>
      </Paper>
    )}
    </>
  )
}

const mapActionsToProps=(dispatch)=>{
  return {
    ...getActions(dispatch)
  }
}

const mapStoreToProps=({task})=>{
  return{
    ...task
  }
}

export default connect(mapStoreToProps,mapActionsToProps)(TodoList);