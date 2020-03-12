import React, { useState } from "react";
import { Box, Paper, Button, styled, OutlinedInput, InputLabel, FormControl, Typography } from "@material-ui/core";
import "./login.css";
import { Link } from "react-router-dom";

let NoStyleLink = styled(Link)({
  textDecoration: "none",
  color: "inherit"
});

export function Login() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = prop => event => {
    setState({ ...state, [prop]: event.target.value });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" id="main-container">
      <Paper elevation={3} style={{ padding: "32px" }}>
        <Typography variant="h4">Sign in</Typography>
        <Box display="flex" flexDirection="column" height="130px" justifyContent="space-between" my={"32px"}>
          <FormControl variant="outlined">
            <InputLabel>Email</InputLabel>
            <OutlinedInput type="text" value={state.email} onChange={handleChange("email")} labelWidth={70} />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput type="password" value={state.password} onChange={handleChange("password")} labelWidth={70} />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" color="primary">
            <NoStyleLink to="/register">Register</NoStyleLink>
          </Button>
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
