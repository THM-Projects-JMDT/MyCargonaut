import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../../../backend/src/chat/message";
import { AppThunk } from "../store";
import { getChat, postChatMessage } from "../../api/chat";

export interface ChatState {
  offerId?: string;
  chat?: Message[];
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
    setChatOpenById(state, { payload }: PayloadAction<string | undefined>) {
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

export const { getChatSucces, getChatFailure, setChatOpenById } = chat.actions;

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
