import Button, { ButtonProps } from "@material-ui/core/Button";
import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      color: "#0085FF",
      "&:hover": {
        background: "unset",
      },
      fontSize: "18px",
      padding: 0,
    },
  })
);

export const LinkButton: React.FC<ButtonProps> = (props) => {
  const classes = useStyles();
  return (
    <Button
      {...props}
      disableElevation
      disableFocusRipple
      disableRipple
      className={classes.root}
    />
  );
};
