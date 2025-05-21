import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {changePassword} from './mudarSenhaService'
import './mudarSenha.css'


export default function MudarSenha() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    novaSenha: '',
    confirmarNovaSenha: ''

  });

   const { id } = useParams();

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
    const resultado = await changePassword(formData, id);
    if(resultado.success){
        alert("Mudança realizada com sucesso!")
        navigate('/')
    }else{
        alert(resultado.message)
    }
    setIsSubmitting(false);
  };
    return (
       <div className='mudar_senha_wrapper'>
        <form className='mudar_senha_form' onSubmit={handleSubmit}>
        <h2>Crie sua conta</h2>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="novaSenha"
            name="novaSenha"
            value={formData.novaSenha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmar_senha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarNovaSenha"
            name="confirmarNovaSenha"
            value={formData.confirmarNovaSenha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Alterando' : 'Alterar'}
        </button>

        <p className="login-link">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
    )
}