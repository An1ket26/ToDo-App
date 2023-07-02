import { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";
import { getActions } from "../store/actions/UserAction";
import {connect} from "react-redux";

const SignIn=({register})=> {
  const history=useNavigate();
  const [validate,setValidate]=useState(false);
  const [mail,setMail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");


  useEffect(()=>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const etest=  emailPattern.test(mail);
    const ptest =password.length > 5 && password.length < 13;
    const utest=username.length > 5 && username.length < 20;
    setValidate(etest && ptest && utest)
  },[mail,password,username,setValidate])

  const handleMail=(e)=>{
    setMail(e.target.value);
  }
  const handlePassword=(e)=>{
    setPassword(e.target.value);
  }
  const handleUsername=(e)=>{
    setUsername(e.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
      const UserDetails={
        username,
        mail,
        password
      }
      register(UserDetails,history);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="text"
            id="name"
            autoComplete="name"
            autoFocus
            onChange={handleUsername}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleMail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validate}
          >
            Sign Up
          </Button>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
        </Box>
      </Box>
    </Container>
  );
}

const mapActionsToProps=(dispatch)=>{
  return{
    ...getActions(dispatch)
  }
}

export default connect(null,mapActionsToProps)(SignIn);