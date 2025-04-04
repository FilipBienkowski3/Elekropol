import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { UserContext } from '../../App';
import './Footer.css';

const Footer: React.FC = () => {
  const { theme } = useContext(UserContext)!;

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <div className="footer-section">
          <h3>O nas</h3>
          <p>
            Jesteśmy liderem w branży elektronicznej, oferując najnowsze technologie i rozwiązania dla naszych klientów.
          </p>
        </div>
        <div className="footer-section">
          <h3>Kontakt</h3>
          <p>Email: kontakt@elektropol.pl</p>
          <p>Telefon: +48 221 692 129</p>
          <p>Adres: ul. Elektroniczna 123, 30-001 Kraków</p>
        </div>
        <div className="footer-section">
          <h3>Śledź nas</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ELEKTROPOL. Wszystkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
};

export default Footer;