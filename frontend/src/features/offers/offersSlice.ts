import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Offer } from "../../../../backend/src/offer/offer";
import {
  addOffer,
  getAllOffers,
  getPersonalOffers,
  OfferResponse,
} from "../../api/offers";
import { AppThunk } from "../store";

export interface OffersState {
  allOffers: OfferResponse[];
  personalOffers: OfferResponse[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OffersState = {
  allOffers: [],
  personalOffers: [],
  isLoading: true,
  error: null,
};

export const offers = createSlice({
  name: "offers",
  initialState,
  reducers: {
    getOffersSucces(
      state,
      {
        payload,
      }: PayloadAction<{
        allOffers: OfferResponse[];
        personalOffers: OfferResponse[];
      }>
    ) {
      state.allOffers = payload.allOffers;
      state.personalOffers = payload.personalOffers;
      state.isLoading = false;
    },
    getOffersFailure(state, { payload }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { getOffersSucces, getOffersFailure } = offers.actions;

export default offers.reducer;

export const fetchOffers = (): AppThunk => async (dispatch) => {
  try {
    const allOffers = await getAllOffers();
    const personalOffers = await getPersonalOffers();
    dispatch(getOffersSucces({ allOffers, personalOffers }));
  } catch (e) {
    dispatch(getOffersFailure(e.toString()));
  }
};

export const putOffer = (offer: Offer): AppThunk => async (dispatch) => {
  try {
    await addOffer(offer);
    dispatch(fetchOffers());
  } catch (e) {
    dispatch(getOffersFailure(e.toString()));
  }
};
