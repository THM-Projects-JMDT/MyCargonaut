import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import { useRegister } from "../../hooks/useRegister";
import { CenterCard } from "../../util/CenterCard";
import { CustomCard } from "../../util/CustomCard";
import { Profile } from "./Profile";

export const ProfilePage = () => {
  const { handleUpdate, inputFields, validateEdit } = useRegister();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <CenterCard>
      <CustomCard
        buttonText="SPEICHERN"
        heading="MyCargonaut - Profil"
        content={
          user ? <Profile inputFields={inputFields} /> : <CircularProgress />
        }
        event={handleUpdate}
        validate={validateEdit}
      ></CustomCard>
    </CenterCard>
  );
};
