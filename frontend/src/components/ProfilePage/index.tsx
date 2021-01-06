import React from "react";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { Profile } from "./Profile";

export const ProfilePage = () => {
  return (
    <CenterCard>
      <CustomCard
        buttonText="SPEICHERN"
        heading="MyCargonaut - Profil"
        content={<Profile />}
        event={() => {}}
      ></CustomCard>
    </CenterCard>
  );
};
