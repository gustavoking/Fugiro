import { useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import "./signIn.css";
import logo from "../../assets/iconFA.png";

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
      <div className="login">
        <img className="imageee" src={logo} />

        <form className="form" onSubmit={handleSubmit}>
          <div className="divfugiroagro">
            <span className="titulo-fugiro">Fugiro</span>
            <span className="titulo-agro">Agro</span>
          </div>
          <input
            className="input2"
            type="text"
            placeholder="Digite seu e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input2"
            type="password"
            placeholder="Insira sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="botao">
            {loadingAuth ? "Carregando..." : "Acessar"}
          </button>
        </form>

        <a href="">Contatar o suporte</a>
      </div>
    </div>
  );
}

export default SignIn;
