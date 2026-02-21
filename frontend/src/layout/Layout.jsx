import { Paper, Box } from '@mui/material';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import { getColor } from '../theme/colors';

const Layout = ({ children, shapeOpacity = 0.3 }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: getColor('background.white'),
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <Header />
      </Box>
      <Box
        component="main"
        sx={{
          flex: 1,
          padding: '2em',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          maxHeight: 'calc(100vh - 128px)', // Approximate header + footer height
        }}
      >
        {/* whitebox */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            backgroundColor: getColor('background.light'),
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
                linear-gradient(${getColor('grid.line')} 1px, transparent 1px),
                linear-gradient(90deg, ${getColor('grid.line')} 1px, transparent 1px)
              `,
              backgroundSize: '400px 400px',
              backgroundPosition: '-1px -1px',
              zIndex: 1,
            },
          }}
        >
          {/* Yellow Circle - upper right area */}
          <Box
            sx={{
              position: 'absolute',
              top: '15%',
              right: '30%',
              width: '180px',
              height: '180px',
              backgroundColor: getColor('secondary.yellow'),
              borderRadius: '50%',
              zIndex: 0,
              opacity: shapeOpacity === 0.7 ? 0.7 : shapeOpacity,
            }}
          />

          {/* Blue Square - fill cell 9 */}
          <Box
            sx={{
              position: 'absolute',
              top: '58%',
              left: '65%',
              width: '300px',
              height: '300px',
              backgroundColor: getColor('secondary.blue'),
              zIndex: 0,
              opacity: shapeOpacity === 0.9 ? 0.9 : shapeOpacity,
            }}
          />

          {/* Red Triangle - top right corner */}
          <Box
            sx={{
              width: '0',
              height: '0',
              borderLeft: '150px solid transparent',
              borderBottom: '150px solid transparent',
              borderTop: `150px solid ${getColor('primary.red')}`,
              borderRight: `150px solid ${getColor('primary.red')}`,
              transform: 'none',
              position: 'absolute',
              top: '0',
              right: '0',
              opacity: shapeOpacity === 1 ? 1 : shapeOpacity,
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
        </Paper>
      </Box>
      <Box sx={{ position: 'sticky', bottom: 0, zIndex: 1000 }}>
        <Footer />
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  shapeOpacity: PropTypes.number,
};

export default Layout;
