import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import { inputFieldsPassword } from "../../assets/inputFields";
import { InputForm } from "../../util/InputForm";
import { useStyles } from "./Profile.style";
import CloseIcon from "@material-ui/icons/Close";

export interface PasswordDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PasswordDialog: React.FC<PasswordDialogProps> = ({
  open,
  setOpen,
}) => {
  const classes = useStyles();
  const handleClose = () => {
    //TODO safe password
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      classes={{
        paper: classes.paper,
      }}
      onClose={handleClose}
    >
      <DialogTitle>
        <Typography variant="h5" color="primary">
          Passwört ändern
        </Typography>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <InputForm inputFields={inputFieldsPassword} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
};
