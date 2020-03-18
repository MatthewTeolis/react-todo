import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  OutlinedInput,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Api } from "../../services/api";

export function Register(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const register = () => {
    Api.register(state.email, state.password, state.firstName, state.lastName).then(response => {
      if (response.status === 201) {
        props.updateToken(response.data.token);
        props.history.push("/");
      }
    });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" id="main-container">
      <Paper elevation={3} style={{ padding: "32px" }}>
        <Typography variant="h4">Sign up</Typography>
        <Box display="flex" flexDirection="column" height="280px" justifyContent="space-between" my={"32px"}>
          <FormControl variant="outlined">
            <InputLabel>Email</InputLabel>
            <OutlinedInput type="text" value={state.email} onChange={handleChange("email")} labelWidth={70} />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={state.showPassword ? "text" : "password"}
              value={state.password}
              onChange={handleChange("password")}
              labelWidth={70}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel>First Name</InputLabel>
            <OutlinedInput type="text" value={state.firstName} onChange={handleChange("firstName")} labelWidth={70} />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel>Last Name</InputLabel>
            <OutlinedInput type="text" value={state.lastName} onChange={handleChange("lastName")} labelWidth={70} />
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box mb="16px">
            Already have an account? <Link to="/login">Sign In</Link>
          </Box>
          <Button variant="contained" color="primary" onClick={register}>
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
