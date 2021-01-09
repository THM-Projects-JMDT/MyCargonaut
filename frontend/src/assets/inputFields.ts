import { InputField } from "../util/InputForm";

export const inputFieldsProfile: InputField[] = [
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
    dateProps: {
      value: new Date(),
      onChange: () => {},
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

export const inputFieldsPassword: InputField[] = [
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

export const inputFieldOffer: InputField[] = [
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

export const inputFieldRequest: InputField[] = [
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
