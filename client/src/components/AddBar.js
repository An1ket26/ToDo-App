import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { getActions } from '../store/actions/taskAction'
import { connect } from 'react-redux'



const Container = styled("div")({
  height: "4.5vh",
  marginTop: "5%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const AddBar = ({addTodo,isEdit,prevContent,setIsEdit,setPrevContent,id,setId,updateTodo}) => {
  const [task, setTask] = useState("");
  const [validate,setValidate]=useState(true);
  useEffect(()=>{
    setTask(prevContent)
  },[prevContent])
  const handleTask = (e) => {
    const tmp=e.target.value;
    setTask(e.target.value);
    if(tmp.trim().length>0)
    {
      setValidate(false);
    }
    else
    {
      setValidate(true);
    }

  };

  const handleAddTask = (e) => {
    e.preventDefault();
    addTodo({content:task,isCompleted:false});
    setTask("");
  };
  const handleUpdateTask=(e)=>{
    e.preventDefault();
    // console.log("update");
    updateTodo({id:id,content:task})
    setIsEdit(false);
    setPrevContent("");
    setId("");
    setTask("");
  }
  return (
    <Container>
      <TextField
        id='outlined-basic'
        label='Tasks'
        variant='outlined'
        size='small'
        sx={{ width: "350px", marginRight: "20px" }}
        value={task}
        onChange={handleTask}
      />
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={isEdit?handleUpdateTask:handleAddTask}
        disabled={validate}
      >
        {isEdit?"Update":"Add"}
      </Button>
    </Container>
  );
};

const mapActionsToProps=(dispatch)=>{
  return {
    ...getActions(dispatch)
  }
}
export default connect(null,mapActionsToProps)(AddBar);
