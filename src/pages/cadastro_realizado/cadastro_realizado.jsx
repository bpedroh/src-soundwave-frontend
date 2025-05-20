import { Link } from "react-router-dom";
import './cadastro_realizado.css'

export default function Cadastro_Realizado() {
    return(
        <>  
            <div className="cadastro-container">
                <h1>Cadastro realizado com sucesso</h1>
                <h3>Agora para realizar <Link to="/login">Login</Link> você deve confirmar seus email, verifique a caixa de email.</h3>
            </div>
        </>
    )
}