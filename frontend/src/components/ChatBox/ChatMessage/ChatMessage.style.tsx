import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  sender: {
    maxWidth: "40%",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    backGroundColor: "red",
  },
  reciever: {
    border: "1px solid b0b0b0",
    maxWidth: "40%",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
  senderName: {
    color: "#a0a0a0",
  },
}));
