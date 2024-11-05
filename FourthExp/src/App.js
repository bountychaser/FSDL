// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Spacecrafts from './Components/Spacecrafts';
import Launchers from './Components/Launchers';
import CustomerSatellites from './Components/CustomerSatellites';
import Centres from './Components/Centres';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/spacecrafts">Spacecrafts</Link>
          <Link to="/launchers">Launchers</Link>
          <Link to="/customer-satellites">Customer Satellites</Link> 
          <Link to="/centres">Centres</Link>
        </nav>
        <Routes>
          <Route path="/spacecrafts" element={<Spacecrafts />} />
          <Route path="/launchers" element={<Launchers />} />
          <Route path="/customer-satellites" element={<CustomerSatellites />} />
          <Route path="/centres" element={<Centres />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
