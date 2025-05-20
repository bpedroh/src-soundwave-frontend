import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Footer from './components/footer/footer';
import Navbar from './components/navbar/Navbar'
import Cadastro from "./pages/cadastro/cadastro";
import Home from "./pages/home/home";
import Cadastro_Realizado from './pages/cadastro_realizado/cadastro_realizado'
import Login from './pages/login/login'
import Confirmar_email from './pages/confirmar_email/confirmar_email'

export const RoutesApp = () =>{
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <Navbar/>
                        <Home/>
                        <Footer/>                    
                    </>
                }/>
                <Route path="/cadastro-realizado" element={
                    <>
                        <Navbar />
                        <Cadastro_Realizado />
                        <Footer />

                    </>
                }/>
                <Route path="/login" element={
                    <>
                        <Navbar />
                        <Login />
                        <Footer />

                    </>
                }/>
                <Route path="/confirmar-email/:id/:token" element={
                    <>
                        <Navbar />
                        <Confirmar_email />
                        <Footer />

                    </>
                }/>
                <Route path="/cadastro" element={
                    <>  
                        <Navbar/>
                        <Cadastro/>
                        <Footer/> 
                    </>
                }/>
                    
            </Routes>
        </Router>
    )
}
export default RoutesApp;