import { RouteProps } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";

export interface Route {
  path: string;
  component: React.FC<any>;
  routeProps?: RouteProps;
  props?: any;
}

export interface Routes {
  [key: string]: Route;
}

export const routes: Routes = {
  home: {
    path: "/",
    routeProps: { exact: true },
    component: Dashboard,
  },
};

export const routesArray = Object.keys(routes).map((v) => routes[v]);
