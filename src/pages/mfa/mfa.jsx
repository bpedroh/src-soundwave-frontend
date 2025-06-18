import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './mfa.css'
import { AuthContext } from '../../contexts/AuthContext';

export default function Mfa() {

    const { id } = useParams();
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const { isAuthenticated, checkAuth} = useContext(AuthContext);

     if (!isAuthenticated) {
      return navigate('/login');
    }

    useEffect(() => {
        const mfaSetup = async () => {
            try {
                const response = await fetch(`http://localhost:8080/mfa/setup?userId=${id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                
                if (!response.ok) {
                    throw new Error(await response.text());
                } 

                const imageBlob = await response.blob();
                const imageObjectUrl = URL.createObjectURL(imageBlob);
                setQrCodeUrl(imageObjectUrl);
                
            } catch (err) {
                setError(err.message);
            }
        };

        mfaSetup();
    }, [id])

    return(
        <>
            <div className='mfa_container'>
                <h1>Para seguir é necessário utilizar MFA</h1>
                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code MFA" />}
                <h2>Utilize o autenticador para cadastrar o QRCODE</h2>
                <h3>Após o cadastro, clique em:</h3>
                <Link to={`/validar-mfa/${id}`} className='botao-link'>Continuar</Link>
            </div>
        </>
    )
}