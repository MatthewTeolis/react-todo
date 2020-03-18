import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Fab,
  Dialog,
  DialogContent,
  InputBase,
  FormControl,
  TextField,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { CardContainer } from "../cardContainer/cardContainer";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Api } from "../../../services/api";
import { AppContext } from "../../../contexts/appContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  expandIcon: {
    order: -1
  },
  expandTitle: {
    marginLeft: "16px !important"
  },
  fab: {
    margin: "8px"
  }
}));

const CategoryExpansionPanel = props => {
  const classes = useStyles();
  const category = props.category;

  return (
    <ExpansionPanel defaultExpanded={true}>
      <ExpansionPanelSummary
        classes={{ expandIcon: classes.expandIcon, content: classes.expandTitle }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}>{category.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <CardContainer lists={category.lists} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export function CategoryExpansionPanels(props) {
  const classes = useStyles();

  const appContext = useContext(AppContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [newList, setNewList] = useState({
    title: "",
    category_id: null,
    data: []
  });

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewList({
      title: "",
      category_id: null,
      data: []
    });
  };

  const createNewList = event => {
    Api.createNewList(newList.category_id, newList.title, newList.data).then(response => {
      if (response.status === 201) {
        appContext.categories.forEach(category => {
          if (category.id === response.data.category_id) {
            const responseData = response.data;
            responseData.data = JSON.parse(responseData.data);
            category.lists.push(responseData);
          }
        });
        handleDialogClose();
      }
    });
  };

  const handleChange = prop => event => {
    setNewList({ ...newList, [prop]: event.target.value });
  };
  const updateCategoryId = (event, category) => {
    setNewList({ ...newList, category_id: category.id });
  };

  return (
    <div className={classes.root}>
      {appContext.categories.map(category => (
        <CategoryExpansionPanel category={category} key={`category-expansion-panel-${category.id}`} />
      ))}
      <Box display="flex" justifyContent="flex-end">
        <Fab color="primary" aria-label="add" onClick={handleDialogOpen} className={classes.fab}>
          <AddIcon />
        </Fab>
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>
          <FormControl variant="outlined">
            <InputBase
              placeholder="Title"
              multiline
              value={newList.title}
              onChange={handleChange("title")}
              autoFocus={true}
            />
          </FormControl>
          <Autocomplete
            onChange={updateCategoryId}
            options={appContext.categories}
            getOptionLabel={option => option.name}
            style={{ width: 300 }}
            renderInput={params => <TextField {...params} label="Category" variant="outlined" />}
          />
          <Box>
            <Button onClick={handleDialogClose}>Close</Button>
            <Button onClick={createNewList}>Save</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
