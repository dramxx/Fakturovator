import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'My Invoices', route: '/invoices' },
    { name: 'My Companies', route: '/companies' },
    { name: 'My Clients', route: '/clients' },
  ];

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        backgroundColor: theme.palette.primary.main,
        borderBottom: `1px solid ${theme.palette.divider}`,
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
            color: theme.palette.common.white,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          FAKTUROVATOR
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
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
