import React from "react";
import { FormControl, TextField, TextFieldProps } from "@material-ui/core";
import { useStyles } from "./InputForm.style";

export interface InputField {
  label: string;
  inputProps?: TextFieldProps;
}

export interface InputFormProps {
  inputFields: InputField[];
}

export const InputForm: React.FC<InputFormProps> = ({ inputFields }) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth>
      {inputFields.map((field, idx) => (
        <TextField
          key={idx}
          fullWidth
          label={field.label}
          variant="outlined"
          className={classes.input}
          required
          {...field.inputProps}
        />
      ))}
    </FormControl>
  );
};
