import { useContext, useReducer } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const urlRegister = "http://localhost:3000/register";
  const urlFazenda = "http://localhost:3000/fazenda";

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

  if (signed && urlRegister && user.tipo === "comum") {
    alert("você nao pode acessar essa página");
    return <Redirect to="/dashboard" />;
  }
  if (signed && urlFazenda.includes("fazenda") && user.tipo === "comum") {
    alert("você nao pode acessar essa página");
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
