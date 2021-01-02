import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  date: {
    color: "#707070",
  },
  message: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: "#ededed",
  },
}));
