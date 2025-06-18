import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, MenuItem,
} from '@mui/material';
import axios from 'axios';

const AddCar = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
  }); 
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const token = localStorage.getItem('access_token'); 
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // preview
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
    <Box maxWidth={500} mx="auto" mt={5} component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" mb={2}>Add Car</Typography>

      <TextField
        label="Make"
        name="make"
        value={formData.make}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Model"
        name="model"
        value={formData.model}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Year"
        name="year"
        type="number"
        value={formData.year}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Color"
        name="color"
        value={formData.color}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      >
        {['Red', 'Blue', 'Black', 'White', 'Silver'].map((color) => (
          <MenuItem key={color} value={color}>{color}</MenuItem>
        ))}
      </TextField>

      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Image
        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
      </Button>

      {previewUrl && (
        <Box mt={2}>
          <Typography variant="subtitle1">Image Preview:</Typography>
          <img src={previewUrl} alt="Car Preview" style={{ width: '100%', borderRadius: 8 }} />
        </Box>
      )}

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
};

export default AddCar;
