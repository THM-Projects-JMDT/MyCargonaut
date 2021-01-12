import { Paper, Typography, useTheme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { useStyles } from "./ChatMessage.style";

export interface ChatMessageProps {
  text: string;
  state: "sent" | "recieved";
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ text, state }) => {
  const classes = useStyles();
  const theme = useTheme();
  const styles: CSSProperties =
    state === "sent"
      ? {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        }
      : {};
  return (
    <Paper className={classes.sender} style={styles} elevation={4}>
      <Typography>{text}</Typography>
    </Paper>
  );
};
