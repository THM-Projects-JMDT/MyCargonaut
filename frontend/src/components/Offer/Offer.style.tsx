import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  moneyIcon: {
    color: "#FFE600",
    marginRight: theme.spacing(1),
  },
  accordionDetails: {
    textAlign: "left",
  },
  greenText: {
    color: "green",
  },
}));
