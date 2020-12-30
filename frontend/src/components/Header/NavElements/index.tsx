import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes";
import { useStyles } from "../Header.style";
import { CargoCoins } from "../../util/CargoCoins";

// TODO: retrieve logged in user from store
export const NavElements: React.FC = () => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const cargoCoinsBalance = 3000; // TODO: retrieve actual balance
  const history = useHistory();

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

  const handleClick = (path: string) => {
    history.push(path);
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
          <Button className={classes.button} color="primary" onClick={() => {}}>
            Anfragen
          </Button>
          <Button className={classes.button} color="primary" onClick={() => {}}>
            Angebote
          </Button>
          <Button className={classes.button} color="primary" onClick={() => {}}>
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
    </div>
  );
};
