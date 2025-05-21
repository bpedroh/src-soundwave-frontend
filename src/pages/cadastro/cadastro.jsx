import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Cadastro.css'
import {enviarCadastro} from './cadastroService'

export default function Cadastro() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmar_senha: ''
  });

   const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    const resultado = await enviarCadastro(formData);
    if(resultado.success){
        navigate('/cadastro-realizado')
    }else{
        alert(resultado.message)
    }
    setIsSubmitting(false);
  };
    return (
       <div className='cadastro_wrapper'>
        <form className='cadastro_form' onSubmit={handleSubmit}>
        <h2>Crie sua conta</h2>

        <div className="form-group">
          <label htmlFor="nome">Nome completo</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmar_senha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmar_senha"
            name="confirmar_senha"
            value={formData.confirmar_senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="login-link">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
    )
}