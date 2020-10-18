import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Files/home";
import About from "../Files/about";
import Movie from "../Files/movie";
import Login from "../Files/login";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/movie">
        <Movie />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  );
};

export default Routes;