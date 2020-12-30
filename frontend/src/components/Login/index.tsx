import React from "react";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";
import { CenterCard } from "../../util/CenterCard";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes";

export const Login = () => {
  const history = useHistory();

  const handleLogin = () => {
    //TODO Login logic
    history.push(routes.home.path);
  };

  return (
    <CenterCard>
      <CustomCard
        buttonText="LOGIN"
        heading="MyCargonaut - Login"
        content={<InputForm inputFields={["E-Mail", "Passwort"]} />}
        event={handleLogin}
      />
    </CenterCard>
  );
};
