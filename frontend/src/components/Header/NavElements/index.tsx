import { Button, IconButton } from "@material-ui/core";
import { AccountCircle, MonetizationOn } from "@material-ui/icons";
import React from "react";
import { useStyles } from "../style";

export const NavElements: React.FC = () => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);

  const handleLoginClick = () => {
    // TODO: open login modal etc.
    setAuth(true);
  };

  const handleSignupClick = () => {
    // TODO: open sign up modal etc.
  };

  const handleMoneyClick = () => {
    // TODO: show dialog for adding cargo coins?
  };

  const handleAvatarClick = () => {};

  return (
    <div className={classes.buttonsGroup}>
      {!auth ? (
        <div>
          <Button
            className={classes.button}
            variant="outlined"
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
        </div>
      )}
    </div>
  );
};
