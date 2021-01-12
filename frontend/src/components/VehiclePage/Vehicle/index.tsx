import { Card, Grid, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteVehicle } from "../../../features/vehicles/vehiclesSlice";
import { ConfirmDialog } from "../../../util/ConfirmDialog";
import { GridElement } from "../../../util/GridElement";
import { VehicleIcon } from "../../../util/VehicleIcon";
import { useStyles } from "./Vehicle.style";

export interface VehicleProps {
  id: string;
  manufacturer: string;
  model: string;
  manufactureYear: Date;
  seats: number;
  storageSpace: number;
}

export const Vehicle: React.FC<VehicleProps> = ({
  manufacturer,
  model,
  manufactureYear,
  seats,
  storageSpace,
  id,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    dispatch(deleteVehicle(id));
  };

  return (
    <Card className={classes.root}>
      <Grid container alignItems="center" className={classes.grid}>
        <div style={{ marginLeft: 40, marginRight: 30 }}>
          <VehicleIcon />
        </div>
        <GridElement header="Hersteller">
          <Typography>{manufacturer}</Typography>
        </GridElement>
        <GridElement header="Modell">
          <Typography>{model}</Typography>
        </GridElement>
        <GridElement header="Baujahr">
          <Typography>{manufactureYear.getFullYear()}</Typography>
        </GridElement>
        <GridElement header="Freie Sitze">
          <Typography>{seats}</Typography>
        </GridElement>
        <GridElement header="Stauraum">
          <Typography>{storageSpace + "l"}</Typography>
        </GridElement>
        <GridElement>
          <div className={classes.leftBorder}>
            <IconButton
              className={classes.deleteButton}
              onClick={() => setOpen(true)}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
            <ConfirmDialog
              open={open}
              onClose={() => setOpen(false)}
              text="Soll das Fahrzeug wirklich gelöscht werden?"
              action={handleDelete}
            />
          </div>
        </GridElement>
      </Grid>
    </Card>
  );
};
