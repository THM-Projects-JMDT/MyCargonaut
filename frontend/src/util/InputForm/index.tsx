import React from "react";
import { FormControl, TextField } from "@material-ui/core";
import { useStyles } from "./InputForm.style";

export interface InputFormProps {
  inputFields: string[];
}

export const InputForm: React.FC<InputFormProps> = ({ inputFields }) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth>
      {
        //TODO unique key
        inputFields.map((field) => (
          <TextField
            key={field}
            fullWidth
            label={field}
            variant="outlined"
            className={classes.input}
          />
        ))
      }
    </FormControl>
  );
};
