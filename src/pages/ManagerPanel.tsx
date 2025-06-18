import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axiosInstance from '../services/axiosInstance';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  region?: string;
}

interface RegionData {
  region?: string;
  users?: User[];
  managers?: User[];
}

export default function ManagerPanel() {
  const [regionData, setRegionData] = useState<RegionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/admins/region-users-managers');
        setRegionData(response.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setRegionData({ region: 'Unknown', users: [] }); // fallback to empty
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <CircularProgress />;
  if (!regionData) return <Typography>No data found</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Manager Panel – Region: {regionData.region || 'Unknown'}
      </Typography>

      <Typography variant="h6" mt={4}>
        Users
      </Typography>
      <Paper elevation={3}>
        <List>
          {regionData.users && regionData.users.length > 0 ? (
            regionData.users.map((user) => (
              <ListItem key={user.id}>
                <ListItemText
                  primary={`${user.name} (${user.role})`}
                  secondary={user.email}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No users found in your region." />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
}
