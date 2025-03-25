"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ChildrenInterface } from "@AppTypes/common";
import { persistor, store } from "@Store/store";

const ReduxProvider = ({ children }: ChildrenInterface) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
export default ReduxProvider;
