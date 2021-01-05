import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useStyles } from "./Profile.style";
import { Avatar, Box, IconButton } from "@material-ui/core";
import { InputForm } from "../../util/InputForm";
import { inputFieldsProfile } from "../../assets/inputFields";
import EditIcon from "@material-ui/icons/Edit";
import { CargoCoins } from "../../util/CargoCoins";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { LinkButton } from "../../util/LinkButton";
import { CargoCoinsDialog } from "../../util/CargoCoinsDialog";
import { PasswordDialog } from "./PasswordDialog";

export const Profile = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openPw, setOpenPw] = useState(false);
  const cargoCoinsBalance = 3000; // TODO: retrieve actual balance

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenPw = () => {
    setOpenPw(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.grid}>
        <div className={classes.profile}>
          <Avatar variant="rounded" className={classes.avatar} />
          <div className={classes.editButton}>
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                classes={{
                  root: classes.button,
                }}
              >
                <EditIcon />
              </Button>
            </label>
          </div>
        </div>
        <div className={classes.actions}>
          <div className={classes.cargoCoins}>
            <CargoCoins fontSize="large" />
            <Box ml={1} fontSize={20} fontWeight="fontWeightBold">
              {cargoCoinsBalance}
            </Box>
            <Box ml={1} fontSize={20}>
              CargoCoins
            </Box>
            <IconButton onClick={handleOpen}>
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div>
            <LinkButton onClick={handleOpenPw}>Passwort ändern</LinkButton>
          </div>
        </div>
      </div>
      <InputForm inputFields={inputFieldsProfile} />
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <CargoCoinsDialog open={open} setOpen={setOpen} />
      <PasswordDialog open={openPw} setOpen={setOpenPw} />
    </div>
  );
};
