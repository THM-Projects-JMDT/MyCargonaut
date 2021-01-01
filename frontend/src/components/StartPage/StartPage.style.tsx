import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "calc(100% - 52px)",
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      position: "absolute",
    },
  })
);
