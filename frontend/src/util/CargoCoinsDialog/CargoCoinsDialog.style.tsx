import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateAreas: `
  "card1 card2 card3"
  `,
    gap: "50px",
    margin: "50px",
    marginTop: 0,
  },
  card1: {
    gridArea: "card1",
  },
  card2: {
    gridArea: "card2",
  },
  card3: {
    gridArea: "card3",
  },
  cardContent: {
    display: "grid",
    justifyContent: "center",
  },
  icon: {
    fontSize: "100px",
    margin: "50px 0",
  },
  old: {
    textDecoration: "line-through",
    color: theme.palette.error.main,
  },
  paper: {
    borderRadius: "15px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(3),
    top: theme.spacing(3),
    color: theme.palette.grey[500],
  },
  heading: {
    marginTop: "15px",
    marginBottom: "15px",
  },
}));
