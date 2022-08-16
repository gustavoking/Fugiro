import { toast } from 'react-toastify';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';


function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [tipo, setTipo] = useState('')

  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(e){
    e.preventDefault();
    
    if(nome !== '' && email !== '' && password !== '' && tipo !== ''){
      await signUp(email, password, nome, tipo)

      setNome('')
      setEmail('')
      setPassword('')
      setTipo('')

    }else{
      toast.error('Preencha todos os campos!')
    }

  }

  return (
    <div className="container-center">
      <div className="login">

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar uma conta</h1>
          <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } />

          <input type='radio' name='radio-type' value='master' onChange={() => setTipo('master')}/>
          <input type='radio' name='radio-type' value='comum' onChange={() => setTipo('comum')}/>

          <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
        </form>  

        <Link to="/dashboard">Voltar para o dash</Link>
      </div>
    </div>
  );
}

export default SignUp;
