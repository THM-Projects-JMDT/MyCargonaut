import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../features/rootReducer";
import { routes } from "../routes";

export const ProtectedRouteBody: React.FC = ({ children }) => {
  const logedIn = useSelector((state: RootState) => state.auth.isLogedIn);

  return <>{logedIn ? <>{children}</> : <Redirect to={routes.start.path} />}</>;
};
