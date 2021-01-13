import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TabState {
  offersTab: 0 | 1;
  requestsTab: 0 | 1;
}

const initialState: TabState = {
  offersTab: 0,
  requestsTab: 0,
};

export const tabs = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setOffersTab(state, { payload }: PayloadAction<0 | 1>) {
      state.offersTab = payload;
    },
    setRequestsTab(state, { payload }: PayloadAction<0 | 1>) {
      state.requestsTab = payload;
    },
  },
});

export const { setOffersTab, setRequestsTab } = tabs.actions;

export default tabs.reducer;
