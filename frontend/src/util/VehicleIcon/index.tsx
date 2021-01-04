import DriveEtaIcon from "@material-ui/icons/DriveEta";
import React from "react";
import { useStyles } from "./VehicleIcon.style";

export const VehicleIcon: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DriveEtaIcon fontSize="large" />
    </div>
  );
};
