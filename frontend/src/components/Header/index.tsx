import React from "react";
import logo from "./logo_car.png";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
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
            <img
              data-testid={"logo"}
              src={logo}
              alt="logo"
              style={{ marginBottom: 10, marginRight: 5 }}
            />
          </Link>
          <Typography variant="h4" color="primary">
            <i>
              <b>My</b>Cargonaut
            </i>
          </Typography>
          <NavElements />
        </Toolbar>
      </AppBar>
    </div>
  );
};
