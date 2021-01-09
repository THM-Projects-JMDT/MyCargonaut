import { Action, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const appReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | undefined, action: Action) => {
  if (action.type === "reset") state = undefined;

  return appReducer(state, action);
};

export const resetApp: Action = { type: "reset" };

export default rootReducer;
