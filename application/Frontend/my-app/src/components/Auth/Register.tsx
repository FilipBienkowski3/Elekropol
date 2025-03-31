import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface RegisterErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Polska'
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors: RegisterErrors = {};
    let isValid = true;

    if (!form.firstName) {
      newErrors.firstName = 'Imię jest wymagane';
      isValid = false;
    }

    if (!form.lastName) {
      newErrors.lastName = 'Nazwisko jest wymagane';
      isValid = false;
    }

    if (!form.email) {
      newErrors.email = 'Email jest wymagany';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Niepoprawny format adresu email';
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = 'Hasło jest wymagane';
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Hasło musi mieć co najmniej 6 znaków';
      isValid = false;
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Potwierdź hasło';
      isValid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Hasła nie są identyczne';
      isValid = false;
    }

    if (!form.street) {
      newErrors.street = 'Ulica jest wymagana';
      isValid = false;
    }

    if (!form.city) {
      newErrors.city = 'Miasto jest wymagane';
      isValid = false;
    }

    if (!form.postalCode) {
      newErrors.postalCode = 'Kod pocztowy jest wymagany';
      isValid = false;
    } else if (!/^\d{2}-\d{3}$/.test(form.postalCode)) {
      newErrors.postalCode = 'Kod pocztowy musi być w formacie XX-XXX';
      isValid = false;
    }

    if (!form.country) {
      newErrors.country = 'Kraj jest wymagany';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Rejestracja:', form);
      navigate('/logowanie');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <Link to="/logowanie" className="auth-tab">Zaloguj się</Link>
        <Link to="/rejestracja" className="auth-tab active">Zarejestruj się</Link>
      </div>
      <div className="auth-form-container">
        <h2>Rejestracja</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Imię</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Nazwisko</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Potwierdź hasło</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>
          <h3>Adres</h3>
          <div className="form-group">
            <label htmlFor="street">Ulica</label>
            <input
              type="text"
              id="street"
              name="street"
              value={form.street}
              onChange={handleChange}
              className={errors.street ? 'error' : ''}
            />
            {errors.street && <span className="error-message">{errors.street}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">Miasto</label>
              <input
                type="text"
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Kod pocztowy</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="XX-XXX"
                className={errors.postalCode ? 'error' : ''}
              />
              {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="country">Kraj</label>
            <select
              id="country"
              name="country"
              value={form.country}
              onChange={handleChange}
              className={errors.country ? 'error' : ''}
            >
              <option value="Polska">Polska</option>
              <option value="Niemcy">Niemcy</option>
              <option value="Czechy">Czechy</option>
              <option value="Słowacja">Słowacja</option>
            </select>
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>
          <button type="submit" className="auth-button">Zarejestruj się</button>
        </form>
        <div className="auth-links">
          <p>
            Masz już konto? <Link to="/logowanie">Zaloguj się</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;