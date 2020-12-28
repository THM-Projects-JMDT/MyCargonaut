import React from "react";
import store from "../features/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>My Cargonaut</h1>
      </div>
    </Provider>
  );
};

export default App;
