import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import { getColor } from '../theme/colors';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = [
    { name: t('navigation.invoices'), route: '/invoices' },
    { name: t('navigation.companies'), route: '/companies' },
    { name: t('navigation.clients'), route: '/clients' },
  ];

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        backgroundColor: getColor('primary.blue'),
        borderBottom: `1px solid ${getColor('grid.line')}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo on the left */}
        <Typography
          variant="h6"
          component="div"
          onClick={() => navigate('/')}
          sx={{
            fontWeight: 'bold',
            letterSpacing: 1,
            color: getColor('background.white'),
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          {t('app.name')}
        </Typography>

        {/* Menu items on the right */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {menuItems.map(item => (
            <Button
              key={item.name}
              color="inherit"
              onClick={() => navigate(item.route)}
              sx={{
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {item.name}
            </Button>
          ))}

          {/* Settings as cogwheel icon */}
          <IconButton
            color="inherit"
            onClick={() => navigate('/settings')}
            sx={{
              '&:hover': {
                backgroundColor: getColor('grid.line'),
              },
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
