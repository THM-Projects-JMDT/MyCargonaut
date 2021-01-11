import { isValid } from "date-fns";
import { createRef, RefObject, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postRegister } from "../api/auth";
import { RootState } from "../features/rootReducer";
import { putUser } from "../features/userSlice";
import { routes } from "../routes";
import { InputField } from "../util/InputForm";

export function useRegister() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const refs = {
    fistNameRef: createRef<HTMLInputElement>(),
    lastNameRef: createRef<HTMLInputElement>(),
    usernameRef: createRef<HTMLInputElement>(),
    emailRef: createRef<HTMLInputElement>(),
    passwordRef: createRef<HTMLInputElement>(),
    repeatPasswordRef: createRef<HTMLInputElement>(),
  };
  const [date, setDate] = useState<Date | null>(
    user ? user.birthday : new Date()
  );

  const getRefValue = (ref: RefObject<HTMLInputElement>) =>
    ref.current?.value ?? "";

  const validate = () =>
    Object.values(refs).every((r) => getRefValue(r).trim()) && isValid(date);

  const validatePassword = () => {
    const password = getRefValue(refs.passwordRef);
    const repeatPassword = getRefValue(refs.repeatPasswordRef);
    if (!password || !repeatPassword) return false;

    return password === repeatPassword;
  };

  const handleUpdate = async () => {
    const user = {
      firstName: getRefValue(refs.fistNameRef).trim(),
      lastName: getRefValue(refs.lastNameRef).trim(),
      email: getRefValue(refs.emailRef).trim(),
    };

    if (!user.firstName || !user.lastName || !user.email) return;

    try {
      dispatch(putUser(user));
    } catch (e) {}
  };

  const handleRegister = async () => {
    if (!validate() || !validatePassword()) return;

    const user = {
      firstName: getRefValue(refs.fistNameRef).trim(),
      lastName: getRefValue(refs.lastNameRef).trim(),
      birthday: date?.toDateString() ?? "",
      username: getRefValue(refs.usernameRef).trim(),
      email: getRefValue(refs.emailRef).trim(),
      password: getRefValue(refs.passwordRef).trim(),
    };

    try {
      await postRegister(user);
      history.push(routes.login.path);
    } catch (e) {}
  };

  const inputFields: InputField[] = [
    {
      label: "Vorname",
      type: "text",
      inputProps: {
        id: "firstname",
        inputRef: refs.fistNameRef,
        defaultValue: user?.firstName,
      },
    },
    {
      label: "Nachname",
      type: "text",
      inputProps: {
        id: "lastname",
        inputRef: refs.lastNameRef,
        defaultValue: user?.lastName,
      },
    },
    {
      label: "Geburtstag",
      type: "date",
      dateProps: {
        id: "birthday",
        onChange: (date) => {
          setDate(date);
        },
        value: date,
        disabled: !!user,
      },
    },
    {
      label: "Username",
      type: "text",
      inputProps: {
        id: "username",
        autoComplete: "off",
        name: "username",
        inputRef: refs.usernameRef,
        defaultValue: user?.username,
        disabled: !!user,
      },
    },
    {
      label: "E-Mail",
      type: "text",
      inputProps: {
        id: "email",
        autoComplete: "off",
        type: "email",
        name: "email",
        inputRef: refs.emailRef,
        defaultValue: user?.email,
      },
    },
    ...(!user
      ? [
          {
            label: "Passwort",
            type: "text",
            inputProps: {
              id: "password",
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
              id: "repeat-password",
              type: "password",
              name: "password",
              inputRef: refs.repeatPasswordRef,
            },
          },
        ]
      : []),
  ];

  return {
    inputFields,
    validate,
    validatePassword,
    handleRegister,
    handleUpdate,
  };
}
