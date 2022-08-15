import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";

import "./signIn.css";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (nome !== "" && email !== "" && password !== "") {
      // signUp(email, password);
    }
  }

  return (
    <div className="container">
      <div className="login-container">
        <img />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {loadingAuth ? "Carregando..." : "Cadastrar"}
          </button>
        </form>

        <Link to="/dashboard" className="link">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
