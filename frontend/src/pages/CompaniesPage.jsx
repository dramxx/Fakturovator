import SectionTitle from '../components/SectionTitle';
import { useTranslation } from 'react-i18next';

const CompaniesPage = () => {
  const { t } = useTranslation();
  return <SectionTitle>{t('pages.companies.title')}</SectionTitle>;
};

export default CompaniesPage;
