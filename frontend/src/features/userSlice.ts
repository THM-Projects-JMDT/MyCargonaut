import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../model/User";

export interface UserState {
  user?: User;
}

const initialState: UserState = {
  user: undefined,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserSuccess(state, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
  },
});

export const { getUserSuccess } = user.actions;

export default user.reducer;
