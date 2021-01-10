// Inspired by https://dev.to/slawomirkolodziej/guide-testing-redux-connected-components-with-react-testing-library-and-jest-43j7

import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { createStore } from "redux";
import { Provider, RootStateOrAny } from "react-redux";
import reducer from "../features/rootReducer";

export interface RenderOptionsWithState extends RenderOptions {
  initalState?: RootStateOrAny;
}

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
  { initalState, ...renderOptions }: RenderOptionsWithState = {}
) => {
  const store = createStore(reducer, initalState);
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
