import React from "react";
import logo from "../../assets/images/logo_car.svg";
import { AppBar, Toolbar } from "@material-ui/core";
import { useStyles } from "./Header.style";
import { NavElements } from "./NavElements";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

export const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="classes.root">
      <AppBar className={classes.appBar} position="relative">
        <Toolbar className={classes.toolbar}>
          <Link to={routes.start.path}>
            <img
              className={classes.logo}
              data-testid={"logo"}
              src={logo}
              alt="logo"
            />
          </Link>
          <NavElements />
        </Toolbar>
      </AppBar>
    </div>
  );
};
