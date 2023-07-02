import { openAlertMessage } from "./alertActions";

export const authActions = {
    SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions=(dispatch)=>{
    return{
        login:(userDetails,history)=>dispatch(login(userDetails,history)),
        register:(userDetails,history)=>dispatch(register(userDetails,history)),
        setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
    }
}

const setUserDetails = (userDetails) => {
    return {
      type: authActions.SET_USER_DETAILS,
      userDetails,
    };
};

const login=(userDetails,history)=>{
    return async (dispatch)=>{
        const response=await fetch(`http://localhost:5000/api/user/login`,{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(userDetails)
        })
        if(!response.ok)
        {
            const text = await response.text();
            dispatch(openAlertMessage(text));
        }
        else
        {
            const data=await response.json();
            // console.log(data);
            localStorage.setItem("user",JSON.stringify(data.userDetails));
            dispatch(setUserDetails(data.userDetails));
            history("/home");
        }
    }
}

const register=(userDetails,history)=>{
    return async (dispatch)=>{
        const response=await fetch(`http://localhost:5000/api/user/register`,{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(userDetails)
        })
        if(!response.ok)
        {
            const text = await response.text();
            dispatch(openAlertMessage(text));
        }
        else
        {
            const data=await response.json();
            // console.log(data.userDetails);
            const userDetails=data.userDetails;
            localStorage.setItem("user",JSON.stringify(userDetails));
            dispatch(setUserDetails(data.userDetails));
            history("/home");
        }
    }
}
  