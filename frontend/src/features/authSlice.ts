import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLogin, fetchLogout } from "../api/auth";
import { AppThunk } from "./store";

export interface MeetingState {
  isLogedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: MeetingState = {
  isLogedIn: false,
  isLoading: true,
  error: null,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isLogedIn = true;
      state.isLoading = false;
    },
    loginFailure(state, { payload }: PayloadAction<string>) {
      state.isLogedIn = false;
      state.error = payload;
      state.isLoading = false;
    },
    logoutSuccess(state) {
      state.isLogedIn = false;
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = auth.actions;

export default auth.reducer;

export const login = (username: string, password: string): AppThunk => async (
  dispatch
) => {
  try {
    await fetchLogin(username, password);
    dispatch(loginSuccess());
  } catch (err) {
    dispatch(loginFailure("Anmeldung Fehlgeschlagen"));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  try {
    await fetchLogout();
    dispatch(logoutSuccess());
  } catch (err) {}
};
