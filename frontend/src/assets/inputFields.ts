export const inputFieldsReg = [
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

export const inputFieldsProfile = [
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
];

export const inputFieldsPassword = [
  {
    label: "Altes Passwort eingeben",
    inputProps: {
      type: "password",
      name: "password",
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
    label: "Neues Passwort wiederholen",
    inputProps: {
      type: "password",
      name: "password",
    },
  },
];
