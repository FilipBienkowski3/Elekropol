import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';

export interface UserContextType {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    type: string;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<UserContextType['user']>>;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [user, setUser] = useState<UserContextType['user']>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Błąd parsowania danych użytkownika:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className={`app ${theme}`}>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/logowanie" element={<Login />} />
              <Route path="/rejestracja" element={<Register />} />
            </Routes>
          </div>
          <Footer theme={theme} />
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;