import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  filterLabel: {
    marginTop: theme.spacing(5),
  },
  filterTextFieldGroup: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  filterTextField: {
    marginRight: theme.spacing(3),
    width: theme.spacing(35),
  },
  filterButton: {
    width: theme.spacing(16),
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
  loadingBox: {
    textAlign: "center",
  },
}));
