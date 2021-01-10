// Inspired by https://dev.to/slawomirkolodziej/guide-testing-redux-connected-components-with-react-testing-library-and-jest-43j7

import React from "react";
import {
  fireEvent,
  Matcher,
  render,
  RenderOptions,
  SelectorMatcherOptions,
} from "@testing-library/react";
import { Provider, RootStateOrAny } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/rootReducer";

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
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initalState,
  });

  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export const setInputValue = (
  getByTestId: (
    text: Matcher,
    options?: SelectorMatcherOptions | undefined,
    waitForElementOptions?: unknown
  ) => HTMLElement,
  label: string,
  value: string
) => {
  // Get Input Element from Material ui TextField (TODO improve?)
  const input = getByTestId(label).children[1].children[0];
  fireEvent.change(input, { target: { value: value } });
};
