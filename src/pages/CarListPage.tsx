import { useEffect, useState } from 'react';
import CarGrid from '../pages/CarGrid';
import axios from 'axios';

const CarListPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:3000/cars', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(response.data);
    };
    fetchCars();
  }, []);

  return <CarGrid cars={cars} />;
};

export default CarListPage;
