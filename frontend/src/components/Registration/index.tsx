import React from "react";
import { CustomCard } from "../util/CustomCard";
import { InputForm } from "../util/InputForm";

export const Registration = () => {
  return (
    <CustomCard
      buttonText="REGISTRIEREN"
      content={
        <InputForm
          inputFields={[
            "Vorname",
            "Nachname",
            "Geburtstag",
            "Username",
            "E-Mail",
            "Passwort",
          ]}
        />
      }
    />
  );
};
