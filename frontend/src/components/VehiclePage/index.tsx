import { Box, Grid, IconButton, List, ListItem } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../features/rootReducer";
import { fetchVehicles } from "../../features/vehicles/vehiclesSlice";
import { routes } from "../../routes";
import { Vehicle } from "./Vehicle";

export const VehiclePage: React.FC = () => {
  // TODO: retrieve vehicles of logged in user
  const dispatch = useDispatch();
  const history = useHistory();
  const vehicles = useSelector((state: RootState) => state.vehicles.vehicles);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleClick = () => {
    history.push(routes.addVehicle.path);
  };

  return (
    <Box mt={2}>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={1}>
          <IconButton color="primary" onClick={handleClick}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={9} />
        <Grid item xs={2} />
        <Grid item xs={8}>
          <List>
            {vehicles?.map((v, idx) => (
              <ListItem key={idx}>
                <Vehicle
                  id={v._id}
                  manufacturer={v.manufacturer}
                  model={v.model}
                  manufactureYear={new Date(v.manufactureYear)}
                  seats={v.seats}
                  storageSpace={v.storageSpace}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Box>
  );
};
