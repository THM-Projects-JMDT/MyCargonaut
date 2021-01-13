import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PaymentState =
  | "paymentInProgress"
  | "paymentSuccess"
  | "paymentFailure";

export interface BookingState {
  [offerId: string]: PaymentState;
  requestPaymentState: PaymentState;
}

const initialState: BookingState = {
  requestPaymentState: "paymentInProgress",
};

export const booking = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setBookOfferPaymentStatus(
      state,
      {
        payload,
      }: PayloadAction<{ paymentState: PaymentState; offerId: string }>
    ) {
      state[payload.offerId] = payload.paymentState;
    },
    setAddRequestPaymentStatus(
      state,
      { payload }: PayloadAction<PaymentState>
    ) {
      state.requestPaymentState = payload;
    },
  },
});

export const {
  setBookOfferPaymentStatus,
  setAddRequestPaymentStatus,
} = booking.actions;

export default booking.reducer;
