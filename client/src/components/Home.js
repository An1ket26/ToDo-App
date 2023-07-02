import React,{useEffect,useState} from 'react'
import Header from "./Header";
import AddBar from './AddBar';
import {logout} from "./Authenticate"
import TodoList from './TodoList';
import { getActions } from '../store/actions/UserAction';
import { connect } from 'react-redux';

const Home = ({setUserDetails}) => {
  useEffect(()=>{
    const userDetails=JSON.parse(localStorage.getItem("user"));
    if(!userDetails)
    {
      logout();
    }
    setUserDetails(userDetails);
  },[setUserDetails])
  const [isEdit,setIsEdit]=useState(false);
  const [prevContent,setPrevContent]=useState("");
  const [id,setId]=useState();
  const updateHandler=(id,content)=>{
    setIsEdit(true);
    setPrevContent(content);
    // console.log(id);
    setId(id);
  }

  return (
    <>
    <Header/>
    <AddBar isEdit={isEdit} prevContent={prevContent} setIsEdit={setIsEdit} setPrevContent={setPrevContent} id={id} setId={setId}/>
    <TodoList updateHandler={updateHandler}/>
    </>
  )
}

const mapActionsToProps=(dispatch)=>{
  return {
    ...getActions(dispatch)
  }
}

export default connect(null,mapActionsToProps)(Home);