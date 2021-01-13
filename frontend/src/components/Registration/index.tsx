import React from "react";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";
import { useNotLoggedIn } from "../../hooks/useNotLoggedIn";
import { useRegister } from "../../hooks/useRegister";

export const Registration = () => {
  const {
    handleRegister,
    inputFields,
    validate,
    validatePassword,
  } = useRegister();
  useNotLoggedIn();

  return (
    <CenterCard>
      <CustomCard
        buttonText="REGISTRIEREN"
        heading="MyCargonaut - Registrieren"
        content={<InputForm inputFields={inputFields} />}
        event={handleRegister}
        validate={() => validate() && validatePassword()}
      />
    </CenterCard>
  );
};
