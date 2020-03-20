import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { AppContext } from "../../../contexts/appContext";
import { Api } from "../../../services/api";

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

  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    let defaultAllCheckedValue = true;
    appContext.categories.forEach(category => {
      if (!category.checked) {
        defaultAllCheckedValue = false;
      }
    });
    setAllChecked(defaultAllCheckedValue);
  }, [appContext]);

  const handleCheckClick = index => event => {
    appContext.toggleCategoryCheck(index);
  };

  const handleAllClicked = event => {
    const checked = !allChecked;
    setAllChecked(checked);
    appContext.setCheckAllCategories(checked);
  };

  const handleDeleteCategory = category => event => {
    event.stopPropagation();
    Api.deleteCategory(category.id).then(response => {
      if (response.ok) {
        Api.getCategories().then(res => {
          const unparsed = res.data;
          unparsed.forEach(c => {
            c.checked = true;
            c.lists.forEach(l => {
              l.data = JSON.parse(l.data);
            });
          });
          appContext.setCategories(unparsed);
        });
      }
    });
  };

  return (
    <>
      <Typography className={classes.drawerTitle}>Categories</Typography>
      <List className={classes.root}>
        <ListItem role={undefined} dense button onClick={handleAllClicked}>
          <ListItemIcon>
            <Checkbox edge="start" checked={allChecked} tabIndex={-1} disableRipple />
          </ListItemIcon>
          <ListItemText primary="All" />
        </ListItem>
        {appContext.categories.map((category, index) => {
          const labelId = `checkbox-list-label-${category.id}`;

          return (
            <ListItem key={category.id} role={undefined} dense button onClick={handleCheckClick(index)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={category.checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={category.name} />
              <IconButton onClick={handleDeleteCategory(category)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
