import { DriveEta } from "@material-ui/icons";
import React from "react";
import { useStyles } from "./VehicleIcon.style";

export const VehicleIcon: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DriveEta fontSize="large" />
    </div>
  );
};
