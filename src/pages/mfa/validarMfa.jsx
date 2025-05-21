import React, { useRef, useState, useMemo } from 'react';
import './validarMfa.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function ValidarMfa() {
  const [code, setCode] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const {id} = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth} = useContext(AuthContext);

  const isComplete = useMemo(() => {
    return code.every(digit => digit !== '');
  }, [code]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    if (!isComplete || loading) return;

    setLoading(true);
    const token = code.join('');

    try {
      const response = await fetch(`http://localhost:8080/mfa/validate?userId=${id}&code=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert('Erro: ' + errorText);
      } else {
        alert('Código MFA validado com sucesso!');
        await checkAuth()
        navigate('/')
      }
    } catch (err) {
      alert('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mfa-input-wrapper">
      <h2>Inserir código MFA</h2>
      <div className="mfa-inputs">
        {code.map((digit, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            ref={(el) => (inputs.current[i] = el)}
            className="mfa-digit"
          />
        ))}
      </div>
      <button 
        className={`mfa-button ${!isComplete || loading ? 'disabled' : ''}`} 
        onClick={handleSubmit}
        disabled={!isComplete || loading}
      >
        {loading ? 'Validando...' : 'Validar'}
      </button>
    </div>
  );
}