// src/components/Launchers.js
import React, { useEffect, useState } from 'react';
import { getLaunchers } from '../api';

const Launchers = () => {
  const [launchers, setLaunchers] = useState([]);

  useEffect(() => {
    getLaunchers().then((response) => setLaunchers(response.data.launchers));
  }, []);

  return (
    <div>
      <h2>Launchers</h2>
      <ul>
        {launchers.map((launcher, index) => (
          <li key={index}>{launcher.id} - {launcher.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Launchers;
