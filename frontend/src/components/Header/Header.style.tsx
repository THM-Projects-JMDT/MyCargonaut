import { makeStyles } from "@material-ui/core";

const headerHeight = "52px";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "white",
    height: headerHeight,
    zIndex: 2,
  },
  toolbar: {
    minHeight: headerHeight,
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
  logo: {
    height: headerHeight,
  },
  avatar: {
    padding: 0,
  },
  selected: {
    fontSize: "18px",
    fontWeight: "bold",
  },
}));
