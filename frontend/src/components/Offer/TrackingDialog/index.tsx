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
import { State, Status } from "../../../../../backend/src/status/status";

export interface TrackingDialogProps {
  tracking: Status;
  open: boolean;
  onClose: () => void;
}

export const getStepByState = (trackingState: State) => {
  switch (trackingState) {
    case "Waiting":
      return 0;
    case "InProgress":
      return 1;
    case "Delivered":
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
          {tracking.text && (
            <div className={classes.message}>
              <Typography variant="subtitle2">Letztes Update:</Typography>
              <Typography>
                <i>{tracking.text}</i>
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
