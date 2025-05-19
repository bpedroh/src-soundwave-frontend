
import './App.css'
import Footer from './components/footer/footer';
import Navbar from './components/navbar/Navbar'
import Cadastro from './pages/cadastro/cadastro'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {

  return (
    <>
      <Navbar/>
      
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} /> 
      </Routes>
      <Footer />
    </>
    
  )

  
}

export default App
