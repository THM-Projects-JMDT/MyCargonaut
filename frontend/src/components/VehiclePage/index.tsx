import { Box, Grid, IconButton, List, ListItem } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React from "react";
import { Vehicle } from "./Vehicle";

export const VehiclePage: React.FC = () => {
  // TODO: retrieve vehicles of logged in user
  const vehicles = [
    {
      manufacturer: "Toyota",
      model: "Estima",
      manufactureYear: 2000,
      seats: 7,
      storageSpace: 400,
    },
    {
      manufacturer: "VW",
      model: "Golf",
      manufactureYear: 2010,
      seats: 4,
      storageSpace: 300,
    },
  ];

  return (
    <Box mt={2}>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={1}>
          <IconButton color="primary">
            <AddCircle fontSize="large"></AddCircle>
          </IconButton>
        </Grid>
        <Grid item xs={9} />
        <Grid item xs={2} />
        <Grid item xs={8}>
          <List>
            {vehicles.map((v) => (
              <ListItem>
                <Vehicle
                  manufacturer={v.manufacturer}
                  model={v.model}
                  manufactureYear={v.manufactureYear}
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
