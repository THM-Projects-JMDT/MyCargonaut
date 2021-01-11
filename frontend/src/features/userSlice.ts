import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postAddMoney, updateUser } from "../api/user";
import { User } from "../model/User";
import { AppThunk } from "./store";

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

export const fetchAddMoney = (moneyAmount: string): AppThunk => async (
  dispatch
) => {
  try {
    const user = await postAddMoney(moneyAmount);
    dispatch(getUserSuccess(user));
  } catch (err) {}
};

export const putUser = (user: {
  firstName: string;
  lastName: string;
  email: string;
}): AppThunk => async (dispatch) => {
  try {
    const updatedUser = await updateUser(user);
    dispatch(getUserSuccess(updatedUser));
  } catch (err) {}
};
