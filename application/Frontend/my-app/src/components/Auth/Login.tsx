import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Logowanie:', { email, password });
      navigate('/');
    }
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
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
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