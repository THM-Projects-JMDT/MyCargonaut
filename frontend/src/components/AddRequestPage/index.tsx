import React from "react";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { InputField, InputForm } from "../../util/InputForm";
import { useAddOffer } from "../../hooks/useAddOffer";

export const AddRequestPage: React.FC = () => {
  const { inputFields, handleAddOffer, validate } = useAddOffer(false);

  const filter = (service: string) => (field: InputField) => {
    return service
      ? !(
          (field.label === "Sitze" && service === "Transport") ||
          (field.label === "Stauraum" && service === "Mitfahrgelegenheit")
        )
      : !(field.label === "Stauraum");
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
    </CenterCard>
  );
};
