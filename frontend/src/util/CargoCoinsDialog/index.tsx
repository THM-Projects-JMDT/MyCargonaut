import React from "react";
import { useStyles } from "./CargoCoinsDialog.style";
import { CustomCard } from "../CustomCard";
import { Dialog, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { CargoCoins } from "../CargoCoins";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { fetchAddMoney } from "../../features/userSlice";

export interface CargoCoinsDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CargoCoinsDialog: React.FC<CargoCoinsDialogProps> = ({
  open,
  setOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddMoney = (moneyAmount: string) => () => {
    handleClose();
    dispatch(fetchAddMoney(moneyAmount));
  };

  const confirmText = (coins: string, price: string) => {
    return `Möchten Sie ${coins} CargoCoins zum Preis von ${price}€ auf Ihr Konto laden?`;
  };

  const cardContent = [
    <div className={classes.cardContent}>
      <CargoCoins className={classes.icon} />
      <Typography className={classes.old} variant="h5" align="center">
        4.99 €
      </Typography>
      <Typography variant="h4" align="center">
        <b>3.99 €</b>
      </Typography>
    </div>,
    <div className={classes.cardContent}>
      <CargoCoins className={classes.icon} />
      <Typography className={classes.old} variant="h5" align="center">
        11.99 €
      </Typography>
      <Typography variant="h4" align="center">
        <b>9.99 €</b>
      </Typography>
    </div>,
    <div className={classes.cardContent}>
      <CargoCoins className={classes.icon} />
      <Typography className={classes.old} variant="h5" align="center">
        22.99 €
      </Typography>
      <Typography variant="h4" align="center">
        <b>18.99 €</b>
      </Typography>
    </div>,
  ];

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      classes={{
        paper: classes.paper,
      }}
      onClose={handleClose}
    >
      <DialogTitle className={classes.heading}>
        <Typography variant="h4" color="primary">
          CargoCoins kaufen
        </Typography>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <div className={classes.root}>
        <div className={classes.card1}>
          <CustomCard
            buttonText="KAUFEN"
            heading="100 CargoCoins"
            content={cardContent[0]}
            event={handleAddMoney("100")}
            headingProps={{ variant: "h4", align: "center" }}
            confirmText={confirmText("100", "3.99")}
          />
        </div>
        <div className={classes.card2}>
          <CustomCard
            buttonText="KAUFEN"
            heading="500  CargoCoins"
            content={cardContent[1]}
            event={handleAddMoney("500")}
            headingProps={{ variant: "h4", align: "center" }}
            confirmText={confirmText("500", "9.99")}
          />
        </div>
        <div className={classes.card3}>
          <CustomCard
            buttonText="KAUFEN"
            heading="1000  CargoCoins"
            content={cardContent[2]}
            event={handleAddMoney("1000")}
            headingProps={{ variant: "h4", align: "center" }}
            confirmText={confirmText("1000", "18.99")}
          />
        </div>
      </div>
    </Dialog>
  );
};
