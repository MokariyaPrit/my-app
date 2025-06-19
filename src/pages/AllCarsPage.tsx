import  { useEffect, useState } from 'react';
import {
  Container, Grid, Card, CardMedia, CardContent, Typography, Button, CardActions,
} from '@mui/material';
import axios from 'axios';

const AllCarsPage = () => {
  const [cars, setCars] = useState([]);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:3000/cars/public', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars(res.data);
      } catch (err) {
        console.error('Failed to fetch cars:', err);
      }
    }; 

    fetchCars();
  }, [token]);

  const handleBookTestDrive = async (carId: string) => {
    try {
      await axios.post(`http://localhost:3000/test-drives`, { carId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Test drive booked successfully!');
    } catch (err) {
      alert('Failed to book test drive');
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Cars
      </Typography>
      <Grid container spacing={3}>
        {cars.map((car: any) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={car.imageUrl}
                alt={car.model}
              />
              <CardContent>
                <Typography variant="h6">{car.Brand} {car.model}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {car.year} | Type: {car.type} | Price: ₹{car.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleBookTestDrive(car.id)} variant="contained" color="primary">
                  Book Test Drive
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllCarsPage;
