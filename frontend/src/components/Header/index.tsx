import React from "react";
import logo from "../../assets/logo_car.svg";
import { AppBar, Toolbar } from "@material-ui/core";
import { useStyles } from "./style";
import { NavElements } from "./NavElements";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="classes.root">
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Link to="/">
            <img data-testid={"logo"} src={logo} alt="logo" />
          </Link>
          <NavElements />
        </Toolbar>
      </AppBar>
    </div>
  );
};
