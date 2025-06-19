import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function CarGrid({ cars }: { cars: any[] }) {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} padding={2}>
      {cars.map((car) => (
        <Grid item xs={12} sm={6} md={4} key={car.id}>
          <Card sx={{ height: 360, display: 'flex', flexDirection: 'column' }}>
            <CardActionArea onClick={() => navigate(`/cars/${car.id}`)} sx={{ flexGrow: 1 }}>
              <CardMedia
                component="img"
                height="180"
                image={car.imageUrl || "/placeholder.jpg"}
                alt={car.Brand}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" noWrap>
                  {car.Brand} - {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {car.year} | {car.type} | {car.fuelType}
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  ₹{Number(car.price).toLocaleString()}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Button
              component={Link}
              to={`/cars/edit/${car.id}`}
              variant="outlined"
              fullWidth
              sx={{ borderTop: '1px solid #eee', borderRadius: 0 }}
            >
              Edit
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
 