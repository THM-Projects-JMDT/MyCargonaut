import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
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
    <Dialog open={open} onClick={(event) => event.stopPropagation()}>
      <DialogContent>
        <Box m={3}>
          <Typography>{text}</Typography>
        </Box>
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
