import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const res = await axios.get(`http://localhost:3000/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setCar(res.data);
      } catch (err) {
        console.error('Error loading car details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!car) return <Typography>No car found</Typography>;

  return (
    <Box p={4}>
      <Card sx={{ maxWidth: 600, mx: 'auto', boxShadow: 3 }}>
        <CardMedia
          component="img"
          image={car.imageUrl}
          alt={car.model}
          sx={{ height: 300, objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {car.Brand} {car.model} ({car.year})
          </Typography>
          <Typography>Color: {car.color}</Typography>
          <Typography>Type: {car.type}</Typography>
          <Typography>Transmission: {car.transmission}</Typography>
          <Typography>Fuel Type: {car.fuelType}</Typography>
          <Typography>Mileage: {car.mileage} km</Typography>
          <Typography>Price: ₹{car.price}</Typography>
          <Typography>Region: {car.owner?.region}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CarDetailsPage;
