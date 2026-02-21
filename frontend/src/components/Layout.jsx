import { Paper, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
      <Footer />
    </Paper>
  );
};

export default Layout;
