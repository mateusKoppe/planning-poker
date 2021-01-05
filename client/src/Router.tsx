import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateGame from "pages/CreateGame";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create-game" component={CreateGame} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
