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

export function Register() {
  const [state, setState] = useState({
    email: "",
    password: "",
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

  return (
    <Box display="flex" justifyContent="center" alignItems="center" id="main-container">
      <Paper elevation={3} style={{ padding: "32px" }}>
        <Typography variant="h4">Sign up</Typography>
        <Box display="flex" flexDirection="column" height="130px" justifyContent="space-between" my={"32px"}>
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
        </Box>
        <Box display="flex" flexDirection="column">
          <Box mb="16px">
            Already have an account? <Link to="/login">Sign In</Link>
          </Box>
          <Button variant="contained" color="primary">
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
