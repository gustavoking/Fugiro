import React from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/auth';


export default function TelaComum() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <div>
          <button onClick={ () => signOut() }>Fazer logout</button>
          telacomum
    </div>
  );
  }