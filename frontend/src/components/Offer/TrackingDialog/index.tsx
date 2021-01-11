import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./TrackingDialog.style";
import { State, Status } from "../../../../../backend/src/status/status";
import { useDispatch } from "react-redux";
import { setOfferStatus } from "../../../features/offers/offersSlice";

export interface TrackingDialogProps {
  offerId: string;
  role: "customer" | "provider";
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
  offerId,
  role,
  tracking,
  open,
  onClose,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState(
    tracking.text ? tracking.text.trim() : ""
  );
  const [trackingState, setTrackingState] = React.useState<State>(
    tracking.state
  );

  const activeStep = getStepByState(tracking.state);

  const getStatusLabel = (n: number) => {
    switch (n) {
      case 0:
        return "Bereit!";
      case 1:
        return "Auf dem Weg!";
      case 2:
        return "Fertig!";
      default:
        return "";
    }
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingState(event.target.value as State);
  };

  const handleSetStatus = () => {
    dispatch(setOfferStatus(offerId, trackingState, message.trim()));
    onClose();
  };

  const handleClose = () => {
    setMessage(tracking.text ? tracking.text.trim() : "");
    setTrackingState(tracking.state);
    onClose();
  };

  const renderCustomerContent = () => {
    return (
      <>
        <Stepper alternativeLabel activeStep={activeStep}>
          <Step>
            <StepLabel>{activeStep === 0 ? getStatusLabel(0) : ""}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{activeStep === 1 ? getStatusLabel(1) : ""}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{activeStep === 2 ? getStatusLabel(2) : ""}</StepLabel>
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
      </>
    );
  };

  const renderProviderContent = () => {
    return (
      <>
        <RadioGroup value={trackingState} onChange={handleStateChange}>
          <FormControlLabel
            value="Waiting"
            control={<Radio />}
            label="Bereit"
          />
          <FormControlLabel
            value="InProgress"
            control={<Radio />}
            label="Auf dem Weg"
          />
          <FormControlLabel
            value="Delivered"
            control={<Radio />}
            label="Fertig"
          />
        </RadioGroup>
        <Box mt={3}>
          <TextField
            variant="outlined"
            label="Nachricht:"
            fullWidth
            value={message}
            onChange={handleMessageChange}
          ></TextField>
        </Box>
      </>
    );
  };

  return (
    <Dialog
      onClick={(event) => event.stopPropagation()}
      open={open}
      fullWidth
      classes={{
        paper: classes.paper,
      }}
    >
      <DialogTitle>Tracking-Status</DialogTitle>
      <DialogContent>
        {role === "customer"
          ? renderCustomerContent()
          : renderProviderContent()}
      </DialogContent>
      <DialogActions>
        {role === "provider" && (
          <Button color="primary" variant="outlined" onClick={handleSetStatus}>
            Status aktualisieren
          </Button>
        )}
        <Button onClick={handleClose} color="primary">
          Schließen
        </Button>
      </DialogActions>
    </Dialog>
  );
};
