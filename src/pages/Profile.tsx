import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../services/userService';

export default function Profile() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setForm({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
        });
      } catch (error) {
        showToast('Failed to load profile', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setDialogOpen(false);
    setUpdating(true);

    try {
      await updateUserProfile(form);
      showToast('Profile updated successfully', 'success');
    } catch (err) {
      showToast('Failed to update profile', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const showToast = (msg: string, color: 'success' | 'error') => {
    setToastMessage(msg);
    setToastColor(color);
    setToastOpen(true);
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h5" mb={3}>
          Profile
        </Typography>

        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={form.email}
          disabled
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="normal"
          value={form.phone}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => setDialogOpen(true)}
          disabled={updating}
        >
          {updating ? 'Saving...' : 'Update Profile'}
        </Button>
      </Box>

      {/* ✅ Confirm Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update your profile information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        ContentProps={{ style: { backgroundColor: toastColor === 'success' ? '#4caf50' : '#f44336' } }}
      />
    </Container>
  );
}
