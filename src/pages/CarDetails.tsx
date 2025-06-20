import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
} from "@mui/material";
  
export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await axios.get(`http://localhost:3000/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCar(res.data);
      } catch (err) {
        console.error("Failed to fetch car", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <CircularProgress sx={{ mt: 10 }} />;

  return (
    <Box mt={10} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          height="300"
          image={car?.imageUrl || "/placeholder.jpg"}
          alt={car?.Brand}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {car.Brand} {car.model} ({car.year})
          </Typography>
          <Typography>Color: {car.color}</Typography>
          <Typography>Type: {car.type}</Typography>
          <Typography>Transmission: {car.transmission}</Typography>
          <Typography>Fuel: {car.fuelType}</Typography>
          <Typography>Mileage: {car.mileage} km</Typography>
          <Typography>Number: {car.Number}</Typography>
          <Typography variant="h6" color="primary" mt={2}>
            Price: ₹{Number(car.price).toLocaleString()}
          </Typography>
        <Button component={Link} to={`/cars/edit/${car.id}`} variant="outlined">Edit</Button>
        </CardContent>

      </Card>
    </Box>
  );
}
