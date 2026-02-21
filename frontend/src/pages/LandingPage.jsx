import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function LandingPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Fakturovator
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Button
            component={Link}
            to="/demo"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            API TEST
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default LandingPage;
