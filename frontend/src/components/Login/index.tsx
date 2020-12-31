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

  const handlePressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const inputFields = [
    {
      label: "E-Mail/Username",
      inputProps: {
        onKeyDown: handlePressEnter,
        autoComplete: "username",
        name: "username",
      },
    },
    {
      label: "Passwort",
      inputProps: {
        onKeyDown: handlePressEnter,
        autoComplete: "current-password",
        type: "password",
        name: "password",
      },
    },
  ];

  return (
    <CenterCard>
      <CustomCard
        buttonText="LOGIN"
        heading="MyCargonaut - Login"
        content={<InputForm inputFields={inputFields} />}
        event={handleLogin}
      />
    </CenterCard>
  );
};
