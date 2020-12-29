import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "white",
  },
  buttonsGroup: {
    marginLeft: "auto",
  },
  button: {
    width: theme.spacing(17),
    marginRight: theme.spacing(2),
  },
  moneyIcon: {
    color: "#FFE600",
    marginRight: theme.spacing(1),
  },
}));
