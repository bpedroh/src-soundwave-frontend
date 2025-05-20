import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './confirmar_email.css'

export default function Confirmar_email() {

    const { id, token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const confirmarEmail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/token/validate-token/${id}/${token}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                
                const data = await response;

                if (!response.ok) {
                    throw new Error(await response.text());
                } 

                setSuccess(true);
        
                setTimeout(() => navigate('/login'), 3000);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        confirmarEmail();
    }, [id, token, navigate])

    return (
    <div className="confirmacao-container">
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Validando seu e-mail...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <h2>😕 Ocorreu um erro</h2>
          <p>{error}</p>
          <div className="actions">
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      ) : success ? (
        <div className="success-state">
          <h2>🎉 E-mail confirmado!</h2>
          <p>Redirecionando para o login...</p>
          <div className="spinner-small"></div>
        </div>
      ) : null}
    </div>
  );
}