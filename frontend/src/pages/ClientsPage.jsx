import SectionTitle from '../components/SectionTitle';
import { useTranslation } from 'react-i18next';

const ClientsPage = () => {
  const { t } = useTranslation();
  return <SectionTitle>{t('pages.clients.title')}</SectionTitle>;
};

export default ClientsPage;
