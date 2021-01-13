import React from "react";
import { useAddVehicle } from "../../hooks/useAddVehicle";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";

export const AddVehiclePage: React.FC = () => {
  const { inputFields, handleAdd, validate } = useAddVehicle();

  return (
    <CenterCard>
      <CustomCard
        heading="Fahrzeug hinzufügen"
        buttonText="HINZUFÜGEN"
        content={<InputForm inputFields={inputFields}></InputForm>}
        event={handleAdd}
        validate={validate}
      ></CustomCard>
    </CenterCard>
  );
};
