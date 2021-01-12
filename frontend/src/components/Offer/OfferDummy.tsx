import React from "react";
import { ListItem, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./Offer.style";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { useHistory, useLocation } from "react-router-dom";
import { routes } from "../../routes";

export interface OfferDummyProps {
  show: string;
}

export const OfferDummy: React.FC<OfferDummyProps> = ({ show }) => {
  const classes = useStyles();
  const displayText = show === "offers" ? "s Angebot" : " Anfrage";
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    history.push(
      show === "offers" ? routes.addOffer.path : routes.addRequest.path,
      { from: location.pathname }
    );
  };

  return (
    <ListItem className={classes.root} button onClick={handleClick}>
      <Paper className={classes.dummy}>
        <Typography className={classes.text}>
          <AddBoxOutlinedIcon className={classes.addIcon} />{" "}
          {`Neue${displayText} hinzufügen`}
        </Typography>
      </Paper>
    </ListItem>
  );
};
