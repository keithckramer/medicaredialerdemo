import { Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from '@mui/material';

function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dialer Dashboard
      </Typography>
      <Typography>
        High-level metrics and queue summary will go here.
      </Typography>
    </Box>
  );
}

function CallsPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Calls
      </Typography>
      <Typography>
        Active call screen, lead details, and controls will live here.
      </Typography>
    </Box>
  );
}

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Medicare Dialer Demo
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/calls">
            Calls
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/calls" element={<CallsPage />} />
        </Routes>
      </Container>
    </>
  );
}
