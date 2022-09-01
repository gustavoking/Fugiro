import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const urlRegister = "http://localhost:3000/register";

  const { signed, loading, user } = useContext(AuthContext);

  if (loading) {
    return <div></div>;
  }

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  if (signed && window.location.href === urlRegister && user.tipo === "comum") {
    return <Redirect to="/dashboard" />;
  }

  if (
    signed &&
    window.location.href.includes("fazenda") &&
    user.tipo === "comum"
  ) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
