import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DeleteUser from './components/DeleteUser/DeleteUser';
import AddProduct from './components/AddProduct/AddProduct';
import DeleteProduct from './components/DeleteProduct/DeleteProduct';
import ProductPage from './components/ProductPage/ProductPage';
import CartPage from './components/CartPage/CartPage';
import './App.css';

export interface CartItem {
  productCode: string;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  image: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        sessionStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem('cart', JSON.stringify(cart));
    } else {
      sessionStorage.removeItem('cart');
    }
  }, [cart]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const ManagerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!user || user.type !== 'manager') {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <UserContext.Provider value={{ user, setUser, cart, setCart, theme, toggleTheme }}>
      <Router>
        <div className={`app ${theme}`}>
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/logowanie" element={<Login />} />
              <Route path="/rejestracja" element={<Register />} />
              <Route path="/delete-user" element={<ManagerRoute><DeleteUser /></ManagerRoute>} />
              <Route path="/add-product" element={<ManagerRoute><AddProduct /></ManagerRoute>} />
              <Route path="/delete-product" element={<ManagerRoute><DeleteProduct /></ManagerRoute>} />
              <Route path="/product/:productCode" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;