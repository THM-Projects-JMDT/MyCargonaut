import React from "react";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";
import { useAddOffer } from "../../hooks/useAddOffer";

export const AddRequestPage: React.FC = () => {
  const { inputFields, handleAddOffer } = useAddOffer(false);

  return (
    <CenterCard>
      <CustomCard
        heading="Anfrage hinzufügen"
        buttonText="HINZUFÜGEN"
        content={<InputForm inputFields={inputFields}></InputForm>}
        event={handleAddOffer}
        confirmText="Beim Hinzufügen der Anfrage wird der von Ihnen gewählte Betrag von Ihrem MyCargonaut-Konto abgebucht. Fortfahren?"
      ></CustomCard>
    </CenterCard>
  );
};
