import { Paper, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          padding: '2em',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* whitebox */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            backgroundColor: '#fafafa',
            borderRadius: 0,
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '1px',
              left: '1px',
              right: '1px',
              bottom: '1px',
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '400px 400px',
              backgroundPosition: '-1px -1px',
              zIndex: 1,
            },
          }}
        >
          {children}
        </Paper>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
