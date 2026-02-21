import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const theme = useTheme();
  const { t } = useTranslation();

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
          {t('navigation.apiTest')}
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
