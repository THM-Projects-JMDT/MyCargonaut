import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "../features/authSlice";
import { RootState } from "../features/rootReducer";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      display: "flex",
      justifyContent: "center",
      height: "100%",
      alignItems: "center",
    },
  })
);

export const AuthCheck: React.FC = ({ children }) => {
  const classes = useStyles();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  return auth.isLoading ? (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  ) : (
    <>{children}</>
  );
};
