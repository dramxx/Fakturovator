import { Typography, Box } from '@mui/material';
import SectionTitle from '../components/SectionTitle';

function LandingPage() {
  return (
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
      {/* Yellow Circle - upper right area */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '30%',
          width: '180px',
          height: '180px',
          backgroundColor: '#ffaa00ff',
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
          backgroundColor: '#1f46baff',
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
          borderTop: '150px solid #FF0000',
          borderRight: '150px solid #FF0000',
          transform: 'none',
          position: 'absolute',
          top: '0',
          right: '0',
          opacity: 1,
        }}
      />

      {/* Fakturovator text position */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '50%',
          left: '10%',
          transform: 'translate(-10%, 50%)',
          zIndex: 4,
          userSelect: 'none',
        }}
      >
        <SectionTitle
          fontSize="8rem"
          underlineWidth="70%"
          underlineHeight="30px"
        >
          Fakturovator.
        </SectionTitle>
      </Box>
    </Box>
  );
}

export default LandingPage;
