import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "store";

import Router from "./Router";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <Router />
    </ReduxProvider>
  )
}

export default App;
