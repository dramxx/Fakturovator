import { Container, Typography, Box, Grid } from '@mui/material';

function LandingPage() {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 102px - 64px )', // 102px for footer, 64px for header
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          background:
            'linear-gradient(135deg, #0d47a1 0%, #1976d2 25%, #42a5f5 50%, #64b5f6 75%, #90caf9 100%)',
          color: 'white',
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            alignItems="flex-end"
            justifyContent="flex-start"
            sx={{ height: '100%' }}
          >
            <Grid
              item
              xs={12}
              sx={{
                position: 'absolute',
                bottom: '50%',
                left: '10%',
                transform: 'translate(-10%, 50%)',
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: '2.5rem', md: '5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                Fakturovator.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
