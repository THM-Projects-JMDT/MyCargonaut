import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./ChatBox.style";
import { ChatMessage } from "./ChatMessage";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";

export interface ChatProps {}

export const ChatBox: React.FC<ChatProps> = () => {
  const classes = useStyles();
  const [text, setText] = React.useState("");

  // TODO: retrieve from store
  const messages = [
    {
      content: "Hi, wie gehts dir?",
    },
    {
      content: "Gut, selbst?",
      senderName: "cargo98",
    },
    {
      content: "Auch :)",
    },
    {
      content:
        "Weiß nicht ob dus schon wusstest, aber Timon ist ZWEIMAL durch LA durchgefallen xDDD",
    },
    {
      content: "Nee, nicht im Ernst!",
      senderName: "cargo98",
    },
    {
      content: "ROFL",
      senderName: "cargo98",
    },
  ];

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (text.trim() !== "") {
      setText("");
      // TODO: send message
    }
  };

  const handleClose = () => {};

  const renderMessage = (m: any) => {
    return (
      <Box
        display="flex"
        flexDirection={m.senderName ? "row" : "row-reverse"}
        mb={1}
      >
        <ChatMessage text={m.content} senderName={m.senderName} />
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.closeGridRow}>
        <Grid item xs={11} />
        <Grid item xs>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Card className={classes.chatBoxCard}>
        <CardContent>
          {messages.map((m) => renderMessage(m))}
          <Box display="flex" flexDirection="column-reverse"></Box>
        </CardContent>
      </Card>
      <Grid container>
        <Grid item xs={10}>
          <TextField
            value={text}
            onKeyDown={handleEnter}
            onChange={handleTextChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <IconButton
            color="primary"
            className={classes.sendButton}
            onClick={handleSend}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
