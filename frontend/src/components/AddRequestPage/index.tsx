import React from "react";
import { inputFieldRequest } from "../../assets/inputFields";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes";

export const AddRequestPage: React.FC = () => {
  const history = useHistory();

  const handleAdd = () => {
    history.push(routes.requests.path);
  };
  return (
    <CenterCard>
      <CustomCard
        heading="Anfrage hinzufügen"
        buttonText="HINZUFÜGEN"
        content={<InputForm inputFields={inputFieldRequest}></InputForm>}
        event={handleAdd}
      ></CustomCard>
    </CenterCard>
  );
};
