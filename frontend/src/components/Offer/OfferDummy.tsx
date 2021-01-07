import React from "react";
import { ListItem, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./Offer.style";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

export interface OfferDummyProps {
  show: string;
}

export const OfferDummy: React.FC<OfferDummyProps> = ({ show }) => {
  const classes = useStyles();
  const displayText = show === "offers" ? "s Angebot" : " Anfrage";
  return (
    <ListItem className={classes.root} button>
      <Paper className={classes.dummy}>
        <Typography className={classes.text}>
          <AddBoxOutlinedIcon className={classes.addIcon} />{" "}
          {`Neue${displayText} hinzufügen`}
        </Typography>
      </Paper>
    </ListItem>
  );
};
