import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle, MonetizationOn } from "@material-ui/icons";
import React from "react";
import { useStyles } from "../style";

// TODO: retrieve logged in user from store
export const NavElements: React.FC = () => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const cargoCoinsBalance = 3000; // TODO: retrieve actual balance

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleAvatarMenuClose();
    // TODO: navigate to profile
  };

  const handleLogoutClick = () => {
    handleAvatarMenuClose();
    setAuth(false); // TODO: implement actual logout logic
  };

  const handleLoginClick = () => {
    // TODO: open login modal and implement actual login logic
    setAuth(true);
  };

  const handleSignupClick = () => {
    // TODO: open sign up modal etc.
  };

  const handleMoneyClick = () => {
    // TODO: show dialog for adding cargo coins?
  };

  return (
    <div className={classes.buttonsGroup}>
      {!auth ? (
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={handleSignupClick}
          >
            Registrieren
          </Button>
        </div>
      ) : (
        <div>
          <IconButton className={classes.button} onClick={handleMoneyClick}>
            <MonetizationOn
              className={classes.moneyIcon}
              data-testid="money-icon"
            />
            {cargoCoinsBalance}
          </IconButton>
          <Button
            className={classes.button}
            color="primary"
            onClick={handleLoginClick}
          >
            Anfragen
          </Button>
          <Button
            className={classes.button}
            color="primary"
            onClick={handleLoginClick}
          >
            Angebote
          </Button>
          <Button
            className={classes.button}
            color="primary"
            onClick={handleLoginClick}
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
          >
            <MenuItem onClick={handleProfileClick}>Mein Profil</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};
