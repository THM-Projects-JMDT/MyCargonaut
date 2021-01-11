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
import { useDispatch } from "react-redux";
import { Stars } from "../../../../../backend/src/rating/rating";
import { rateRequest } from "../../../features/requests/requestsSlice";
import { useStyles } from "./RatingDialog.style";

export interface RatingDialogProps {
  open: boolean;
  username: string;
  offerId: string;
  onClose: () => void;
}

export const RatingDialog: React.FC<RatingDialogProps> = ({
  open,
  username,
  offerId,
  onClose,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rating, setRating] = React.useState<Stars>(0);

  // TODO: prevent user from rating more than once
  const handleConfirm = () => {
    dispatch(rateRequest(offerId, rating));
    onClose();
  };

  const handleChange = (event: any, value: number | null) => {
    if (value && value >= 0 && value <= 5) {
      setRating(value as Stars);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Bewertung für {username}:</DialogTitle>
      <Divider />
      <DialogContent className={classes.content}>
        <Rating name="rating" value={rating} onChange={handleChange} />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="primary" data-testid="rating">
          Schließen
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Bestätigen
        </Button>
      </DialogActions>
    </Dialog>
  );
};
