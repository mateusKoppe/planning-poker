import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateGame from "pages/CreateGame";
import Game from "pages/Game";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create-game" component={CreateGame} />
        <Route exact path="/game/:gameId" component={Game} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
