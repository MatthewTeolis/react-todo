import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { List } from "../../../components/List/list";

const useStyles = makeStyles({
  root: {
    paddingLeft: "12px"
  }
});

export function CardContainer(props) {
  const lists = props.lists;
  const classes = useStyles();

  return (
    <Grid container justify="flex-start" spacing={3} className={classes.root}>
      {lists.map(list => (
        <Grid key={`list-${list.id}`} item>
          <List list={list}></List>
        </Grid>
      ))}
    </Grid>
  );
}
