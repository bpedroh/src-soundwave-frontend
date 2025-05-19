import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './footer.css'

export default function Footer() {
  return (
    <>
      <footer className="footer-newsletter">
        <div className="footer-container">
          <div className="newsletter-content">
            <h3>Cadastre-se para receber novidades</h3>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Digite seu melhor e-mail"
                className="email-input"
              />
              <button type="submit" className="subscribe-btn">
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </footer>

      <footer className="footer-main">
        <div className="footer-container">
          <div className="footer-columns">
            <div className="footer-col">
              <h4>Sobre Nós</h4>
              <ul>
                <li><a href="/">Nossa História</a></li>
                <li><a href="/">Nossas Lojas</a></li>
                <li><a href="/">Trabalhe Conosco</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Ajuda</h4>
              <ul>
                <li><a href="/">Perguntas Frequentes</a></li>
                <li><a href="/">Trocas e Devoluções</a></li>
                <li><a href="/">Fale Conosco</a></li>
              </ul>
            </div>

            <div className="footer-col logo-col">
              <div className="footer-logo">Soundwave</div>
              <div className="social-icons">
                  <a href="#"><FaFacebook /></a>
                  <a href="#"><FaInstagram /></a>
                  <a href="#"><FaTwitter /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Soundwave. Todos os direitos reservados.</p>
            <div className="legal-links">
              <a href="/politica">Política de Privacidade</a>
              <a href="/termos">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}