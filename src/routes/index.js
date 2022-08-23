import { useContext } from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

import Dashboard from "../pages/Dashboard";
import { AuthContext } from "../contexts/auth";

export default function Routes() {
  const { user, signed } = useContext(AuthContext);
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} isPrivate />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}
