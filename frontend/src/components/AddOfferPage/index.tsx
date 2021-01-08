import React from "react";
import { useHistory } from "react-router-dom";
import { inputFieldOffer } from "../../assets/inputFields";
import { routes } from "../../routes";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";

export const AddOfferPage: React.FC = () => {
  const history = useHistory();

  const handleAdd = () => {
    history.push(routes.offers.path);
  };
  return (
    <CenterCard>
      <CustomCard
        heading="Angebot hinzufügen"
        buttonText="HINZUFÜGEN"
        content={<InputForm inputFields={inputFieldOffer}></InputForm>}
        event={handleAdd}
      ></CustomCard>
    </CenterCard>
  );
};
