import React from "react";
import store from "../features/store";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { routes, routesArray, Route as RouteType } from "../routes";
import { Header } from "./Header";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../assets/theme";
import { ProtectedRouteBody } from "../util/ProtectedRouteBody";
import { AuthCheck } from "../util/AuthCheck";

const App = () => {
  const renderRoute = (r: RouteType) => (
    <Route path={r.path} key={r.path} {...r.routeProps}>
      <>
        {r.protected ? (
          <ProtectedRouteBody>
            {<r.component {...r.props} />}
          </ProtectedRouteBody>
        ) : (
          <>{<r.component {...r.props} />}</>
        )}
      </>
    </Route>
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthCheck>
          <BrowserRouter>
            <Header />
            <Switch>
              {routesArray.map(renderRoute)}
              <Route>
                <Redirect to={routes.home.path} />
              </Route>
            </Switch>
          </BrowserRouter>
        </AuthCheck>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
