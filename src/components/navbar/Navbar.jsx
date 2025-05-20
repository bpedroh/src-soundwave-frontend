import React, { useState } from 'react';
import './Navbar.css';
import { FaBars, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Navbar() {

  return (
    <header>
      <nav className='navbar'>
        <div className='navbar_top'>
            <a>Bem vindo</a>
        </div>
        <div className='navbar_middle'>
             <div className="logo">Soundwave</div>
            <div className="search-box">
                <input type="text" placeholder="Buscar por" />
                <FaSearch />
            </div>
            <div className="user-wrapper">
            <div className='icon-group'>
                 <FaUser className="user-icon" />
                 <div className="user-text">
                    <div><Link to="/cadastro">Cadastre-se</Link></div>
                    <div>ou faça <Link to="/login">Login</Link></div>
                </div>
            </div>
            <div className='icon-group'>
                <FaShoppingCart className="user-icon"/>
                <div className='user-text'><a href=''>Carrinho</a></div>
            </div>
            </div>
        </div>
        <div className='navbar_bottom'>
            <ul>
                <li><a href="#">Início</a></li>
                <li><a href="#">Serviços</a></li>
                <li><a href="#">Produtos</a></li>
                <li><a href="#">Sobre nós</a></li>
                <li><a href="#">Contato</a></li>
            </ul>
        </div>
      </nav>
    </header>
  );
}