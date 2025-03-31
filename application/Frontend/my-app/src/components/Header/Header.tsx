import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faSearch,
  faPhone,
  faMapMarkerAlt,
  faShoppingCart,
  faUser,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import './Header.css';

export interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/logowanie');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className={`header ${theme}`}>
      <div className="up">
        <div className="logo">ELEKTROPOL</div>
        <div className="location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
          <span>Kraków</span>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Wyszukaj..." />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        <div className="contact">
          <FontAwesomeIcon icon={faPhone} className="phone-icon" />
          <span>+48 221 692 129</span>
        </div>
        <div className="language-switcher">
          <span
            className={theme === 'light' ? 'active' : ''}
            onClick={() => toggleTheme()}
          >
            EN
          </span>
          |
          <span
            className={theme === 'dark' ? 'active' : ''}
            onClick={() => toggleTheme()}
          >
            PL
          </span>
        </div>
        <div className="theme-switcher">
          <FontAwesomeIcon
            icon={faSun}
            className={`sun-icon ${theme === 'light' ? 'active' : ''}`}
            onClick={toggleTheme}
          />
          <FontAwesomeIcon
            icon={faMoon}
            className={`moon-icon ${theme === 'dark' ? 'active' : ''}`}
            onClick={toggleTheme}
          />
        </div>
        <div className="icons">
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          <FontAwesomeIcon 
            icon={faUser} 
            className="profile-icon" 
            onClick={handleProfileClick}
          />
        </div>
      </div>
      <div className="down">
        <nav className="nav">
          <ul>
            <li className="active" onClick={handleHomeClick}>Strona główna</li>
            <li>Promocje</li>
            <li>Laptopy</li>
            <li>Komputery</li>
            <li>Podzespoły komputerowe</li>
            <li>TV i audio</li>
            <li>Smart home i lifestyle</li>
            <li>Akcesoria</li>
            <li>Smartfony i smartwatche</li>
            <li>Gaming i streaming</li>
            <li>Urządzenia peryferyjne</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;