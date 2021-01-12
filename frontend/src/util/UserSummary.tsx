import { Avatar, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";

export interface UserSummaryProps {
  username?: string;
  rating?: number; // TODO: use 'Stars' type
  userId?: string;
}

export const UserSummary: React.FC<UserSummaryProps> = ({
  username,
  rating,
  userId,
}) => {
  return (
    <div>
      <div>
        <Rating defaultValue={rating ? rating : 0} size="small" readOnly />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          src={`/api/v1/user/profile/${userId}`}
          data-testid="avatar-icon"
        />
      </div>
      <Typography variant="caption">{username ? username : ""}</Typography>
    </div>
  );
};
