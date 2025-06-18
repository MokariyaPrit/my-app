import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, List, ListItem, ListItemText } from '@mui/material';
import axiosInstance from '../services/axiosInstance';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface RegionData {
  region: string;
  users: User[];
  managers: User[];  
}

export default function AdminPanel() {
  const [regionData, setRegionData] = useState<RegionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegionUsers = async () => {
      try {
        const response = await axiosInstance.get('/admins/region-users-managers');
        setRegionData(response.data);
      } catch (err) {
        console.error('Failed to fetch users and managers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegionUsers();
  }, []);

  if (loading) return <CircularProgress />;
  if (!regionData) return <Typography>No data found</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Admin Panel – Region: {regionData.region}
      </Typography>

      <Typography variant="h6" mt={4}>
        Users
      </Typography>
      <Paper elevation={3} sx={{ mb: 4 }}>
        <List>
          {regionData.users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={`${user.name} (${user.role})`} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Typography variant="h6">Managers</Typography>
      <Paper elevation={3}>
        <List>
          {regionData.managers.length === 0 ? (
            <ListItem>
              <ListItemText primary="No managers found." />
            </ListItem>
          ) : (
            regionData.managers.map((manager) => (
              <ListItem key={manager.id}>
                <ListItemText primary={`${manager.name} (${manager.role})`} secondary={manager.email} />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
}
