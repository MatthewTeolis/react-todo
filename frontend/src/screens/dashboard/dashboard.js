import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Drawer, CssBaseline } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import { SideMenu } from "./sidemenu";
import { Api } from "../../services/api";
import { CategoryExpansionPanels } from "./categoryExpansionPanel";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: "16px"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  appTitle: {
    flexGrow: 1
  }
}));

export function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Api.getCategories().then(response => {
      setCategories(response.data);
    });
  }, []);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.removeItem("token");
    Api.updateToken(null);
    props.history.push("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton, open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.appTitle}>
            React Todo
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader} />
        <SideMenu categories={categories} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <CategoryExpansionPanels categories={categories} />
      </main>
    </div>
  );
}
