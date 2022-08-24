import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import TelaMaster from "../../Components/TelaMaster";
import TelaComum from "../../Components/TelaComum";

export default function Dashboard() {
  const { signOut, user } = useContext(AuthContext);

  if (user.tipo == "master") {
    return <TelaMaster />;
  } else {
    return <TelaComum />;
  }
}
