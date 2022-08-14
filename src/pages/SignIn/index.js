import React from "react";
import { Link } from "react-router-dom";

import "./signIn.css";

export default function SignIn() {
  return (
    <div className="container">
      <div className="login-container">
        <img />

        <input placeholder="Usuário" />
        <input placeholder="Senha" type="password" />

        <Link to="/dashboard" className="link">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
