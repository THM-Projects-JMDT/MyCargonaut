import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  loadingBox: {
    textAlign: "center",
  },
  row: {
    display: "grid",
    gridAutoFlow: "row",
    gridTemplateRows: "50% 50%",
    height: "calc(100vh - 68px)",
  },
  column: {
    display: "grid",
    gridAutoFlow: "row",
    gridTemplateRows: "max-content auto",
    overflow: "auto",
    margin: "10px",
  },
  list: {
    overflow: "auto",
  },
  box: {
    margin: "20px",
  },
  subheader: {
    backgroundColor: "white",
  },
  filterLabel: {
    marginTop: theme.spacing(5),
  },
  filterTextFieldGroup: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  filterTextField: {
    marginRight: theme.spacing(3),
    width: theme.spacing(24),
  },
  filterButton: {
    width: theme.spacing(18),
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
  },
}));
