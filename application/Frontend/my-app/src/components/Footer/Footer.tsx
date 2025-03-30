import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

export interface FooterProps {
  theme: 'light' | 'dark';
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
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
        <p>&copy; 2025 ELEKTROPOL. Wszystkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
};

export default Footer;