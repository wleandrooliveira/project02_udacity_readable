import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppTitle from "./AppTitle";
import Category from "./Category";
import Navigation from "./Navigation";
import PostDetail from "./PostDetail";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <AppTitle />
        <Navigation />
        <Switch>
          <Route exact path="/" component={Category} />
          <Route exact path="/:category" component={Category} />
          <Route exact path="/:category/:post" component={PostDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
