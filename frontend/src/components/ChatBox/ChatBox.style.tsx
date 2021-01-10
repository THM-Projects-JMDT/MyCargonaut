import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed" /* Sit on top of the page content */,
    width: "25%" /* Full width (cover the whole page) */,
    height: "45%" /* Full height (cover the whole page) */,
    top: "55%",
    left: "75%",
    right: 0,
    bottom: 0,
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
}));
