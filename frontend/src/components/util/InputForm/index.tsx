import React from "react";
import { FormControl, TextField } from "@material-ui/core";
import { useStyles } from "../InputForm/InputForm.style";

export interface InputFormProps {
  inputFields: string[];
}

export const InputForm: React.FC<InputFormProps> = ({ inputFields }) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth>
      {inputFields.map((field) => (
        <TextField
          fullWidth
          label={field}
          variant="outlined"
          className={classes.input}
        />
      ))}
    </FormControl>
  );
};
