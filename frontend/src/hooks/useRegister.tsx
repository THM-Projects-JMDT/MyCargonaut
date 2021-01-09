import { createRef, RefObject, useState } from "react";
import { useHistory } from "react-router-dom";
import { postRegister } from "../api/auth";
import { routes } from "../routes";
import { InputField } from "../util/InputForm";

export function useRegister() {
  const history = useHistory();
  const refs = {
    fistNameRef: createRef<HTMLInputElement>(),
    lastNameRef: createRef<HTMLInputElement>(),
    usernameRef: createRef<HTMLInputElement>(),
    emailRef: createRef<HTMLInputElement>(),
    passwordRef: createRef<HTMLInputElement>(),
    repeatPasswordRef: createRef<HTMLInputElement>(),
  };
  const [date, setDate] = useState<Date | null>(new Date());

  const getRefValue = (ref: RefObject<HTMLInputElement>) =>
    ref.current?.value ?? "";

  const validate = () =>
    Object.values(refs).every((r) => getRefValue(r)) && date;

  const validatePassword = () => {
    const password = getRefValue(refs.passwordRef);
    const repeatPassword = getRefValue(refs.repeatPasswordRef);
    if (!password || !repeatPassword) return false;

    return password === repeatPassword;
  };

  const handleRegister = async () => {
    console.log({
      firstName: getRefValue(refs.fistNameRef),
      lastName: getRefValue(refs.lastNameRef),
      birthday: date?.toDateString() ?? "",
      username: getRefValue(refs.usernameRef),
      email: getRefValue(refs.emailRef),
      password: getRefValue(refs.passwordRef),
    });
    if (!validate() || !validatePassword()) return;

    const user = {
      firstName: getRefValue(refs.fistNameRef),
      lastName: getRefValue(refs.lastNameRef),
      birthday: date?.toDateString() ?? "",
      username: getRefValue(refs.usernameRef),
      email: getRefValue(refs.emailRef),
      password: getRefValue(refs.passwordRef),
    };

    try {
      await postRegister(user);
      history.push(routes.login.path);
    } catch {}
  };

  const inputFields: InputField[] = [
    {
      label: "Vorname",
      type: "text",
      inputProps: {
        inputRef: refs.fistNameRef,
      },
    },
    {
      label: "Nachname",
      type: "text",
      inputProps: {
        inputRef: refs.lastNameRef,
      },
    },
    {
      label: "Geburtstag",
      type: "date",
      dateProps: {
        onChange: (date) => {
          setDate(date);
        },
        value: date,
      },
    },
    {
      label: "Username",
      type: "text",
      inputProps: {
        autoComplete: "off",
        name: "username",
        inputRef: refs.usernameRef,
      },
    },
    {
      label: "E-Mail",
      type: "text",
      inputProps: {
        autoComplete: "off",
        type: "email",
        name: "email",
        inputRef: refs.emailRef,
      },
    },
    {
      label: "Passwort",
      type: "text",
      inputProps: {
        autoComplete: "new-password",
        type: "password",
        name: "password",
        inputRef: refs.passwordRef,
      },
    },
    {
      label: "Passwort wiederholen",
      type: "text",
      inputProps: {
        type: "password",
        name: "password",
        inputRef: refs.repeatPasswordRef,
      },
    },
  ];

  return {
    inputFields,
    validate,
    validatePassword,
    handleRegister,
  };
}
