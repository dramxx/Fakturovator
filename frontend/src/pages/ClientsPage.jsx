import SectionTitle from '../components/SectionTitle';
import GeneralButton from '../components/GeneralButton';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ClientsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <SectionTitle>{t('pages.clients.title')}</SectionTitle>
        <GeneralButton
          onClick={() => console.log('ClientsPage button clicked')}
        >
          {t('pages.clients.addButton', 'Add Client')}
        </GeneralButton>
      </Box>
    </>
  );
};

export default ClientsPage;
