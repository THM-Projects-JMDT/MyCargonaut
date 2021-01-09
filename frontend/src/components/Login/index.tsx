import React, { createRef, useEffect } from "react";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";
import { CenterCard } from "../../util/CenterCard";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
import { RootState } from "../../features/rootReducer";

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const logedIn = useSelector((state: RootState) => state.auth.isLogedIn);

  useEffect(() => {
    if (logedIn) history.push(routes.home.path);
  }, [logedIn, history]);

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
