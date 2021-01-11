import { createRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { addVehicle } from "../api/vehicles";
import { routes } from "../routes";
import { InputField } from "../util/InputForm";
import { getRefValue } from "../util/InputForm/inputFormUtils";

export function useAddVehicle() {
  const history = useHistory();
  const refs = {
    manufacturer: createRef<HTMLInputElement>(),
    model: createRef<HTMLInputElement>(),
  };
  const numRefs = {
    seats: createRef<HTMLInputElement>(),
    storageSpace: createRef<HTMLInputElement>(),
  };
  const [date, setDate] = useState<Date | null>(new Date());

  const validate = () =>
    Object.values(refs).every((r) => getRefValue(r)) &&
    date &&
    Object.values(numRefs).every((r) => Number(getRefValue(r)));

  const handleAdd = async () => {
    if (!validate()) return;

    const car = {
      manufacturer: getRefValue(refs.manufacturer),
      model: getRefValue(refs.model),
      seats: Number(getRefValue(numRefs.seats)),
      storageSpace: Number(getRefValue(numRefs.storageSpace)),
      manufactureYear: date ?? new Date(),
    };

    try {
      await addVehicle(car);
      history.push(routes.vehicles.path);
    } catch (e) {}
  };

  const inputFields: InputField[] = [
    {
      label: "Hersteller",
      type: "text",
      inputProps: {
        id: "manufacturer",
        inputRef: refs.manufacturer,
      },
    },
    {
      label: "Baujahr",
      type: "date",
      dateProps: {
        id: "manufactureYear",
        views: ["year"],
        value: date,
        format: "yyyy",
        onChange: (date) => {
          setDate(date);
        },
      },
    },
    {
      label: "Modell",
      type: "text",
      inputProps: {
        id: "model",
        inputRef: refs.model,
      },
    },
    {
      label: "Sitze",
      type: "text",
      inputProps: {
        id: "seats",
        type: "number",
        inputRef: numRefs.seats,
      },
    },
    {
      label: "Stauraum",
      type: "text",
      inputProps: {
        id: "storageSpace",
        type: "number",
        inputRef: numRefs.storageSpace,
      },
    },
  ];

  return {
    inputFields,
    validate,
    handleAdd,
  };
}
