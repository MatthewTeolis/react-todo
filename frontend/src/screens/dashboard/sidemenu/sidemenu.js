import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { AppContext } from "../../../contexts/appContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  drawerTitle: {
    padding: "16px 16px 8px",
    color: "grey"
  }
}));

export function SideMenu() {
  const classes = useStyles();

  const appContext = useContext(AppContext);

  const [checked, setChecked] = useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Typography className={classes.drawerTitle}>Categories</Typography>
      <List className={classes.root}>
        {appContext.categories.map(category => {
          const labelId = `checkbox-list-label-${category.id}`;

          return (
            <ListItem key={category.id} role={undefined} dense button onClick={handleToggle(category.id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(category.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={category.name} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
