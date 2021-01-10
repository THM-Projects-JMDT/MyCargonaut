// Inspired by https://dev.to/slawomirkolodziej/guide-testing-redux-connected-components-with-react-testing-library-and-jest-43j7

import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../features/rootReducer";

export const renderWithState = (
  ui: React.ReactElement<
    any,
    | string
    | ((
        props: any
      ) => React.ReactElement<
        any,
        string | any | (new (props: any) => React.Component<any, any, any>)
      > | null)
    | (new (props: any) => React.Component<any, any, any>)
  >,
  { initialState, ...renderOptions }: any = {}
) => {
  const store = createStore(reducer, initialState);
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
