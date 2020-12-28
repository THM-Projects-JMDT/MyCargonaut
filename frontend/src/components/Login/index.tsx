import React from "react";
import { useStyles } from "./Login.style";
import { CustomCard } from "../util/CustomCard";
import { InputForm } from "../util/InputForm";

export const Login = () => {
  const classes = useStyles();

  return (
    <CustomCard
      buttonText="LOGIN"
      content={<InputForm inputFields={["E-Mail", "Passwort"]} />}
    />
  );
};
