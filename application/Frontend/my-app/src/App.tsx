import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AddPerson from './components/AddPerson';
import UpdatePerson from './components/UpdatePerson';
import DeletePerson from './components/DeletePerson';
import PersonList from './components/PersonList';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Person</Link>
            </li>
            <li>
              <Link to="/update">Update Person</Link>
            </li>
            <li>
              <Link to="/delete">Delete Person</Link>
            </li>
            <li>
              <Link to="/list">Person List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPerson />} />
          <Route path="/update" element={<UpdatePerson />} />
          <Route path="/delete" element={<DeletePerson />} />
          <Route path="/list" element={<PersonList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;