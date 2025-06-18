// src/pages/Signup.tsx
import React, { useState } from 'react';
import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/authService';

const roles = ['user', 'manager', 'admin', 'superadmin'];
const regions = ['Gujarat', 'Maharashtra', 'Punjab', 'Delhi', 'Karnataka']; // Add as needed

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    region: 'Gujarat',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signupUser(formData); // should call backend with DTO matching fields
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" mb={3}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Name"
          name="name"
          type="text"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        /> 

        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>)}
            required
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Region</InputLabel>
          <Select
            name="region"
            value={formData.region}
            onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>)}
            required
          >
            {regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error && (
          <Typography color="error" variant="body2" mt={1}>
            {error}
          </Typography>
        )}

        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </form>
    </Container>
  );
}
