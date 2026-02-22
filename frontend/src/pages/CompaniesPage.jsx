import SectionTitle from '../components/SectionTitle';
import GeneralButton from '../components/GeneralButton';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CompaniesPage = () => {
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
        <SectionTitle>{t('pages.companies.title')}</SectionTitle>
        <GeneralButton
          onClick={() => console.log('CompaniesPage button clicked')}
        >
          {t('pages.companies.addButton', 'Add Company')}
        </GeneralButton>
      </Box>
    </>
  );
};

export default CompaniesPage;
