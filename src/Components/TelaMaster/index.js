import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi'
import { FiUserPlus } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth';
import './master.css'

export default function TelaMaster() {
    const { signOut, user } = useContext(AuthContext);

    return (
    <div className='container'>
        <div className='header'>
            <button onClick={ () => signOut() } className='btn-logout'>
                <BiLogOut color='black' size={30} className='icon-out'/>
            </button>

            {user.tipo == 'master' ? <Link to='/register'>
                <div className='container-adduser'>
                    <span>Adicionar usuário</span>
                    <FiUserPlus size={30} color='black'/>
                </div>
            </Link> : ''}
        </div>
            
            
    </div>
    );
    }