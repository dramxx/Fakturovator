import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DemoForm from '../components/DemoForm';
import DemoTable from '../components/DemoTable';
import { useDemos } from '../api/demoApi';

function DemoPage() {
  const { data: demos, isLoading: isLoadingDemos, error: demosError } = useDemos();

  if (demosError) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
          Back to Home
        </Button>
        <Typography color="error">
          Error loading demos: {demosError.message}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back to Home
      </Button>

      <Typography variant="h3" component="h1" gutterBottom align="center">
        Demo Page
      </Typography>

      <DemoForm />

      {isLoadingDemos ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DemoTable demos={demos || []} />
      )}
    </Container>
  );
}

export default DemoPage;
