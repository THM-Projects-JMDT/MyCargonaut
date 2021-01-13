import React from "react";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { useAddOffer } from "../../hooks/useAddOffer";
import { InputForm } from "../../util/InputForm";

export const AddOfferPage: React.FC = () => {
  const { inputFields, handleAddOffer, validate } = useAddOffer(true);

  return (
    <CenterCard>
      <CustomCard
        heading="Angebot hinzufügen"
        buttonText="HINZUFÜGEN"
        content={<InputForm inputFields={inputFields}></InputForm>}
        event={handleAddOffer}
        validate={validate}
      ></CustomCard>
    </CenterCard>
  );
};
