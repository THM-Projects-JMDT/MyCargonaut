import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    width: "25%",
    height: "45%",
    top: "55%",
    left: "75%",
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  chatBoxCard: {
    height: "75%",
    marginBottom: 0,
    paddingBottom: 0,
    overflow: "auto",
    display: "flex",
    flexDirection: "column-reverse",
  },
  sendButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  closeGridRow: {
    borderRadius: theme.spacing(1),
  },
  loadCircle: {
    textAlign: "center",
  },
}));
