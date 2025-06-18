import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async () => {
  try {
    const { user, access_token, refresh_token } = await loginUser(form);

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_role', user.role); // ✅ store role separately

    login(); // if you're using AuthContext
    navigate('/dashboard');
  } catch (err: any) {
    const message = err.response?.data?.message || 'Login failed';
    setError(Array.isArray(message) ? message[0] : message);
  }
};


  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h5" mb={3}>
          Login
        </Typography>

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
        />

        {error && (
          <Typography color="error" mt={1} fontSize={14}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
