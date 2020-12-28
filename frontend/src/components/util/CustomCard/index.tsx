import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button, CardActions } from "@material-ui/core";
import { useStyles } from "./CustomCard.style";

export interface CustomCardProps {
  buttonText: string;
  content: any;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  buttonText,
  content,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>{content}</CardContent>
      <CardActions className={classes.root}>
        <Button fullWidth variant="contained" className={classes.button}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};
