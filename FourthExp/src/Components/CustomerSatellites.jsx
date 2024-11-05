// src/components/CustomerSatellites.js
import React, { useEffect, useState } from 'react';
import { getCustomerSatellites } from '../api';

const CustomerSatellites = () => {
  const [satellites, setSatellites] = useState([]);

  useEffect(() => {
    getCustomerSatellites().then((response) => setSatellites(response.data.customer_satellites));
  }, []);

  return (
    <div>
      <h2>Customer Satellites</h2>
      <ul>
        {satellites.map((satellite, index) => (
          <li key={index}>{satellite.id} - {satellite.country}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerSatellites;
