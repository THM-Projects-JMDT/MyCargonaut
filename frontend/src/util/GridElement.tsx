import { Grid, Box, Typography } from "@material-ui/core";
import React from "react";

interface GridElementProps {
  header?: string;
}

export const GridElement: React.FC<GridElementProps> = ({
  header,
  children,
}) => {
  return (
    <Grid item xs>
      {header && (
        <Box mb={2}>
          <Typography variant="subtitle2">{header}</Typography>
        </Box>
      )}
      {children}
    </Grid>
  );
};
