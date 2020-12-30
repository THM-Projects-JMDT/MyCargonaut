import React from "react";
import store from "../features/store";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { routes, routesArray } from "../routes";
import { Header } from "./Header";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../assets/theme";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Switch>
            {routesArray.map((r) => (
              <Route path={r.path} key={r.path} {...r.routeProps}>
                {<r.component {...r.props} />}
              </Route>
            ))}
            <Route>
              <Redirect to={routes.home.path} />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
