import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewTwott from "./twotts/pages/NewTwott";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/twotts/new" exact>
          <NewTwott />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
