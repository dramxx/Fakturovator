import { Box, Paper } from '@mui/material';
import SectionTitle from '../components/SectionTitle';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { getColor } from '../theme/colors';
import { useTranslation } from 'react-i18next';

function LandingPage() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: getColor('background.white'),
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
                linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
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
              zIndex: 3,
              opacity: 0.7,
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
              zIndex: 3,
              opacity: 0.9,
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
              opacity: 1,
            }}
          />
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
            }}
          >
            {/* Fakturovator text position */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '50%',
                left: '10%',
                transform: 'translate(-10%, 50%)',
                zIndex: 4,
              }}
            >
              <Box sx={{ flex: 1, position: 'relative', zIndex: 2 }}>
                <SectionTitle
                  fontSize="8rem"
                  underlineWidth="70%"
                  underlineHeight="30px"
                >
                  {t('pages.landing.title')}
                </SectionTitle>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Footer />
    </Box>
  );
}

export default LandingPage;
