import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';


const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;