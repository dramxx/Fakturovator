import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        backgroundColor: theme.palette.grey[100],
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        <Link
          to="/demo"
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          API test
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
