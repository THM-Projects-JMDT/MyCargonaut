import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useStyles } from "./ChatBox.style";
import { ChatMessage } from "./ChatMessage";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import {
  fetchChat,
  sendChatMessage,
  setChatOpenById,
} from "../../features/chat/chatSlice";
import { Message } from "../../../../backend/src/chat/message";

interface ChatBoxProps {
  offerId: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ offerId }) => {
  const classes = useStyles();
  const [text, setText] = React.useState("");
  const dispatch = useDispatch();

  const chat = useSelector((state: RootState) => state.chat);
  const loggedInUserId = useSelector(
    (state: RootState) => state.user.user?._id
  );

  useEffect(() => {
    dispatch(fetchChat(offerId)); // offerId
  }, [dispatch, offerId]);

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
      dispatch(sendChatMessage(offerId, text));
      setText("");
    }
  };

  const handleClose = () => {
    dispatch(setChatOpenById(undefined));
  };

  const renderMessage = (message: Message, idx: number) => {
    const state = message.user === loggedInUserId ? "sent" : "recieved";
    return (
      <Box
        display="flex"
        flexDirection={state === "recieved" ? "row" : "row-reverse"}
        mb={1}
        key={idx}
      >
        <ChatMessage text={message.content} state={state} />
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
          {chat.isLoading ? (
            <CircularProgress />
          ) : (
            chat.chat?.map((m, i) => renderMessage(m, i))
          )}
          <Box display="flex" flexDirection="column-reverse"></Box>
        </CardContent>
      </Card>
      <Grid container>
        <Grid item xs={10}>
          <TextField
            style={{ backgroundColor: "white" }}
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
