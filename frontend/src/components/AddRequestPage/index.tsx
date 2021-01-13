import React from "react";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { InputField, InputForm } from "../../util/InputForm";
import { useAddOffer } from "../../hooks/useAddOffer";
import { Snackbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import { setAddRequestPaymentStatus } from "../../features/booking/bookingSlice";

export const AddRequestPage: React.FC = () => {
  const { inputFields, handleAddOffer, validate } = useAddOffer(false);
  const booking = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();

  const filter = (service: string) => (field: InputField) => {
    return service
      ? !(
          (field.label === "Sitze" && service === "Transport") ||
          (field.label === "Stauraum" && service === "Mitfahrgelegenheit")
        )
      : !(field.label === "Stauraum");
  };

  const handleSnackbarClose = () => {
    dispatch(setAddRequestPaymentStatus("paymentInProgress"));
  };

  return (
    <CenterCard>
      <CustomCard
        heading="Anfrage hinzufügen"
        buttonText="HINZUFÜGEN"
        content={
          <InputForm inputFields={inputFields} filter={filter}></InputForm>
        }
        event={handleAddOffer}
        validate={validate}
        confirmText="Beim Hinzufügen der Anfrage wird der von Ihnen gewählte Betrag von Ihrem MyCargonaut-Konto abgebucht. Fortfahren?"
      ></CustomCard>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={booking.requestPaymentState === "paymentFailure"}
        onClose={handleSnackbarClose}
        message="Anfrage konnte nicht hinzugefügt werden. Haben Sie genug
        CargoCoins auf Ihrem Konto?"
        key={1}
        autoHideDuration={3000}
      />
    </CenterCard>
  );
};
