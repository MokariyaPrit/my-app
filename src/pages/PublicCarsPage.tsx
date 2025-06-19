import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Car {
  id: string;
  model: string;
  year: number;
  color: string;
  imageUrl: string;
  price: number;
  mileage: number;
  owner: {
    id: string;
    region: string;
  };
}

interface CarResponse {
  data: Car[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const PublicCarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9); // default limit
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchCars = async (currentPage: number, currentLimit: number) => {
    setLoading(true);
    try {
      const res = await axios.get<CarResponse>(
        `http://localhost:3000/cars/public?page=${currentPage}&limit=${currentLimit}`
      );
      setCars(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch cars", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(page, limit);
  }, [page, limit]);

  const handleFirst = () => setPage(1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const handleLast = () => setPage(totalPages);
  const handlePageClick = (pageNum: number) => setPage(pageNum);
  const navigate = useNavigate();

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
    setPage(1); // reset to first page on limit change
  };

const role = localStorage.getItem('user_role');

const handleCardClick = (car: Car) => {
  const path = role === 'manager' || role === 'admin'
    ? `/secure/cars/${car.id}`
    : `/cars/${car.id}`;
  navigate(path);
};

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Browse Available Cars
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Cars per page</InputLabel>
          <Select
            value={limit}
            onChange={handleLimitChange}
            label="Cars per page"
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {cars.map((car) => (
            <Grid item key={car.id}>
              <Card
                onClick={() => handleCardClick(car)}
                sx={{
                  width: 270,
                  height: 370,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: 3,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardMedia
                  component="img"
                  image={car.imageUrl}
                  alt={car.model}
                  sx={{ height: 160, objectFit: "cover" }} 
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography variant="h6" noWrap>
                    {car.model} ({car.year})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Color: {car.color}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mileage: {car.mileage} km
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{car.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Region: {car.owner.region}
                  </Typography>
                </CardContent>
                <Box p={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => alert(`Booked test drive for ${car.model}`)}
                  >
                    Book Test Drive
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box
        mt={4}
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={1}
      >
        <Button onClick={handleFirst} disabled={page === 1}>
          First
        </Button>
        <Button onClick={handlePrev} disabled={page === 1}>
          Previous
        </Button>
        <Button>{page}</Button>

        <Button onClick={handleNext} disabled={page === totalPages}>
          Next
        </Button>
        <Button onClick={handleLast} disabled={page === totalPages}>
          Last
        </Button>
      </Box>
    </Box>
  );
};

export default PublicCarsPage;
