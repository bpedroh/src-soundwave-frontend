import './login.css'
import {enviarLogin} from './loginService'
import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    const resultado = await enviarLogin(formData);
    if(resultado.success){
        alert("sucesso")
    }else{
        alert(resultado.message)
    }
  }
  return (
    <>
        <div className='login_wrapper'>
        <form className='login_form' onSubmit={handleSubmit}>
        <h2>Faça login</h2>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Login
        </button>

        <p className="cadastro-link">
          Não tem uma conta? <Link to="/cadastro">Crie agora!</Link>
        </p>
        <p className="cadastro-link">
          Esqueceu sua senha? <Link to="/cadastro">Recuperar!</Link>
        </p>
      </form>
    </div>
    </>
  )

};