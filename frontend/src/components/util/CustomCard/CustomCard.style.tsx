import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      height: "50px",
    },
    card: {
      borderRadius: "10px",
    },
    button: {
      borderRadius: "0 0 10px 10px",
      backgroundColor: "#005b52",
      color: "white",
      height: "100%",
      fontSize: "18px",
    },
  })
);
