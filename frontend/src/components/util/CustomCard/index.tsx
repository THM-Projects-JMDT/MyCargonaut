import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button, CardActions, Typography } from "@material-ui/core";
import { useStyles } from "./CustomCard.style";

export interface CustomCardProps {
  buttonText: string;
  heading: string;
  content: any;
  event: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  buttonText,
  content,
  heading,
  event,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5">{heading}</Typography>
        {content}
      </CardContent>
      <CardActions className={classes.root}>
        <Button
          onClick={event}
          fullWidth
          variant="contained"
          className={classes.button}
          color="primary"
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};
