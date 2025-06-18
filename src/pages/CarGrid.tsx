import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  imageUrl: string;
}

interface Props {
  cars: Car[];
}

const CarGrid: React.FC<Props> = ({ cars }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card sx={{ cursor: 'pointer', boxShadow: 4 }} onClick={() => navigate(`/cars/${car.id}`)}>
              <CardMedia
                component="img"
                height="180"
                image={car.imageUrl}
                alt={`${car.make} ${car.model}`}
              />
              <CardContent>
                <Typography variant="h6">{car.make} {car.model}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {car.year} • {car.color}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CarGrid;
