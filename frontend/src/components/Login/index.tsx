import React, { createRef } from "react";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";
import { CenterCard } from "../../util/CenterCard";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNotLoggedIn } from "../../hooks/useNotLoggedIn";

export const Login = () => {
  const dispatch = useDispatch();
  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  useNotLoggedIn();

  const handleLogin = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(usernameRef.current);

    if (!username || !password) return;

    dispatch(login(username, password));
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const inputFields = [
    {
      label: "E-Mail/Username",
      type: "text",
      inputProps: {
        inputRef: usernameRef,
        onKeyDown: handlePressEnter,
        autoComplete: "username",
        name: "username",
      },
    },
    {
      label: "Passwort",
      type: "text",
      inputProps: {
        inputRef: passwordRef,
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
