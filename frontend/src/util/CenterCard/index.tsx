import React, { ReactNode } from "react";
import { useStyles } from "./CenterCard.style";

export interface CenterCardProps {
  children: ReactNode;
}

export const CenterCard: React.FC<CenterCardProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.center}>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};
