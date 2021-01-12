import React from "react";
import { ListItem, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./../../Offer/Offer.style";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes";

export const VehicleDummy: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(routes.addVehicle.path);
  };

  return (
    <ListItem className={classes.root} button onClick={handleClick}>
      <Paper className={classes.dummy}>
        <Typography className={classes.text}>
          <AddBoxOutlinedIcon className={classes.addIcon} />{" "}
          {`Neues Fahrzeug hinzufügen`}
        </Typography>
      </Paper>
    </ListItem>
  );
};
