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
import { ConfirmDialog } from "../ConfirmDialog";

export interface CustomCardProps {
  buttonText: string;
  heading: string;
  content: any;
  event: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  headingProps?: TypographyProps;
  confirmText?: string;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  buttonText,
  content,
  heading,
  event,
  headingProps,
  confirmText,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = (
    clickEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (confirmText) {
      setOpen(true);
    } else {
      event(clickEvent);
    }
  };

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
          onClick={handleClick}
          fullWidth
          variant="contained"
          className={classes.button}
          color="primary"
        >
          {buttonText}
        </Button>
      </CardActions>
      {confirmText && (
        <ConfirmDialog
          open={open}
          text={confirmText}
          onClose={() => setOpen(false)}
          action={() => event()}
        />
      )}
    </Card>
  );
};
