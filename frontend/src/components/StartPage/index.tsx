import { Box, Slide, Zoom } from "@material-ui/core";
import React, { useState } from "react";
import truck from "../../assets/images/truck.svg";
import { useNotLoggedIn } from "../../hooks/useNotLoggedIn";
import { useStyles } from "./StartPage.style";

export const StartPage = () => {
  const classes = useStyles();
  const [state, setState] = useState(false);
  useNotLoggedIn();

  return (
    <div className={classes.root}>
      <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={800}
        onEntered={() => setState(true)}
      >
        <img alt="truck" src={truck}></img>
      </Slide>
      <Zoom in={state} timeout={400}>
        <div className={classes.text}>
          <Box mb={10} color="primary" fontSize={64} textAlign="center">
            Willkommen bei <i>MyCargonaut</i> !
          </Box>
          <Box color="primary" fontSize={48} textAlign="center">
            <b>Die</b> Plattform für Transport- und Mitfahrgelenheiten.
          </Box>
        </div>
      </Zoom>
    </div>
  );
};
