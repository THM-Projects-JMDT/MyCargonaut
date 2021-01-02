import { Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React from "react";

export interface UserSummaryProps {
  username?: string;
  rating?: number; // TODO: use 'Stars' type
}

export const UserSummary: React.FC<UserSummaryProps> = ({
  username,
  rating,
}) => {
  return (
    <div>
      <div>
        <Rating defaultValue={rating ? rating : 0} size="small" readOnly />
      </div>
      <div>
        <div>
          <AccountCircle fontSize="large" data-testid="avatar-icon" />
        </div>
      </div>
      <Typography variant="caption">{username ? username : ""}</Typography>
    </div>
  );
};
