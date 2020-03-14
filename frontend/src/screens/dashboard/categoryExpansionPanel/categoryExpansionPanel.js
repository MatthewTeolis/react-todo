import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  }
}));

export function CategoryExpansionPanel(props) {
  const classes = useStyles();
  const category = props.category;

  return (
    <ExpansionPanel defaultExpanded={true}>
      <ExpansionPanelSummary
        classes={{ expandIcon: classes.expandIcon, content: classes.expandTitle }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{category.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
          lobortis eget.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export function CategoryExpansionPanels(props) {
  const classes = useStyles();
  const categories = props.categories;

  return (
    <div className={classes.root}>
      {categories.map(element => (
        <CategoryExpansionPanel category={element} />
      ))}
    </div>
  );
}
