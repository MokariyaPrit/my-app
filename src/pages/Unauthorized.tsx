// src/pages/Unauthorized.tsx
import { Container, Typography } from '@mui/material';

export default function Unauthorized() {
  return (
    <Container maxWidth="sm" style={{ marginTop: '10rem' }}>
      <Typography variant="h4" color="error" align="center">
        🚫 Unauthorized Access
      </Typography>
      <Typography align="center" mt={2}>
        You do not have permission to view this page.
      </Typography>
    </Container>
  );
}
