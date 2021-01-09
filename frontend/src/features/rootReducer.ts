import { Action, combineReducers } from "@reduxjs/toolkit";
import offersReducers from "./offers/offersSlice";
import requestsReducers from "./requests/requestsSlice";
import vehiclesReducers from "./vehicles/vehiclesSlice";

const appReducer = combineReducers({
  offers: offersReducers,
  requests: requestsReducers,
  vehicles: vehiclesReducers,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | undefined, action: Action) => {
  if (action.type === "reset") state = undefined;

  return appReducer(state, action);
};

export const resetApp: Action = { type: "reset" };

export default rootReducer;
