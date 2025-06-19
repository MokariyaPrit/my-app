import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import { Grid } from '@mui/material';
import axios from 'axios';

const AddCarPage = () => {
  const [formData, setFormData] = useState({
    Brand: '',
    model: '',
    year: '',
    color: '',
    Number: '',
    type: '',
    transmission: '',
    fuelType: '',
    mileage: '',
    price: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const token = localStorage.getItem('access_token');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append('image', image);

    try {
      const response = await axios.post('http://localhost:3000/cars', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Car added successfully!');
      console.log(response.data);
    } catch (error) {
      alert('Error uploading car');
      console.error(error);
    }
  };

  return (
    <Box maxWidth={900} mx="auto" mt={5} component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" mb={3}>
        Add Car
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Brand"
            name="Brand"
            value={formData.Brand}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            fullWidth
            required
          >
            {['Red', 'Blue', 'Black', 'White', 'Silver'].map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Number"
            name="Number"
            value={formData.Number}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Transmission"
            name="transmission"
            value={formData.transmission}
            onChange={handleInputChange}
            fullWidth
            required
          >
            {['Automatic', 'Manual'].map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Fuel Type"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleInputChange}
            fullWidth
            required
          >
            {['Petrol', 'Diesel', 'Hybrid'].map((f) => (
              <MenuItem key={f} value={f}>
                {f}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mileage"
            name="mileage"
            type="number"
            value={formData.mileage}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
        </Grid>

        {previewUrl && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">Image Preview:</Typography>
            <img
              src={previewUrl}
              alt="Car Preview"
              style={{ width: '100%', maxHeight: 300, borderRadius: 8, objectFit: 'contain' }}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddCarPage;
