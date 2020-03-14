import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  drawerTitle: {
    textAlign: "center",
    padding: "8px 0"
  }
}));

export function SideMenu(props) {
  const classes = useStyles();
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
      <Typography variant="h5" className={classes.drawerTitle}>
        Categories
      </Typography>
      <List className={classes.root}>
        {props.categories.map(value => {
          const labelId = `checkbox-list-label-${value.id}`;

          return (
            <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value.id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
