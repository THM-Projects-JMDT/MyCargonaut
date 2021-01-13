import React, { createRef, useState } from "react";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";
import { CenterCard } from "../../util/CenterCard";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNotLoggedIn } from "../../hooks/useNotLoggedIn";
import { Snackbar } from "@material-ui/core";

export const Login = () => {
  const dispatch = useDispatch();
  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  useNotLoggedIn();
  const [validate, setValidate] = useState({ open: false, message: "" });

  const handleLogin = () => {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      if (!username || !password) throw new Error();

      dispatch(
        login(username, password, () =>
          setValidate({ open: true, message: "Ungültige Anmeldedaten" })
        )
      );
    } catch {
      setValidate({ open: true, message: "Felder nicht korrekt ausgefüllt" });
    }
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleClose = () => {
    setValidate({ ...validate, open: false });
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
        id: "username",
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
        id: "password",
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={validate.open}
        onClose={handleClose}
        message={validate.message}
        key={1}
        autoHideDuration={3000}
      />
    </CenterCard>
  );
};
