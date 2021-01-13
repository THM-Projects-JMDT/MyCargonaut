import { Action, combineReducers } from "@reduxjs/toolkit";
import offersReducers from "./offers/offersSlice";
import requestsReducers from "./requests/requestsSlice";
import vehiclesReducers from "./vehicles/vehiclesSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import chatReducer from "./chat/chatSlice";
import tabsReducer from "./tabSlice";
import bookingReducer from "./booking/bookingSlice";
import { RootStateOrAny } from "react-redux";

const appReducer = combineReducers({
  offers: offersReducers,
  requests: requestsReducers,
  vehicles: vehiclesReducers,
  auth: authReducer,
  user: userReducer,
  chat: chatReducer,
  tabs: tabsReducer,
  booking: bookingReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | RootStateOrAny, action: Action) => {
  if (action.type === "reset")
    state = {
      auth: {
        isLoading: false,
        isLogedIn: false,
        error: null,
      },
    };

  return appReducer(state, action);
};

export default rootReducer;
