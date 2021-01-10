import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {},
  grid: {
    marginTop: theme.spacing(2),
    display: "grid",
    gridTemplateAreas: `
    "profile actions"
    `,
    gridTemplateColumns: "max-content auto",
    gap: "50px",
  },
  input: {
    display: "none",
  },
  avatar: {
    width: "10vw !important",
    height: "10vw !important",
  },
  content: {
    position: "absolute",
  },
  button: {
    minWidth: 0,
    padding: "10px 10px",
  },
  editButton: {
    position: "relative",
    marginTop: "-18px",
    width: "max-content",
    float: "right",
    marginRight: "-18px",
  },
  profile: {
    gridArea: "profile",
    width: "max-content",
  },
  actions: {
    gridArea: "actions",
    display: "grid",
  },
  cargoCoins: {
    display: "grid",
    gridAutoFlow: "column",
    alignItems: "center",
    justifyContent: "left",
  },
  paper: {
    borderRadius: "15px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));
