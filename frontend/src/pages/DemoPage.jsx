import { Container, Box, CircularProgress, Typography } from '@mui/material';
import DemoForm from '../components/DemoForm';
import DemoTable from '../components/DemoTable';
import SectionTitle from '../components/SectionTitle';
import { useDemos } from '../api/demoApi';
import { useTranslation } from 'react-i18next';

const DemoPage = () => {
  const { t } = useTranslation();
  const {
    data: demos,
    isLoading: isLoadingDemos,
    error: demosError,
  } = useDemos();

  if (demosError) {
    console.error(demosError);
    return (
      <Container>
        <Typography color="error">
          {t('common.error')}: {demosError.message}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <SectionTitle>{t('pages.demo.title')}</SectionTitle>

      <Container>
        <Box sx={{ mb: 4 }}>
          <DemoForm />
        </Box>

        <Box>
          {isLoadingDemos ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <DemoTable demos={demos || []} />
          )}
        </Box>
      </Container>
    </>
  );
};

export default DemoPage;
