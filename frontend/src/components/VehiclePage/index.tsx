import { Box, Grid, List, ListItem } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import { fetchVehicles } from "../../features/vehicles/vehiclesSlice";
import { Vehicle } from "./Vehicle";
import { VehicleDummy } from "./Vehicle/VehicleDummy";

export const VehiclePage: React.FC = () => {
  // TODO: retrieve vehicles of logged in user
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicles.vehicles);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <Box mt={2}>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <List>
            <VehicleDummy />
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
