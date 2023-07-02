import React,{useEffect,useState} from 'react'
import { getActions } from '../store/actions/taskAction'
import { connect } from 'react-redux'
import Todo from './Todo'
import { List, Paper} from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';


const TodoList = ({getTodo,Tasks,deleteTodo,completeTodo,updateHandler}) => {
  const [taskChoice,setTaskChoice]=useState("all");
  const [todos,setTodo]=useState([]);
  useEffect(()=>{
    getTodo();
    setTodo(Tasks);
  },[getTodo,setTodo,Tasks])
 
  const allHandler=()=>{
    setTaskChoice("all");
    setTodo(Tasks);
  }
  const activeHandler=()=>{
    setTaskChoice("active");
    setTodo(Tasks.filter((task)=>task.isCompleted===false))
  }
  const completedHandler=()=>{
    setTaskChoice("completed")
    setTodo(Tasks.filter((task)=>task.isCompleted!==false))
  }

  const deleteHandler=(id)=>{
    deleteTodo({id})
  }
  const completeHandler=(id)=>{
    completeTodo({id});
  }
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
    <ButtonGroup variant="contained" aria-label="text button group" sx={{marginTop:"2%",marginBottom:"2%"}}>
        <Button color={taskChoice==="all"?"success":"primary"} onClick={allHandler}>All</Button>
        <Button color={taskChoice==="active"?"success":"primary"} onClick={activeHandler} >Active</Button>
        <Button color={taskChoice==="completed"?"success":"primary"} onClick={completedHandler} >Completed</Button>
      </ButtonGroup></Box>
      {todos.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {todos.map((todo, idx) => (
            <Todo
              {...todo}
              key={`TodoItem.${idx}`}
              divider={idx !== todos.length - 1}
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