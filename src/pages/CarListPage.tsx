import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Car {
  id: string;
  Brand: string;
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

const CarListPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [limit, setLimit] = useState(9);

const handleLimitChange = (event: SelectChangeEvent<number>) => {
  setLimit(event.target.value as number);
  setPage(1); // reset to first page
};

  const token = localStorage.getItem('access_token');

  const fetchCars = async (currentPage: number, pageLimit = limit) => {
    setLoading(true);
    try {
      const res = await axios.get<CarResponse>(
        `http://localhost:3000/cars?page=${currentPage}&limit=${pageLimit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCars(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch cars', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(page);
  }, [page]);

  useEffect(() => {
    setPage(1);
    fetchCars(1, limit);
  }, [limit]);

  const handleNext = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleFirst = () => setPage(1);
  const handleLast = () => setPage(totalPages);

  const renderPageNumbers = () => {
    const maxButtons = 5;
    let start = Math.max(1, page - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === page ? 'contained' : 'outlined'}
          onClick={() => setPage(i)}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Listed Cars
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
                sx={{
                  width: 270,
                  height: 370,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  image={car.imageUrl}
                  alt={car.model}
                  sx={{ height: 160, objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography variant="h6" noWrap>
                    {car.Brand} {car.model} ({car.year})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Color: {car.color}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mileage: {car.mileage} km
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{car.price.toLocaleString()}
                  </Typography>
                </CardContent>
                <Box p={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate(`/cars/edit/${car.id}`)}
                  >
                    Edit Car
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={1} flexWrap="wrap">
        <Button onClick={handleFirst} disabled={page === 1}>First</Button>
        <Button onClick={handlePrev} disabled={page === 1}>Previous</Button>
        {renderPageNumbers()}
        <Button onClick={handleNext} disabled={page === totalPages}>Next</Button>
        <Button onClick={handleLast} disabled={page === totalPages}>Last</Button>
      </Box>
    </Box>
  ); 
};

export default CarListPage;