import React, { useState } from "react";
import {
  FormControl,
  MenuItem,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { useStyles } from "./InputForm.style";
import {
  DatePicker,
  DatePickerProps,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { de } from "date-fns/locale";

export interface InputField {
  label: string;
  inputProps?: TextFieldProps;
  dateProps?: DatePickerProps;
  type: string;
  items?: string[];
  required?: boolean;
}

export interface InputFormProps {
  inputFields: InputField[];
}

export const InputForm: React.FC<InputFormProps> = ({ inputFields }) => {
  const classes = useStyles();
  const [date, setDate] = useState<Date | null>(new Date());

  const renderInputField = (field: InputField, idx: number) => {
    switch (true) {
      case field.type === "text":
        return (
          <TextField
            key={idx}
            fullWidth
            label={field.label}
            variant="outlined"
            className={classes.input}
            required={field.required ?? true}
            data-testid={field.inputProps?.id}
            {...field.inputProps}
          />
        );
      case field.type === "multiline":
        return (
          <TextField
            key={idx}
            multiline
            fullWidth
            label={field.label}
            variant="outlined"
            className={classes.input}
            required={field.required ?? true}
            {...field.inputProps}
          />
        );
      case field.type === "select":
        return (
          <TextField
            key={idx}
            select
            className={classes.input}
            label={field.label}
            variant="outlined"
            required={field.required}
            onChange={() => {}}
            defaultValue=""
            data-testid={field.inputProps?.id}
            {...field.inputProps}
          >
            {field.items?.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </TextField>
        );
      case field.type === "date":
        return (
          <MuiPickersUtilsProvider key={idx} utils={DateFnsUtils} locale={de}>
            <DatePicker
              inputVariant="outlined"
              required={field.required}
              className={classes.input}
              variant="inline"
              format="dd.MM.yyy"
              label={field.label}
              onChange={(date) => {
                setDate(date);
              }}
              value={date}
              data-testid={field.dateProps?.id}
              {...field.dateProps}
            />
          </MuiPickersUtilsProvider>
        );
      default:
        break;
    }
  };

  return (
    <FormControl fullWidth>
      {inputFields.map((field, idx) => renderInputField(field, idx))}
    </FormControl>
  );
};
