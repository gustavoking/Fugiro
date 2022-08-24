import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiLogOut, BiSearchAlt } from 'react-icons/bi'
import { FiUserPlus, FiTrash2 } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth';
import './master.css'

export default function TelaMaster() {
    const { signOut, user } = useContext(AuthContext);

    return (
    <div className='container'>
        <div className='header-title'>
            <span className='title-fugiro'>Fugiro</span>
            <span className='title-agro'>Agro</span>
        </div>
        <div className='header'>
            <div className='header-user'>
                <button onClick={ () => signOut() } className='btn-logout'>
                    <BiLogOut color='black' size={30} className='icon-out'/>
                </button>

                <span> {user.nome} </span>
            </div>

            {user.tipo == 'master' ? <Link to='/register'>
                <div className='container-adduser'>
                    <FiUserPlus size={25} color='black'/>
                    <span>Adicionar usuário</span>
                    
                </div>
            </Link> : ''}
        </div>
            
        <div className='container-fazendas'>
            <span className='title-fazendas'>Lista de fazendas</span>

            <div className='lista-fazendas'>
                <div className='item-fazenda'>
                    <span>Fazenda Serrana</span>
                    <div className='fazenda-options'>
                        <BiSearchAlt size={20} color='#ee936f'/>
                        <FiTrash2 size={20} color='#ee936f'/>
                    </div>
                </div>

                <div className='item-fazenda'>
                    <span>Fazenda Serrana</span>
                    <div className='fazenda-options'>
                        <BiSearchAlt size={20} color='#ee936f'/>
                        <FiTrash2 size={20} color='#ee936f'/>
                    </div>
                </div>

                <div className='item-fazenda'>
                    <span>Fazenda Serrana</span>
                    <div className='fazenda-options'>
                        <BiSearchAlt size={20} color='#ee936f'/>
                        <FiTrash2 size={20} color='#ee936f'/>
                    </div>
                </div>

                <div className='item-fazenda'>
                    <span>Fazenda Serrana</span>
                    <div className='fazenda-options'>
                        <BiSearchAlt size={20} color='#ee936f'/>
                        <FiTrash2 size={20} color='#ee936f'/>
                    </div>
                </div>

                <div className='item-fazenda'>
                    <span>Fazenda Serrana</span>
                    <div className='fazenda-options'>
                        <BiSearchAlt size={20} color='#ee936f'/>
                        <FiTrash2 size={20} color='#ee936f'/>
                    </div>
                </div>

                <div className='item-fazenda'>
                    <span>Fazenda Serrana</span>
                    <div className='fazenda-options'>
                        <BiSearchAlt size={20} color='#ee936f'/>
                        <FiTrash2 size={20} color='#ee936f'/>
                    </div>
                </div>

                <div className='item-fazenda'>
                    <span>Fazenda Serrana</span>
                    <div className='fazenda-options'>
                        <BiSearchAlt size={20} color='#ee936f'/>
                        <FiTrash2 size={20} color='#ee936f'/>
                    </div>
                </div>

                <div className='item-fazenda'>
                    <span>Fazenda Serrana</span>
                    <div className='fazenda-options'>
                        <BiSearchAlt size={20} color='#ee936f'/>
                        <FiTrash2 size={20} color='#ee936f'/>
                    </div>
                </div>

                <div className='item-fazenda'>
                    <span>Fazenda Serrana</span>
                    <div className='fazenda-options'>
                        <BiSearchAlt size={20} color='#ee936f'/>
                        <FiTrash2 size={20} color='#ee936f'/>
                    </div>
                </div>
            </div>
        </div>
            
    </div>
    );
    }