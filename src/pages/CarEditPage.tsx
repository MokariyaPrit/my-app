import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const CarEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({
    open: false,
    message: '',
    type: 'success',
  });

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCarData(res.data);
        setFormData({ ...res.data });
        setImagePreview(res.data.imageUrl);
      } catch (error) {
        console.error('Failed to fetch car data:', error);
      }
    };
    fetchCar();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async () => {
  try {
    const allowedFields = [
      'model', 'year', 'color', 'type',
      'transmission', 'fuelType', 'mileage', 'price',
    ];

    const payload = new FormData();
    allowedFields.forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        payload.append(key, formData[key]);
      }
    });
    if (imageFile) payload.append('image', imageFile);

    const response = await axios.patch(`http://localhost:3000/cars/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200 || response.status === 201) {
      setToast({
        open: true,
        message: 'Car updated successfully!',
        type: 'success',
      });

      // ✅ Delay navigation so the toast can appear
      setTimeout(() => navigate('/car-list'), 1500);
    } else {
      setToast({
        open: true,
        message: `Update failed with status: ${response.status}`,
        type: 'error',
      });
    }
  } catch (error: any) {
    console.error('Update failed:', error.response?.data || error);
    setToast({ open: true, message: 'Failed to update car', type: 'error' });
  } finally {
    setConfirmOpen(false);
  }
};  

  if (!carData) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Edit Car
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setConfirmOpen(true);
        }}
      >
        <Grid container spacing={2}>
          {[
            'Brand',
            'model',
            'year',
            'color',
            'Number',
            'type',
            'transmission',
            'fuelType',
            'mileage',
            'price',
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                name={field}
                label={field}
                value={formData[field] ?? ''}
                onChange={handleChange}
                disabled={field === 'Brand' || field === 'Number'}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
          </Grid>

          {imagePreview && (
            <Grid item xs={12}>
              <Box
                component="img"
                src={imagePreview}
                alt="Preview"
                sx={{ width: 300, height: 'auto', mt: 1, borderRadius: 2 }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to update this car?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type}>{toast.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default CarEditPage;
 