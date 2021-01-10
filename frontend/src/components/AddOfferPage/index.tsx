import React from "react";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";
import { useAddOffer } from "../../hooks/useAddOffer";

export const AddOfferPage: React.FC = () => {
  const { inputFields, handleAddOffer } = useAddOffer(true);

  return (
    <CenterCard>
      <CustomCard
        heading="Angebot hinzufügen"
        buttonText="HINZUFÜGEN"
        content={<InputForm inputFields={inputFields}></InputForm>}
        event={handleAddOffer}
      ></CustomCard>
    </CenterCard>
  );
};
