import { RouteProps } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { OfferPage } from "./components/OfferPage";
import { Registration } from "./components/Registration";
import { StartPage } from "./components/StartPage";
import { ProfilePage } from "./components/ProfilePage";
import { VehiclePage } from "./components/VehiclePage";
import { AddRequestPage } from "./components/AddRequestPage";
import { AddOfferPage } from "./components/AddOfferPage";

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
  start: {
    path: "/",
    routeProps: { exact: true },
    component: StartPage,
  },
  home: {
    path: "/home",
    routeProps: { exact: true },
    component: Dashboard,
  },
  login: {
    path: "/login",
    component: Login,
  },
  createAccount: {
    path: "/account/create",
    component: Registration,
  },
  profile: {
    path: "/profile",
    component: ProfilePage,
  },
  vehicles: {
    path: "/vehicles",
    component: VehiclePage,
  },
  offers: {
    path: "/offers",
    routeProps: { exact: true },
    props: { show: "offers" },
    component: OfferPage,
  },
  requests: {
    path: "/requests",
    routeProps: { exact: true },
    props: { show: "requests" },
    component: OfferPage,
  },
  addRequest: {
    path: "/requests/create",
    component: AddRequestPage,
  },
  addOffer: {
    path: "/offers/create",
    component: AddOfferPage,
  },
};

export const routesArray = Object.keys(routes).map((v) => routes[v]);
