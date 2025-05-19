import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Footer from './components/footer/footer';
import Navbar from './components/navbar/Navbar'
import Cadastro from "./pages/cadastro/cadastro";

export const RoutesApp = () =>{
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <Navbar/>
                        <Footer/>                    
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