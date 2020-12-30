import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";
import { ReactComponent as CargoCoinsIcon } from "../../assets/images/CargoCoins.svg";

export const CargoCoins: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <CargoCoinsIcon />
    </SvgIcon>
  );
};
