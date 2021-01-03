import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  grid: {
    textAlign: "center",
    height: theme.spacing(13),
  },
  root: {
    width: theme.spacing(130),
    borderRadius: "10px !important",
    boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
  },
}));
