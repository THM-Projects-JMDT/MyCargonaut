import { Box, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { routes } from "../../../routes";
import { useStyles } from "../Header.style";
import { CargoCoins } from "../../../util/CargoCoins";
import { CargoCoinsDialog } from "../../../util/CargoCoinsDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/rootReducer";
import { logout } from "../../../features/authSlice";
import clsx from "clsx";

// TODO: retrieve logged in user from store
export const NavElements: React.FC = () => {
  const classes = useStyles();
  const logedIn = useSelector((state: RootState) => state.auth.isLogedIn);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const cargoCoinsBalance = useSelector(
    (state: RootState) => state.user.user?.cargoCoins
  );
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const matchRequest = useRouteMatch("/requests");
  const matchOffer = useRouteMatch("/offers");
  const matchVehicle = useRouteMatch("/vehicles");

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleAvatarMenuClose();
    history.push(routes.profile.path);
  };

  const handleLogoutClick = () => {
    handleAvatarMenuClose();
    dispatch(logout());
  };

  const handleClick = (path: string) => {
    history.push(path);
  };

  const handleMoneyClick = () => {
    setOpen(true);
  };

  return (
    <div className={classes.buttonsGroup}>
      {!logedIn ? (
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => handleClick(routes.login.path)}
          >
            Login
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => handleClick(routes.createAccount.path)}
          >
            Registrieren
          </Button>
        </div>
      ) : (
        <div>
          <Button
            className={classes.button}
            color="primary"
            onClick={handleMoneyClick}
          >
            <CargoCoins fontSize="large" />
            <Box ml={1} fontSize={20} fontWeight="fontWeightBold">
              {cargoCoinsBalance}
            </Box>
          </Button>
          <Button
            className={clsx(classes.button, {
              [classes.selected]: matchRequest,
            })}
            color="primary"
            onClick={() => handleClick(routes.requests.path)}
          >
            Anfragen
          </Button>
          <Button
            className={clsx(classes.button, {
              [classes.selected]: matchOffer,
            })}
            color="primary"
            onClick={() => handleClick(routes.offers.path)}
          >
            Angebote
          </Button>
          <Button
            className={clsx(classes.button, {
              [classes.selected]: matchVehicle,
            })}
            color="primary"
            onClick={() => handleClick(routes.vehicles.path)}
          >
            Fahrzeuge
          </Button>
          <IconButton onClick={handleAvatarClick}>
            <AccountCircle fontSize="large" data-testid="avatar-icon" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleAvatarMenuClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleProfileClick}>Mein Profil</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
      )}
      <CargoCoinsDialog open={open} setOpen={setOpen} />
    </div>
  );
};
