import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
  dummy: {
    borderRadius: "10px !important",
    boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
    width: "100%",
    height: "50px",
    border: "2px dashed #A4A4A4",
    display: "grid",
    alignContent: "center",
  },
  text: {
    display: "flex",
    justifyContent: "center",
    color: "#A4A4A4",
    fontWeight: "bold",
  },
  addIcon: {
    marginRight: "10px",
  },
  trackingCompleted: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    "&:hover": {
      color: theme.palette.success.dark,
      borderColor: theme.palette.success.dark,
      backgroundColor: "rgba(77, 245, 0, 0.04)",
    },
  },
}));
