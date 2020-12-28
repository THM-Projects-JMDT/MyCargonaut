import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle, MonetizationOn } from "@material-ui/icons";
import React from "react";
import { useStyles } from "../style";

export const NavElements: React.FC = () => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleProfileMenuClose();
    // TODO: navigate to profile
  };

  const handleLogoutClick = () => {
    handleProfileMenuClose();
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
            <MonetizationOn className={classes.moneyIcon} />
            3000
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
            <AccountCircle fontSize="large" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileClick}>Mein Profil</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};
