import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  Button,
  CardActions,
  Typography,
  TypographyProps,
} from "@material-ui/core";
import { useStyles } from "./CustomCard.style";

export interface CustomCardProps {
  buttonText: string;
  heading: string;
  content: any;
  event: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  headingProps?: TypographyProps;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  buttonText,
  content,
  heading,
  event,
  headingProps,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={8}>
      <CardContent>
        <Typography variant="h5" {...headingProps}>
          {heading}
        </Typography>
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
