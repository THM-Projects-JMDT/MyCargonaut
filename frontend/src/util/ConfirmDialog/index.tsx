import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
} from "@material-ui/core";
import React from "react";

export interface ConfirmDialogProps {
  text: string;
  action: () => void;
  open: boolean;
  onClose: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  text,
  action,
  open,
  onClose,
}) => {
  const handleConfirm = () => {
    action();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Box m={3}>{text}</Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button color="primary" variant="contained" onClick={handleConfirm}>
          Bestätigen
        </Button>
        <Button variant="contained" onClick={onClose}>
          Abbrechen
        </Button>
      </DialogActions>
    </Dialog>
  );
};
