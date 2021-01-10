import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../features/rootReducer";
import { routes } from "../routes";

export function useNotLoggedIn() {
  const history = useHistory();
  const logedIn = useSelector((state: RootState) => state.auth.isLogedIn);

  useEffect(() => {
    if (logedIn) history.push(routes.home.path);
  }, [logedIn, history]);
}
