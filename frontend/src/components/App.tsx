import React from "react";
import store from "../features/store";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { routes, routesArray } from "../routes";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
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
    </Provider>
  );
};

export default App;
