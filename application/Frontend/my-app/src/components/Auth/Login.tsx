import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { UserContext } from '../../App';

interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    type: string;
  };
  token?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)!;

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email jest wymagany';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Niepoprawny format adresu email';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Hasło jest wymagane';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Hasło musi mieć co najmniej 6 znaków';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3000/clients/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data: LoginResponse = await response.json();

        if (data.success && data.token && data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
          showNotification('Zalogowano pomyślnie', 'success');
          navigate('/');
        } else {
          showNotification(data.message || 'Błędne dane logowania', 'error');
          setErrors({ general: data.message || 'Błędne dane logowania' });
        }
      } catch (error) {
        console.error('Błąd logowania:', error);
        showNotification('Wystąpił błąd podczas logowania', 'error');
        setErrors({ general: 'Wystąpił błąd podczas logowania' });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('notification-hide');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <Link to="/logowanie" className="auth-tab active">Zaloguj się</Link>
        <Link to="/rejestracja" className="auth-tab">Zarejestruj się</Link>
      </div>
      <div className="auth-form-container">
        <h2>Logowanie</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Hasło</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          {errors.general && <div className="general-error">{errors.general}</div>}
          <button type="submit" className="auth-button">Zaloguj się</button>
        </form>
        <div className="auth-links">
          <a href="#">Zapomniałeś hasła?</a>
          <p>
            Nie masz konta? <Link to="/rejestracja">Zarejestruj się</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;