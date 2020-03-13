import React, { useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Button, makeStyles, Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { SideMenu } from "./sidemenu/sidemenu";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

export function Dashboard(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const toggleDrawer = (side, open) => event => {
  //   if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
  //     return;
  //   }

  //   setState({ ...state, [side]: open });
  // };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            React Todo
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("token");
              props.history.push("/");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={handleClose}>
        <SideMenu />
      </Drawer>
    </>
  );
}
