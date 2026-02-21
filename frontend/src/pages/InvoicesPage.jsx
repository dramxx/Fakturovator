import SectionTitle from '../components/SectionTitle';
import { useTranslation } from 'react-i18next';

const InvoicesPage = () => {
  const { t } = useTranslation();
  return <SectionTitle>{t('pages.invoices.title')}</SectionTitle>;
};

export default InvoicesPage;
