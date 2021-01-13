import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "table",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
    },
    center: {
      display: "table-cell",
      verticalAlign: "middle",
    },
    content: {
      width: "30%",
      margin: "auto",
    },
  })
);
