import { Paper, Typography, useTheme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { useStyles } from "./ChatMessage.style";

export interface ChatMessageProps {
  text: string;
  senderName?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  senderName,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const styles: CSSProperties = !senderName
    ? {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      }
    : {};
  return (
    <Paper className={classes.sender} style={styles} elevation={4}>
      {senderName && (
        <Typography variant="caption" className={classes.senderName}>
          {senderName}:
        </Typography>
      )}
      <Typography>{text}</Typography>
    </Paper>
  );
};
