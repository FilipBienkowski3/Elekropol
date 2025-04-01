import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  faSearch,
  faPhone,
  faMapMarkerAlt,
  faShoppingCart,
  faUser,
  faSun,
  faMoon,
  faSignOutAlt,
  faPlus,
  faTrash,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { UserContext } from '../../App';

export interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext)!;
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleProfileClick = () => {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate('/logowanie');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setShowUserMenu(false);
    navigate('/');

    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = 'Wylogowano pomyślnie';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('notification-hide');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleAddProductClick = () => {
    navigate('/add-product');
  };

  const handleDeleteProductClick = () => {
    navigate('/delete-product');
  };

  const handleDeleteUserClick = () => {
    navigate('/delete-user');
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
          <div className="user-container">
            {user && <span className="user-greeting">Cześć, {user.firstName}!</span>}
            <FontAwesomeIcon
              icon={faUser}
              className="profile-icon"
              onClick={handleProfileClick}
            />
            {showUserMenu && user && (
              <div className="user-menu">
                <div className="user-menu-item" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Wyloguj
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="down">
        <nav className="nav">
          <ul>
            <li
              className={location.pathname === '/' ? 'active' : ''}
              onClick={handleHomeClick}
            >
              Strona główna
            </li>
            {user?.type === 'manager' && (
              <>
                <li
                  className={location.pathname === '/add-product' ? 'active' : ''}
                  onClick={handleAddProductClick}
                >
                  <FontAwesomeIcon icon={faPlus} /> Dodaj produkt
                </li>
                <li
                  className={location.pathname === '/delete-product' ? 'active' : ''}
                  onClick={handleDeleteProductClick}
                >
                  <FontAwesomeIcon icon={faTrash} /> Usuń produkt
                </li>
                <li
                  className={location.pathname === '/delete-user' ? 'active' : ''}
                  onClick={handleDeleteUserClick}
                >
                  <FontAwesomeIcon icon={faUsers} /> Usuń użytkownika
                </li>
              </>
            )}
            {(user === null || user?.type === 'client') && (
              <>
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
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;