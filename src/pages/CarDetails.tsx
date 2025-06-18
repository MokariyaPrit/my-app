// src/pages/CarDetails.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, CardMedia } from '@mui/material';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`http://localhost:3000/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCar(response.data);
      } catch (error) {
        console.error('Failed to fetch car:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!car) return <Typography variant="h6">Car not found</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h4">{car.make} {car.model}</Typography>
      <CardMedia
        component="img"
        height="300"
        image={car.imageUrl}
        alt={`${car.make} ${car.model}`}
        sx={{ my: 2, borderRadius: 2 }}
      />
      <Typography variant="body1"><strong>Year:</strong> {car.year}</Typography>
      <Typography variant="body1"><strong>Color:</strong> {car.color}</Typography>
    </Box>
  );
};

export default CarDetails;
