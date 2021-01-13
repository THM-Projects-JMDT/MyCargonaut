import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useStyles } from "./Profile.style";
import { Avatar, Box, IconButton } from "@material-ui/core";
import { InputField, InputForm } from "../../util/InputForm";
import EditIcon from "@material-ui/icons/Edit";
import { CargoCoins } from "../../util/CargoCoins";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { CargoCoinsDialog } from "../../util/CargoCoinsDialog";
import { PasswordDialog } from "./PasswordDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import { uploadAvatar } from "../../api/user";
import { updateProfile } from "../../features/userSlice";

export interface ProfileProps {
  inputFields: InputField[];
}

export const Profile: React.FC<ProfileProps> = ({ inputFields }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openPw, setOpenPw] = useState(false);
  const cargoCoinsBalance = useSelector(
    (state: RootState) => state.user.user?.cargoCoins
  );
  const avatarUrl = useSelector((state: RootState) => state.user.avatarUrl);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleUplaod = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      await uploadAvatar(files[0]);
      dispatch(updateProfile());
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.grid}>
        <div className={classes.profile}>
          <Avatar
            variant="rounded"
            className={classes.avatar}
            src={avatarUrl}
          />
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
        </div>
      </div>
      <InputForm inputFields={inputFields} />
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleUplaod}
      />
      <CargoCoinsDialog open={open} setOpen={setOpen} />
      <PasswordDialog open={openPw} setOpen={setOpenPw} />
    </div>
  );
};
