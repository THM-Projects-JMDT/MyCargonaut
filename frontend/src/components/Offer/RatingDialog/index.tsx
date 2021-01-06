import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { useStyles } from "./RatingDialog.style";

export interface RatingDialogProps {
  open: boolean;
  username: string;
  onClose: () => void;
}

export const RatingDialog: React.FC<RatingDialogProps> = ({
  open,
  username,
  onClose,
}) => {
  const classes = useStyles();
  const handleRating = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Bewertung für {username}:</DialogTitle>
      <Divider />
      <DialogContent className={classes.content}>
        <Rating />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Schließen
        </Button>
        <Button onClick={handleRating} color="primary">
          Bewerten
        </Button>
      </DialogActions>
    </Dialog>
  );
};
