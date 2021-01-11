import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Offer } from "../../../../backend/src/offer/offer";
import {
  addRequest,
  bookOffer,
  getAllRequests,
  getPersonalRequests,
  OfferResponse,
} from "../../api/offers";
import { AppThunk } from "../store";

export interface RequestsState {
  allRequests: OfferResponse[];
  personalRequests: OfferResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RequestsState = {
  allRequests: [],
  personalRequests: [],
  isLoading: true,
  error: null,
};

export const requests = createSlice({
  name: "requests",
  initialState,
  reducers: {
    getRequestsSucces(
      state,
      {
        payload,
      }: PayloadAction<{
        allRequests: OfferResponse[];
        personalRequests: OfferResponse[];
      }>
    ) {
      state.allRequests = payload.allRequests;
      state.personalRequests = payload.personalRequests;
      state.isLoading = false;
    },
    getRequestsFailure(state, { payload }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { getRequestsSucces, getRequestsFailure } = requests.actions;

export default requests.reducer;

export const fetchRequests = (): AppThunk => async (dispatch) => {
  try {
    const allRequests = await getAllRequests();
    const personalRequests = await getPersonalRequests();
    dispatch(getRequestsSucces({ allRequests, personalRequests }));
  } catch (e) {
    dispatch(getRequestsFailure(e.toString()));
  }
};

export const putRequest = (request: Offer): AppThunk => async (dispatch) => {
  try {
    await addRequest(request);
    dispatch(fetchRequests());
  } catch (e) {
    dispatch(getRequestsFailure(e.toString()));
  }
};

export const acceptRequest = (id: string): AppThunk => async (dispatch) => {
  try {
    await bookOffer(id);
    dispatch(fetchRequests());
  } catch (e) {
    dispatch(getRequestsFailure(e.toString()));
  }
};
