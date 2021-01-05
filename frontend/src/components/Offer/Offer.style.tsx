import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  moneyIcon: {
    marginLeft: theme.spacing(1),
  },
  accordionDetails: {
    textAlign: "left",
  },
  greenText: {
    color: "green",
  },
  divider: {
    margin: "0 65px",
  },
  paper: {
    borderRadius: "10px !important",
    boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
  },
}));
