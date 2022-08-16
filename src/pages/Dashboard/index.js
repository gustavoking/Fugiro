
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

export default function Dashboard(){
  const { signOut, user } = useContext(AuthContext);

  return(
    <div>
      <h1>PAGINA DASHBOARD</h1>
      <button onClick={ () => signOut() }>Fazer logout</button>
      {user.tipo == 'master' ? <Link to='/register'>Cadastrar novo usuário</Link> : ''}
    </div>
  )
}