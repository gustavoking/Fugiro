import { useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import "./signIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      signIn(email, password);
    }
  }

  return (
    <div className="container-center">
      <div className="container-title">
        <span className="fugiro">Fugiro</span>
        <span className="agro">agro</span>
      </div>

      <div className="login">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="Digite seu e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Insira sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {loadingAuth ? "Carregando..." : "Acessar"}
          </button>
        </form>

        <a href="">Contatar o suporte</a>
      </div>
    </div>
  );
}

export default SignIn;
