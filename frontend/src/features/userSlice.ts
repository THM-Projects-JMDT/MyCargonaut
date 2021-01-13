import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser, postAddMoney, updateUser } from "../api/user";
import { User } from "../model/User";
import { AppThunk } from "./store";

export interface UserState {
  user?: User;
  avatarUrl?: string;
}

const initialState: UserState = {
  user: undefined,
  avatarUrl: undefined,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserSuccess(state, { payload }: PayloadAction<User>) {
      state.user = payload;
      state.avatarUrl = `/api/v1/user/profile/${payload._id}?v=${Date.now()}`;
    },
    updateProfile(state) {
      state.avatarUrl = `/api/v1/user/profile/${
        state.user?._id
      }?v=${Date.now()}`;
    },
  },
});

export const { getUserSuccess, updateProfile } = user.actions;

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

export const fetchUser = (): AppThunk => async (dispatch) => {
  try {
    const user = await getUser();
    dispatch(getUserSuccess(user));
  } catch (err) {}
};
