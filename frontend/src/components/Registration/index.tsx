import React from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";
import { inputFieldsReg } from "../../assets/inputFields";
import { useNotLoggedIn } from "../../hooks/useNotLoggedIn";

export const Registration = () => {
  const history = useHistory();
  useNotLoggedIn();

  const handleRegistration = () => {
    //TODO Registration logic
    history.push(routes.login.path);
  };

  return (
    <CenterCard>
      <CustomCard
        buttonText="REGISTRIEREN"
        heading="MyCargonaut - Registrieren"
        content={<InputForm inputFields={inputFieldsReg} />}
        event={handleRegistration}
      />
    </CenterCard>
  );
};
