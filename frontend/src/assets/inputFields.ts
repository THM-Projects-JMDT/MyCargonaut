export const inputFields = [
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
