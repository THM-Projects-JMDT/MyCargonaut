import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLogin, postLogin, postLogout } from "../api/auth";
import { AppThunk } from "./store";
import { getUserSuccess } from "./userSlice";

export interface AuthState {
  isLogedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLogedIn: false,
  isLoading: true,
  error: null,
};

export const resetApp: Action = { type: "reset" };

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
    const user = await postLogin(username, password);
    dispatch(loginSuccess());
    dispatch(getUserSuccess(user));
  } catch (err) {
    dispatch(loginFailure("Anmeldung Fehlgeschlagen"));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  try {
    await postLogout();
    dispatch(resetApp);
    dispatch(logoutSuccess());
  } catch (err) {}
};

export const authCheck = (): AppThunk => async (dispatch) => {
  try {
    const user = await getLogin();
    dispatch(loginSuccess());
    dispatch(getUserSuccess(user));
  } catch (err) {
    dispatch(loginFailure("Session expired"));
  }
};
