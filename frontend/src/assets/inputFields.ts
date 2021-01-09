export const inputFieldsReg = [
  {
    label: "Vorname",
    type: "text",
  },
  {
    label: "Nachname",
    type: "text",
  },
  {
    label: "Geburtstag",
    type: "date",
  },
  {
    label: "Username",
    type: "text",
    inputProps: {
      autoComplete: "off",
      name: "username",
    },
  },
  {
    label: "E-Mail",
    type: "text",
    inputProps: {
      autoComplete: "off",
      type: "email",
      name: "email",
    },
  },
  {
    label: "Passwort",
    type: "text",
    inputProps: {
      autoComplete: "new-password",
      type: "password",
      name: "password",
    },
  },
  {
    label: "Passwort wiederholen",
    type: "text",
    inputProps: {
      type: "password",
      name: "password",
    },
  },
];

export const inputFieldsProfile = [
  {
    label: "Vorname",
    type: "text",
  },
  {
    label: "Nachname",
    type: "text",
  },
  {
    label: "Geburtstag",
    type: "date",
    inputProps: {
      disabled: true,
    },
  },
  {
    label: "Username",
    type: "text",
    inputProps: {
      autoComplete: "off",
      name: "username",
      disabled: true,
    },
  },
  {
    label: "E-Mail",
    type: "text",
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
    type: "text",
    inputProps: {
      type: "password",
      name: "password",
    },
  },
  {
    label: "Passwort",
    type: "text",
    inputProps: {
      autoComplete: "new-password",
      type: "password",
      name: "password",
    },
  },
  {
    label: "Neues Passwort wiederholen",
    type: "text",
    inputProps: {
      type: "password",
      name: "password",
    },
  },
];

export const inputFieldOffer = [
  {
    label: "von",
    type: "text",
  },
  {
    label: "nach",
    type: "text",
  },
  {
    label: "Service",
    type: "select",
    items: [
      "Mitfahrgelegenheit",
      "Transport",
      "Transport / Mitfahrgelegenheit",
    ],
  },
  {
    label: "Datum",
    type: "date",
  },
  {
    label: "Fahrzeug",
    type: "text",
  },
  {
    label: "Preis",
    type: "text",
  },
];

export const inputFieldRequest = [
  {
    label: "von",
    type: "text",
  },
  {
    label: "nach",
    type: "text",
  },
  {
    label: "Service",
    type: "select",
    items: [
      "Mitfahrgelegenheit",
      "Transport",
      "Transport / Mitfahrgelegenheit",
    ],
  },
  {
    label: "Datum",
    type: "date",
  },
  {
    label: "Sitze",
    type: "text",
    required: false,
  },
  {
    label: "Stauraum",
    type: "text",
    required: false,
  },
  {
    label: "Preis",
    type: "text",
  },
];
