import React from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";

export const Registration = () => {
  const history = useHistory();

  const handleRegistration = () => {
    //TODO Registration logic
    history.push(routes.login.path);
  };

  const inputFields = [
    {
      label: "Vorname",
    },
    {
      label: "Nachname",
    },
    {
      label: "Geburtstag",
    },
    {
      label: "Username",
      inputProps: {
        autoComplete: "off",
        name: "username",
      },
    },
    {
      label: "E-Mail",
      inputProps: {
        autoComplete: "off",
        type: "email",
        name: "email",
      },
    },
    {
      label: "Passwort",
      inputProps: {
        autoComplete: "new-password",
        type: "password",
        name: "password",
      },
    },
    {
      label: "Passwort wiederholen",
      inputProps: {
        type: "password",
        name: "password",
      },
    },
  ];

  return (
    <CenterCard>
      <CustomCard
        buttonText="REGISTRIEREN"
        heading="MyCargonaut - Registrieren"
        content={<InputForm inputFields={inputFields} />}
        event={handleRegistration}
      />
    </CenterCard>
  );
};
