import React from "react";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { InputForm } from "../../util/InputForm";
import { inputFields } from "../../assets/inputFields";

export const Profile = () => {
  return (
    <CenterCard>
      <CustomCard
        buttonText="SPEICHERN"
        heading="MyCargonaut - Profil"
        content={<InputForm inputFields={inputFields} />}
        event={() => {}}
      ></CustomCard>
    </CenterCard>
  );
};
