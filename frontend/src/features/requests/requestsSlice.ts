import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Offer } from "../../../../backend/src/offer/offer";
import { Stars } from "../../../../backend/src/rating/rating";
import {
  addRating,
  addRequest,
  bookOffer,
  getAllRequests,
  getPersonalRequests,
  OfferResponse,
} from "../../api/offers";
import { setAddRequestPaymentStatus } from "../booking/bookingSlice";
import { AppThunk } from "../store";
import { fetchUser } from "../userSlice";

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
    dispatch(setAddRequestPaymentStatus("paymentInProgress"));
    await addRequest(request);
    dispatch(setAddRequestPaymentStatus("paymentSuccess"));
    dispatch(fetchRequests());
  } catch (e) {
    dispatch(setAddRequestPaymentStatus("paymentFailure"));
    dispatch(getRequestsFailure(e.toString()));
  }
};

export const rateRequest = (id: string, stars: Stars): AppThunk => async (
  dispatch
) => {
  try {
    await addRating(id, stars);
    dispatch(fetchRequests());
  } catch (e) {
    dispatch(getRequestsFailure(e.toString()));
  }
};

export const acceptRequest = (id: string): AppThunk => async (dispatch) => {
  try {
    await bookOffer(id);
    dispatch(fetchUser());
    dispatch(fetchRequests());
  } catch (e) {
    dispatch(getRequestsFailure(e.toString()));
  }
};
