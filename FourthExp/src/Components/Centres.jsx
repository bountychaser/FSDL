// src/components/Centres.js
import React, { useEffect, useState } from 'react';
import { getCentres } from '../api';

const Centres = () => {
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    getCentres().then((response) => setCentres(response.data.centres));
  }, []);

  return (
    <div>
      <h2>ISRO Centres</h2>
      <ul>
        {centres.map((centre, index) => (
          <li key={index}>{centre.name} - {centre.place}</li>
        ))}
      </ul>
    </div>
  );
};

export default Centres;
