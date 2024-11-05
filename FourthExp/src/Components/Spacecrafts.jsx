// src/components/Spacecrafts.js
import React, { useEffect, useState } from 'react';
import { getSpacecrafts } from '../api';


const Spacecrafts = () => {
  const [spacecrafts, setSpacecrafts] = useState([]);

  useEffect(() => {
    getSpacecrafts().then((response) => setSpacecrafts(response.data.spacecrafts));
  }, []);

  return (
    <div>
      <h2>Spacecrafts</h2>
      <ul>
        {spacecrafts.map((craft, index) => (
          <li key={index}>{craft.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Spacecrafts;
