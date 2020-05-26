import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewTwott from "./twotts/pages/NewTwott";
import UserTwotts from "./twotts/pages/UserTwotts";
import UpdateTwott from "./twotts/pages/UpdateTwott";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/twotts" exact>
            <UserTwotts />
          </Route>
          <Route path="/twotts/new" exact>
            <NewTwott />
          </Route>
          <Route path="/twotts/:twottId">
            <UpdateTwott />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
