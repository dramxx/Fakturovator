import SectionTitle from '../components/SectionTitle';
import GeneralButton from '../components/GeneralButton';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const InvoicesPage = () => {
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
        <SectionTitle>{t('pages.invoices.title')}</SectionTitle>
        <GeneralButton
          onClick={() => console.log('InvoicesPage button clicked')}
        >
          {t('pages.invoices.addButton', 'Add Invoice')}
        </GeneralButton>
      </Box>
    </>
  );
};

export default InvoicesPage;
