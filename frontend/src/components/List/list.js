import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Paper,
  Box,
  makeStyles,
  IconButton,
  InputBase,
  ListItem,
  List as MatList,
  Checkbox,
  FormControl,
  Menu,
  MenuItem,
  Button
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Api } from "../../services/api";
import { AppContext } from "../../contexts/appContext";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    flexDirection: "column",
    width: 380
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    marginLeft: "8px",
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  footer: {
    padding: "16px"
  },
  footerButtonMargin: {
    marginRight: "8px"
  }
}));

export function List(props) {
  const appContext = useContext(AppContext);

  const list = props.list;

  const classes = useStyles();

  const firstLoadRef = useRef(false);

  const [title, setTitle] = useState(list.title);
  const [data, setData] = useState(list.data);

  const menuOptions = ["Save", "Delete"];
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const [updateTimeout, setUpdateTimeout] = useState(null);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };

  const handleItemChange = index => event => {
    const newData = [...data];
    newData[index].value = event.target.value;
    setData(newData);
  };

  const updateWithServer = () => {
    clearTimeout(updateTimeout);
    setUpdateTimeout(
      setTimeout(() => {
        Api.updateList(list.id, title, data).then(response => {
          console.log(response);
        });
      }, 1500)
    );
  };

  useEffect(() => {
    if (firstLoadRef.current) {
      updateWithServer();
    } else {
      firstLoadRef.current = true;
    }
  }, [title, data]);

  const handleCheckbox = index => event => {
    const newData = [...data];
    newData[index].checked = event.target.checked;
    setData(newData);
  };

  const handleKeyDown = index => event => {
    if (event.keyCode === 8 && event.target.value === "") {
      event.preventDefault();
      console.log(index);
      const newData = [...data];
      newData.forEach((element, i) => {
        if (i === index - 1) {
          element.focused = true;
        } else {
          element.focused = false;
        }
      });
      newData.splice(index, 1);
      setData(newData);
    } else if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      const newData = [...data];
      newData.forEach(element => {
        element.focused = false;
      });
      newData.push({ focused: true });
      setData(newData);
    }
  };

  const handleMenuSave = () => {
    clearTimeout(updateTimeout);
    Api.updateList(list.id, title, data).then(response => {
      console.log(response);
    });
    handleMenuClose();
  };

  const handleMenuDelete = () => {
    Api.deleteList(list.id).then(response => {
      if (response.ok) {
        appContext.removeList(list.id);
      }
    });
    handleMenuClose();
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <FormControl variant="outlined">
          <InputBase className={classes.input} placeholder="Title" multiline value={title} onChange={handleTitle} />
        </FormControl>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              width: 100
            }
          }}
        >
          <MenuItem onClick={handleMenuSave}>Save</MenuItem>
          <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
        </Menu>
      </div>
      <MatList dense>
        {data.map((item, index) => {
          return (
            <ListItem key={`listitem-${index}`}>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked={item.checked || false}
                onClick={handleCheckbox(index)}
              />
              <InputBase
                type="text"
                className={classes.input}
                placeholder="List item"
                multiline
                value={item.value || ""}
                onChange={handleItemChange(index)}
                onKeyDown={handleKeyDown(index)}
                autoFocus={item.focused}
              />
            </ListItem>
          );
        })}
      </MatList>
      <Box display="flex" className={classes.footer}>
        <Button variant="outlined" size="small" color="primary" className={classes.footerButtonMargin}>
          Active
        </Button>
        <Button size="small" className={classes.footerButtonMargin}>
          Completed
        </Button>
      </Box>
    </Paper>
  );
}
