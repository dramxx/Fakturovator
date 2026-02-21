import { Container, Box, CircularProgress } from '@mui/material';
import DemoForm from '../components/DemoForm';
import DemoTable from '../components/DemoTable';
import SectionTitle from '../components/SectionTitle';
import { useDemos } from '../api/demoApi';

function DemoPage() {
  const {
    data: demos,
    isLoading: isLoadingDemos,
    error: demosError,
  } = useDemos();

  if (demosError) {
    console.error(demosError);
    return;
  }

  return (
    <>
      <SectionTitle>Api Test.</SectionTitle>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <DemoForm />

        {isLoadingDemos ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DemoTable demos={demos || []} />
        )}
      </Container>
    </>
  );
}

export default DemoPage;
