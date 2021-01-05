import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./TrackingDialog.style";
import { TrackingDetails } from "../../../model/TrackingDetails";

export interface TrackingDialogProps {
  tracking: TrackingDetails;
  open: boolean;
  onClose: () => void;
}

export const getStepByState = (trackingState: string) => {
  switch (trackingState) {
    case "waiting":
      return 0;
    case "inProgress":
      return 1;
    case "delivered":
      return 2;
  }
};

export const TrackingDialog: React.FC<TrackingDialogProps> = ({
  tracking,
  open,
  onClose,
}) => {
  const classes = useStyles();
  const activeStep = getStepByState(tracking.state);

  const handleOutsideClick = (event: any) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <div onClick={handleOutsideClick}>
      <Dialog
        open={open}
        fullWidth
        classes={{
          paper: classes.paper,
        }}
      >
        <DialogTitle>Tracking-Status</DialogTitle>
        <DialogContent>
          <Stepper alternativeLabel activeStep={activeStep}>
            <Step>
              <StepLabel>{activeStep === 0 ? "Bereit!" : ""}</StepLabel>
            </Step>
            <Step>
              <StepLabel>{activeStep === 1 ? "Auf dem Weg!" : ""}</StepLabel>
            </Step>
            <Step>
              <StepLabel>{activeStep === 2 ? "Fertig!" : ""}</StepLabel>
            </Step>
          </Stepper>
          {tracking.lastMessage && (
            <div className={classes.message}>
              <Typography variant="subtitle2">Letztes Update:</Typography>
              <Typography className={classes.date} variant="subtitle1">
                <i>{tracking.lastMessageDate?.toLocaleDateString() + " "}</i>
                <i>
                  {tracking.lastMessageDate?.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </i>
              </Typography>
              <Typography>
                <i>{tracking.lastMessage}</i>
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
