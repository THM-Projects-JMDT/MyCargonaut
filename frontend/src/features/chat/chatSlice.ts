import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../../../backend/src/chat/message";
import { AppThunk } from "../store";
import { getChat, postChatMessage } from "../../api/chat";

export interface ChatState {
  offerId?: string;
  chat?: Message[];
  timer?: NodeJS.Timeout;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  isLoading: true,
  error: null,
};

export const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPollingTimer(state, { payload }: PayloadAction<NodeJS.Timeout>) {
      state.timer = payload;
    },
    setChatOpenById(state, { payload }: PayloadAction<string | undefined>) {
      const timer = state.timer;
      if (!payload && timer) {
        state.chat = undefined;
        state.isLoading = true;
        clearInterval(timer as NodeJS.Timeout);
      }
      state.offerId = payload;
    },
    getChatSucces(
      state,
      {
        payload,
      }: PayloadAction<{
        chat: Message[];
      }>
    ) {
      state.chat = payload.chat;
      state.isLoading = false;
    },
    getChatFailure(state, { payload }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const {
  getChatSucces,
  getChatFailure,
  setChatOpenById,
  setPollingTimer,
} = chat.actions;

export default chat.reducer;

export const fetchChat = (offerId: string): AppThunk => async (dispatch) => {
  try {
    const chat = await getChat(offerId);
    dispatch(getChatSucces({ chat }));
  } catch (e) {
    dispatch(getChatFailure(e.toString()));
  }
};

export const sendChatMessage = (
  offerId: string,
  content: string
): AppThunk => async (dispatch) => {
  try {
    await postChatMessage(offerId, content);
    dispatch(fetchChat(offerId));
  } catch (e) {
    dispatch(getChatFailure(e.toString()));
  }
};
