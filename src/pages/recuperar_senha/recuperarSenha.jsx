import { useState } from 'react';
import { sendChangePasswordEmail } from './recuperarSenhaService';
import { Link } from "react-router-dom";
import './recuperarSenha.css'

export default function RecuperarSenha() {

    const [formData, setFormData] = useState({
        email: '',
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
        const resultado = await sendChangePasswordEmail(formData);
        if(resultado.success){
            alert("enviado com sucesso, verifique seu email")
        }else{
            alert(resultado.message)
        }
        setIsSubmitting(false);
      };


    return(
        <>
            <div className='recuperar_senha_wrapper'>
            <form className='recuperar_senha_form' onSubmit={handleSubmit}>
            <h2>Recuperar senha</h2>

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

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Recuperar'}
            </button>

             <p className="login-link">
             Se houver uma conta, será enviado um email.
            </p>
            </form>
            </div>
        </>
    )
}