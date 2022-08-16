
import { useState, useContext } from 'react';

import { AuthContext } from '../../contexts/auth';
import './signin.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth} = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    
    if(email !== '' && password !== ''){
      signIn(email, password)
    }


  }

  return (
    <div className="container-center">
      <div className="login">

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } />
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
        </form>  

      </div>
    </div>
  );
}

export default SignIn;
